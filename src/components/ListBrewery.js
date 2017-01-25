import React, { Component } from 'react'
import { Text, TouchableWithOutFeedback, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { CardSection } from './common'

class ListItem extends Component {
  onRowPress() {
    Actions.showPub({brewery: this.props.brewery})
  }

  render() {
    const { name } = this.props.pub.brewery
    console.log(name)
    return (
      <TouchableWithOutFeedback onPress={this.onRowPress.bind(this)} />
      <View>
        <CardSection>
          <Text style={styles.titleStyle}>
            { name }
          </Text>
        </CardSection>
      </View>
    )
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default ListItem
