import { Actions } from 'react-native-router-flux'
import 'whatwg-fetch'


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

// http://www.brewerydb/developers/docs
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

export const fetchBreweryLocations = (location = 'Denver') => dispatch => {
  const url = `${BREWDB_BASE_URL}/locations/?key=${BREWDB_API_KEY}&locality=${location}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.errorMessage) {
        console.log(data.errorMessage)
        dispatch(fetchBreweryFailure('fetchBreweryFailure: ', data.errorMessage))
      } else {
        Actions.pubList()
        console.log('fetchBreweryLocations data: ', data)
        dispatch(fetchBreweryLocationsSuccess(data))
      }
    })
    .catch(error => dispatch(fetchBreweryFailure('fetchBreweryFailure: ', error)));
};

export const fetchBreweryLocation = (name = '', location = '') => dispatch => {
  const url = `${BREWDB_BASE_URL}/location/?key=${BREWDB_API_KEY}&locality=${location}&name=${name}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.errorMessage) {
        console.log(data.errorMessage)
        dispatch(fetchBreweryFailure('fetchBreweryFailure: ', data.errorMessage))
      } else {
        Actions.pubList()
        console.log('fetchBreweryLocations data: ', data)
        dispatch(fetchBreweryLocationsSuccess(data))
      }
    })
    .catch(error => dispatch(fetchBreweryFailure('fetchBreweryFailure: ', error)));
};

export const fetchBreweryByGeoLocation = data => dispatch => {
  const location = data.results[0].address_components[3].long_name
  const region = data.results[0].address_components[5].short_name
  console.log(`location, region: ${location}, ${region}`)
  const url = `${BREWDB_BASE_URL}/locations/?key=${BREWDB_API_KEY}&locality=${location}&region=${region}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.errorMessage) {
        console.log(data.errorMessage)
        dispatch(fetchBreweryFailure('fetchBreweryFailure: ', data.errorMessage))
      } else {
        Actions.pubList()
        console.log('fetchBreweryLocations data: ', data)
        dispatch(fetchBreweryLocationsSuccess(data))
      }
    })
    .catch(error => dispatch(fetchBreweryFailure('fetchBreweryFailure: ', error)));
}

const GOOGLE_API_KEY = 'AIzaSyDzk0eKI5tnKWkSORpDTL32iZ15QjxQxeg'
export const reverseGeoLocLookup = (lat = '40.732287', lon: '-111.8996689') => dispatch => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=true&key=${GOOGLE_API_KEY}`
  const url2 = `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.64177,-111.4946&key=${GOOGLE_API_KEY}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const address = data.results[0].formatted_address.split(',')
      const len = address.length
      const location = address[len-3]
      // const location = data.results[0].address_components[2].long_name
      dispatch(fetchBreweryLocations(location))
    })
    .catch(error =>console.log('reverseGeoLocLookup Error: ', error))
}
