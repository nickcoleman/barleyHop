import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

class ShowPub extends Component {
  render() {
    console.log(this.props.brewery)
    // const {name, description, id } = this.props.brewery
    return (
      <View>
        <Text>
          showPub
        </Text>
      </View>
    )
  }
}

export default ShowPub
