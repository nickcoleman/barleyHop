import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Linking } from 'react-native'
import {
  Button, Container, Content, Card,
  Thumbnail, Title,
} from 'native-base'

// Linking.openURL(url)
class ShowPub extends Component {
  render() {
    console.log(this.props.location)
    const {
      brewery, breweryId, lattitude, longitude, locationTypeDisplay, yearOpened,
      phone, streetAddress, locality, region, postalCode
    } = this.props.location
    let medium = '';
    if ( brewery.images !== undefined) {
      medium = brewery.images.medium
    }
    const {
      id, established, name, description, website,
    } = brewery

    return (
      <Container>
        <Content>
          <Card style={styles.headerTitleStyle}>
            <Title>
              {name}
            </Title>
          </Card>
          <Card style={styles.cardStyle}>
            <Text style={styles.sectionTitleStyle}>Address:</Text>
            <Text style={styles.centerStyle}>{streetAddress}</Text>
            <Text style={styles.centerStyle}>{locality}, {region} {postalCode}</Text>
            <Button bordered round small info style={styles.buttonStyle}>Map It</Button>
          </Card>
          <Card style={styles.cardStyle}>
            <Text style={styles.sectionTitleStyle}>Phone Number:</Text>
            <Text style={styles.centerStyle}>{phone || '<none provided>'}</Text>
            <Button bordered round small info style={styles.buttonStyle}>Call</Button>
          </Card>
          <Card style={styles.cardStyle}>
            <Text style={styles.sectionTitleStyle}>Website:</Text>
            <Text style={styles.centerStyle}>{website || '<none provided>'}</Text>
          </Card>
          <Card style={styles.cardStyle}>
            <Text style={styles.sectionTitleStyle}>More Info:</Text>
            <Thumbnail source={{uri: medium}} style={styles.imageStyle} />
            <Text>Established: {established  || ''}</Text>
            <Text >
              <Text style={{color: 'blue'}}>Description:</Text>
              {description || '<none provided>'}
            </Text>
          </Card>
        </Content>
      </Container>
    )
  }
}

styles = {
  headerTitleStyle: {
    paddingTop:10,
    paddingBottom: 10
  },

  cardStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },

  sectionTitleStyle: {
    fontWeight: 'bold'
  },

  buttonStyle: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 200
  },

  centerStyle: {
    alignSelf: 'center'
  },

  textStyle: {
    paddingLeft: 20,
    paddingRight: 20
  },

  imageStyle: {
    marginTop: 30,
    width: 300,
    height: 125,
    alignSelf: 'center',
  }
};

export default ShowPub
