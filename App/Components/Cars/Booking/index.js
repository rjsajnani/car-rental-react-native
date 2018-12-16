import Moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { 
  Title,
  Button,
  Card,
  List
} from 'react-native-paper';
import { 
  StyleSheet, 
  ScrollView,
  ActivityIndicator, 
  View, 
  Image, 
  Text 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Color } from '../../../Style/Color';
import {StyleDefault} from '../../../Style/Styles'
import firebase from '../../../../FirebaseConfig';
import { fetchCarDetails, confirmBooking } from '../../../actions'

const mapStateToProps = (state) => {
  return {
    carDetails: state.carDetailsReducers.carDetails,
    confirmBooking: state.confirmBookingReducers
  };
}

const mapDispatchToProps = (dispatch, props) => {
  debugger
  const key = props.navigation.getParam('carKey')
  return {
    fetchCarDetails: () => dispatch(fetchCarDetails(key)),
    confirmBooking: (val) => dispatch(confirmBooking(val))
  };
}

class CarDetailScreen extends Component {
  static navigationOptions = {
    title: 'Car Details',
  };
  constructor(props) {
    super(props);
    this.props.fetchCarDetails()
  }

  bookingConfirmation() {
    const key = this.props.navigation.getParam('carKey')
    const carDetails = this.props.carDetails.details
    console.log(this.props)
    let createBooking = {
      key: key,
      startTime: Moment(carDetails.current_time).toDate(),
      endTime: Moment(carDetails.endTime).toDate(),
      name: carDetails.name,
      active: true,
      location: carDetails.location,
      image_url: carDetails.image_url,
      availability: carDetails.availability
    }
    this.props.confirmBooking(createBooking)
      setTimeout(function () {
        this.props.navigation.goBack();
      }.bind(this), 1000);
  }

  render() {
    const { carDetails, confirmBooking } = this.props
    if (confirmBooking === true || carDetails === undefined || carDetails.length <= 0) {
      return (
        <View style={StyleDefault.activity}>
          <ActivityIndicator size="large" color={Color.primary} />
        </View>
      )
    }

    return (
      <ScrollView style={{backgroundColor:Color.white}}>
        <View style={styles.container}>
          <Title>{carDetails.details.registration_no}</Title>
          <Card style={{shadowOpacity: 0,}}>
            <Card.Cover source={{ uri: carDetails.details.image_url }} style={StyleDefault.cardCover} />
          </Card>
          <Title>{carDetails.details.name}</Title>
          <View style={styles.wrapperRow}>
            <Text>Vehicle Color</Text> 
            <Text style={[{backgroundColor:carDetails.details.color},styles.colorSelection]}> </Text>
          </View>
          <List.Section title="Rental Details">
            <List.Item
              style={styles.listItem}
              title={"Pickup By: " + Moment(carDetails.startTime).format("DD-MM-YYYY HH:mm")}
              left={() => <List.Icon icon="flag" color={'green'} />}
            />
            <List.Item
              style={styles.listItem}
              title={"Return By: " + Moment(carDetails.endTime).format("DD-MM-YYYY HH:mm")}
              left={() => <List.Icon icon="flag" color={'red'}/>}
            />
            <List.Item
              style={styles.listItem}
              title={carDetails.details.location}
              left={() => <List.Icon icon="map" color={'green'} />}
            />
          </List.Section>
          <Button
            onPress={() => this.bookingConfirmation()}
            mode='contained'
          >
            Confirm Reservation
          </Button>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  listItem:{
    padding: 0,
  },
  wrapperRow:{
    flexDirection: 'row',
    alignItems:'center'
  },
  colorSelection:{
    fontSize: 16,
    color: Color.white,
    paddingHorizontal: 10,
    minWidth: 0,
    borderWidth:1,
    borderColor: Color.borderColor,
    marginHorizontal: 10,    
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CarDetailScreen);