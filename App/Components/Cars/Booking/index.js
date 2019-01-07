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
  Text,
  TouchableOpacity
} from 'react-native';

import { Color } from '../../../Style/Color';
import {StyleDefault} from '../../../Style/Styles';
import { fetchCarDetails, confirmBooking, getUserToken } from '../../../actions'
import DateTimePicker from 'react-native-modal-datetime-picker';

const mapStateToProps = (state) => {
  return {
    token: state.userTokenReducers.token,
    confirmBooking: state.confirmBookingReducers,
    carDetails: state.carDetailsReducers.carDetails,
  };
}


const mapDispatchToProps = (dispatch, props) => {  
  const key = props.navigation.getParam('carKey')
  return {
    getUserToken: () => dispatch(getUserToken()),
    fetchCarDetails: () => dispatch(fetchCarDetails(key)),
    confirmBooking: (val) => dispatch(confirmBooking(val)),
  };
}
 

class CarDetailScreen extends Component {
  static navigationOptions = {
    title: 'Car Details',
  };

  state = {
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false,
    startDateTime: '',
    endDateTime: '',
  };

  constructor(props) {
    super(props);
    this.props.fetchCarDetails()
  }
  //get user token 
  componentDidMount(){
    this.props.getUserToken()
  }

  bookingConfirmation() {
    const key = this.props.navigation.getParam('carKey')
    const carDetails = this.props.carDetails.details
    const token = this.props.token
   
    let createBooking = {
      key: key,
      startTime: this.state.startDateTime,
      endTime: this.state.endDateTime,
      name: carDetails.name,
      active: true,
      location: carDetails.location,
      image_url: carDetails.image_url,
      availability: carDetails.availability,
      token: token
    }
    
    this.props.confirmBooking(createBooking)
      setTimeout(function () {
        this.props.navigation.goBack();
      }.bind(this), 1000);
  }

  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });
 
  showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });
   
  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });
   
  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });
   
  handleStartDatePicked = (date) => {
    this.setState({
      startDateTime : date
    })
    this.hideStartDateTimePicker();
  };
   
  handleEndDatePicked = (date) => {
    this.setState({
      endDateTime: date
    })
    this.hideEndDateTimePicker();
  };

  render() {
    const { carDetails, confirmBooking } = this.props
    const { startDateTime,endDateTime, startDateTimePickerVisible, endDateTimePickerVisible } = this.state
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

            <View style={{ flex: 1 }}>              
              <DateTimePicker
              isVisible={startDateTimePickerVisible}
              onConfirm={this.handleStartDatePicked}
              onCancel={this.hideStartDateTimePicker}
              maximumDate={endDateTime}
              minimumDate={new Date()}
              minuteInterval={15}
              mode={'datetime'}
              />
            </View>
            <TouchableOpacity  onPress={this.showStartDateTimePicker}>
              <List.Item
                style={styles.listItem}
                title={startDateTime === '' ? "Select Pickup Date" :"Pickup By: " +  Moment(startDateTime).format("DD-MM-YYYY HH:mm")}
                left={() => <List.Icon icon="flag" color={'green'} />}
              />
            </TouchableOpacity>
            
            <View style={{ flex: 1 }}>
              <DateTimePicker
              isVisible={endDateTimePickerVisible}
              onConfirm={this.handleEndDatePicked}
              onCancel={this.hideEndDateTimePicker}
              minimumDate={startDateTime}
              minuteInterval={15}
              mode={'datetime'}
              />
            </View>
            <TouchableOpacity onPress={this.showEndDateTimePicker}>
              <List.Item
                style={styles.listItem}
                title={endDateTime === '' ? "Select Return Date" : "Return By: " +  Moment(endDateTime).format("DD-MM-YYYY HH:mm")}
                left={() => <List.Icon icon="flag" color={'red'} />}
              />
            </TouchableOpacity>
            
            <List.Item
              style={styles.listItem}
              title={carDetails.details.location}
              left={() => <List.Icon icon="map" color={'green'} />}
            />
          </List.Section>
          
          <Button
            onPress={() => this.bookingConfirmation()}
            disabled={this.state.startDateTime === '' || this.state.endDateTime === ''} 
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