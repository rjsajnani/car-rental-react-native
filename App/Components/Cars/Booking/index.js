import React, { Component } from 'react';
import Moment from 'moment';
import { Title, Button, Card } from 'react-native-paper';
import { StyleSheet, ScrollView, ActivityIndicator, View, Image, Text } from 'react-native';
import firebase from '../../../../FirebaseConfig';
import { Color } from '../../../Style/Color';

class BoardDetailScreen extends Component {
  static navigationOptions = {
    title: 'Board Details',
  };
  constructor() {
		super();
		this.ref = firebase.firestore().collection('reservations');
    this.state = {
      isLoading: true,
      carDetails: {},
			key: '',
			startTime: '',
			endTime: '',
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('cars').doc(navigation.getParam('carKey'));
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          carDetails: doc.data(),
					key: doc.id,
					startTime: Moment(),
					endTime: Moment().add(`${doc._data.rental_time}`, 'minutes'),
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
	saveBoard() {
    const {key,startTime,endTime,carDetails} = this.state
    console.log(Moment(endTime).toDate())
		this.setState({
			isLoading: true,
		});
		const updateRef = firebase.firestore().collection('cars').doc(this.state.key);
		updateRef.update({
      availability: !carDetails.availability,
      endTime: Moment(endTime).toDate(),
      nowTime: Moment(startTime).toDate(),
		})
		this.ref.add({
			id: key,
			startTime: Moment(startTime).toDate(),
      endTime: Moment(endTime).toDate(),
      name: carDetails.name,
      active: true,
      location: carDetails.location,
      image_url: carDetails.image_url,
		}).then((docRef) => {
			this.props.navigation.goBack();
		})
		.catch((error) => {
			console.error("Error adding document: ", error);
			this.setState({
				isLoading: false,
			});
		});
	}

  render() {
    const{carDetails,startTime,endTime } = this.state 
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color={Color.primary} />
        </View>
      )
    }
    return (
      <ScrollView>
        <View style={styles.container}>
					<Title>{carDetails.registration_no}</Title>
					<Image
						style={{width: 100, height: 100,}}
          	source={{uri: carDetails.image_url}}
        	/>
					<Text>{Moment(startTime).format("HH:mm")}</Text>
					<Text>{Moment(endTime).format("HH:mm")}</Text>					
					<Button 
						onPress={()=> this.saveBoard() }
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
  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailButton: {
    marginTop: 10
  }
})

export default BoardDetailScreen;