import {
	FETCH_RECOMMENDED_SHOWS,
	FETCH_ALL_SHOWS,
	LOGIN,
	LOGOUT,
	DIALOG_MSG
} from './types';

import axios from 'axios';

// const baseUrl = process.env.PROD ? 'https://codejam2016-api.herokuapp.com/' : 'http://localhost:5000';
const baseUrl = 'https://codejam2016-api.herokuapp.com' 

export const fetchRecommendedShows = (storedUsername) => {
	console.log('preparing to trigger a call to api and store with storedUsername: '+ storedUsername);
	return dispatch => {
		console.log('attempting to do fetch baseurl: ' + baseUrl);
		axios.get(`${baseUrl}/fetchRecommended?username=${storedUsername}`)
			.then(({ data }) => {
				const shows = data.recommendations;
				console.log('call has been successfull');

				dispatch({
					type: FETCH_RECOMMENDED_SHOWS,
					payload: shows
				});
			})
			.catch(handleError);
	}
}

export function fetchAllShows() {
	return function (dispatch) {
		axios.get(`${baseUrl}/allShows`)
			.then(({ data }) => {
				const allShows = data.allShows;

				dispatch({
					type: FETCH_ALL_SHOWS,
					payload: allShows
				});
			})
			.catch(handleError);
	}
}

export function login(username, password) {
	return function (dispatch) {
		axios.get(`${baseUrl}/login?username=${username}&password=${password}`)
			.then(({ data }) => {
				if (data.status == 200 && data.username) {
					localStorage.setItem('username', username);
					dispatch({ type: LOGIN, payload: data.username });
					dispatch({ type: DIALOG_MSG, payload: ''});
					dispatch(fetchRecommendedShows())
				} else {
					dispatch({ type: LOGOUT });
				}
			})
			.catch(handleError);
	}
}

export function register(username, password) {
	return function(dispatch) {
		axios.get(`${baseUrl}/register?username=${username}&password=${password}`)
			.then(({ data }) => {
				if (data.status == 200) {
					dispatch({ type: DIALOG_MSG, payload: `User ${username} registered`});
				} else {
					dispatch({ type: DIALOG_MSG, payload: data.message});
				}
			})
			.catch(handleError);
	}
}

export function logout() {
	localStorage.setItem('username', '');

	return {
		type: LOGOUT
	}
}

function handleError(err) {
	console.log(err)
	console.log('ERRRROOOR');
	throw err
}
