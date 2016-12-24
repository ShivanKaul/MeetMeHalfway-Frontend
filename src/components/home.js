import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';



const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		padding: '5px',
		maxHeight: '50vh',
		overflowY: 'auto'
	},
	card: {
		display: 'flex',
		flex: '25%',
		flexWrap: 'no-wrap',
		margin: '5px'

	},
	card_img: {
		flex: '50%',
	},
	card_info: {
		flex: '50%',
	},
	titleStyle: {
		color: 'rgb(0, 188, 212)',
	},
	img: {
		height:'30vh'
	}
};

const styles2 = {
	root: {
		display: 'flex',
		justifyContent: 'space-around',
		padding: '5px',
		maxHeight: '50vh',
	},
	gridList: {
		display: 'flex',
		flexWrap: 'nowrap',
		overflowX: 'auto',
		overflowY: 'hidden'
	},
	titleStyle: {
		color: 'rgb(0, 188, 212)',
	},
};


const constructOverview = (overview) => {
	return overview.length > 45 ?
		overview.slice(0, 45) + '...' :
		overview
};

const filterShowsByName = (shows) => shows.map((show) => show.name);

class Home extends Component {
	constructor(props) {
		super(props);

		this.handleSearchUpdateInput = this.handleSearchUpdateInput.bind(this);
		this.renderThumbnail = this.renderThumbnail.bind(this);

		this.state = {
			searchTerm : ''
		};
	}
	componentWillMount() {
		const storedUsername = window.localStorage.getItem('username');

		this.props.fetchAllShows();

		if (storedUsername) {
			this.props.login(storedUsername);
		}
	}


	renderShows(shows) {
		if (!shows.length) {
			return <div>Please Login to see recommendations</div>
		}

		return (
				<div style={styles.root}>
					{shows
						.slice(0, 9)
						.map((show, index) => this.renderShow(show, index))}
				</div>
		)
	}

	renderAllShows(shows) {
		if (!shows.length) {
			return <div>Loading shows...</div>
		}

		return (
			<GridList style={styles2.gridList} cols={2.2}>
				<div style={styles2.root}>
					{shows
						.slice(0, 15)
						.map((show, index) => this.renderThumbnail(show, index))}
				</div>
			</GridList>
		)
	}

	renderThumbnail(show, index) {
		return (
			<div style={styles.card} key={index}>
				<div>{this.renderPoster(show)}</div>
			</div>
		);
	}


	renderPoster(show) {
		const posterPath = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${show.poster_path}`;

		return (
			<div>
				<img style={styles.img} src={posterPath} />
			</div>
		)
	}

	renderShow(show, index) {
		const overview = constructOverview(show.overview);

		return (
			<div style={styles.card} key={index}>
				<div style={styles.card_img}>{this.renderPoster(show)}</div>
				<div style={styles.card_info}>
					<div><h4>{show.name}</h4></div>
					<div style={styles.cardOverview}><h7>{overview}</h7></div>
				</div>
			</div>
		);
	}

	handleSearchUpdateInput(value) {
		this.setState({searchTerm: value})
	}

	render() {
		const { recommendedShows, allShows } = this.props;
		const shows = this.props.allShows.length ? filterShowsByName(this.props.allShows) : ['HTMYM'];

		const term = this.state.searchTerm;

		const filteredShows = term == '' ? allShows :
			allShows.filter((show) => {
				if (show.name.toLowerCase().indexOf(term.toLowerCase()) != -1) {
					return true;
				} else {
					return false;
				}
			});


		if (!this.props.allShows.length) {
			return <div>Loading...</div>
		}

		return (
			<div>
				<div>
					<AutoComplete
						floatingLabelText='Type the name of a TV show...'
						filter={AutoComplete.fuzzyFilter}
						dataSource={shows}
						onUpdateInput={this.handleSearchUpdateInput}
						maxSearchResults={3}
						style={{margin: 20, border: '2px dotted gold', padding: '1em'}}
						fullWidth={true} />
				</div>
				<hr />
				<div>
					<h4>All Shows</h4>
					{this.renderAllShows(filteredShows)}
				</div>
				<hr />
				<div>
					<h4 style={{paddingTop: '10px'}}>Recommended Shows</h4>
					{this.renderShows(recommendedShows)}
				</div>
			</div>
		);

	}
}

function mapStateToProps(state) {
	return {
		recommendedShows: state.recommendedShows,
		allShows: state.allShows
	}
}

export default connect(mapStateToProps, actions )(Home)
