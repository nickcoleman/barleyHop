import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import 'isomorphic-fetch'


/********************************************************
           Form Actions
*********************************************************/

export const INPUT_UPDATE = 'INPUT_UPDATE'
export const inputUpdate = ({ prop, value }) => ({
  type: INPUT_UPDATE,
  payload: { prop, value }
})

/********************************************************
           Brewery Actions
*********************************************************/

const BEERMAP_API_KEY = '1586428906314affc5ad8d0f0328def9'

// www.brewerydb/developers/docs
const BREWDB_API_KEY = '84b266032fc3574cc3c27babc2b0de54'
const BREWDB_BASE_URL = 'https://api.brewerydb.com/v2'

export const FETCH_BREWERY_LOCATIONS_SUCCESS = 'FETCH_BREWERY_LOCATIONS_SUCCESS'
export const fetchBreweryLocationsSuccess = data => ({
  type: FETCH_BREWERY_LOCATIONS_SUCCESS,
  payload: data
})

export const FETCH_BREWERY_FAILURE = 'FETCH_BREWERY_FAILURE'
export const fetchBreweryFailure = error => ({
  type: FETCH_BREWERY_FAILURE,
  payload: error
})

export const fetchBreweryLocations = (name = '', location = '') => dispatch => {
  const url = `${BREWDB_BASE_URL}/locations/?key=${BREWDB_API_KEY}&locality=${location}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.errorMessage) {
        console.log(data.errorMessage)
        dispatch(fetchBreweryFailure(data.errorMessage))
      } else {
        Actions.pubList()
        dispatch(fetchBreweryLocationsSuccess(data))
      }
    })
    .catch(error => dispatch(fetchBreweryFailure(error)));
};

const GOOGLE_API_KEY = 'AIzaSyDzk0eKI5tnKWkSORpDTL32iZ15QjxQxeg'
export const reverseGeoLocLookup = (lat = '40.732287', lon: '-111.8996689') => dispatch => {
  const url = `https://maps.googleapis.com/maps/api/location/js?key=${GOOGLE_API_KEY}&origin=${lat},${lon}`
  const url2 = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=Seattle&destinations=San+Francisco&key=${GOOGLE_API_KEY}`
  fetch(url2)
    // .then(response => response.json())
    .then(data => console.log(data))
    .catch(error =>console.log('Error: ', error))
}
