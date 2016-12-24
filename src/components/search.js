import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import AutoComplete from 'material-ui/AutoComplete';


const filterShowsByName = (shows) => shows.map((show) => show.name);

class Search extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    const shows = this.props.allShows.length ? filterShowsByName(this.props.allShows) : ['HTMYM'];

    return (
      <div>
        <AutoComplete
          floatingLabelText='Type the name of a TV show...'
          filter={AutoComplete.fuzzyFilter}
          dataSource={shows}
          maxSearchResults={3}
          style={{margin: 20}}
          fullWidth={true} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    logged: state.logged,
    allShows: state.allShows
  }
}

export default connect(mapStateToProps, actions)(Search);

const styles = {
  authBtn: {
    marginTop: '6px'
  }
}

