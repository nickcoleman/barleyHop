import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container, Content, Button,
  Input, Icon, Item, Title
} from 'native-base';
import { Picker, View, Text } from 'react-native'

import {
  inputUpdate,
  fetchBreweryLocations
} from '../actions'

class FindPubs extends Component {

  onSearchButtonPress() {
    this.props.fetchBreweryLocations(this.props.pubChoice, this.props.locationChoice)
  }

  render() {
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

        <Button bordered rounded small style={styles.buttonStyle} >
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
  }
}

const mapStatetoProps = (state) => {
  const { pubChoice, locationChoice } = state.user
  return { pubChoice, locationChoice };
}

export default connect(mapStatetoProps, {
  inputUpdate,
  fetchBreweryLocations
})(FindPubs)
