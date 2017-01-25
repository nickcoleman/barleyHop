import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container, Content, Button,
  Input, Icon, Item, Title, Thumbnail,
} from 'native-base';
import { Image, View, Text } from 'react-native'

import {
  inputUpdate,
  fetchBreweryLocations,
  reverseGeoLocLookup
} from '../actions'

class FindPubs extends Component {

  state = {
    initialPosition: {},
    lastPosition: ''
  }

  onSearchButtonPress() {
    this.props.fetchBreweryLocations(this.props.pubChoice, this.props.locationChoice)
  }

  onCurrentLocationButtonPress() {
    console.log('Find current location')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position)
        // let initialPosition = JSON.stringify(position);
        let initialPosition = position;
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.props.reverseGeoLocLookup()
    // console.log(`Current Position: ${this.state.initialPosition}`)
  }

  render() {
    // <Text>{this.state.initialPosition}</Text>
    const barleylogo = require('./img/hops_and_barley.png')
    return (
      <Container>
      <Content>
        <Title sytle={styles.titleStyle}>Brewery And Pub Locations </Title>
        <Input
          style={styles.inputStyle}
          placeholder="Enter Brewery / Pub / Blank for all"
          autoCorrect={false}
          autoCapitalize={'none'}
          value={this.props.pubChoice}
          onChangeText={value => this.props.inputUpdate({ prop: 'pubChoice', value })}
        />

        <Button
          bordered rounded small
          style={styles.buttonStyle}
          onPress={this.onCurrentLocationButtonPress.bind(this)}
        >
          Use Current Location
        </Button>

        <Text style={styles.textStyle}>----------- OR ----------</Text>

        <Input
          style={styles.inputStyle}
          placeholder="Enter City, State"
          autoCorrect={false}
          autoCapitalize={'none'}
          value={this.props.locationChoice}
          onChangeText={value => this.props.inputUpdate({ prop: 'locationChoice', value })}
        />
        <Text style={styles.textStyle} >Radius Around Selection - Need Picker</Text>
        <Button
          rounded small
          style={styles.buttonStyle}
          onPress={this.onSearchButtonPress.bind(this)}
        >
          Search
        </Button>
        <Thumbnail source={barleylogo} style={styles.imageStyle} />
      </Content>

      </Container>

    )
  }
}

const styles = {
  titleStyle: {
    marginTop: 30
  },

  textStyle: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },

  buttonStyle: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 300
  },

  inputStyle: {
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    backgroundColor: '#fff'
  },

  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  imageStyle: {
    marginTop: 30,
    width: 300,
    height: 125,
    alignSelf: 'center',
  }
}

const mapStatetoProps = (state) => {
  const { pubChoice, locationChoice } = state.user
  return { pubChoice, locationChoice };
}

export default connect(mapStatetoProps, {
  inputUpdate,
  fetchBreweryLocations,
  reverseGeoLocLookup
})(FindPubs)
