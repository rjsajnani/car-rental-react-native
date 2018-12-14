import React, { Component } from 'react';
import { StyleSheet, ScrollView,FlatList, ActivityIndicator, View, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../../FirebaseConfig';
import { Color } from '../../Style/Color';
import Moment from 'moment';

class CarList extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('cars')
    this.update = firebase.firestore().collection('cars').where('availability', "===", false)
    this.unsubscribe = null;
    this.subscribe = null;
    this.state = {
      isLoading: true,
      cars: []
    };
  }
  _renderItem = ({item}) => (
    <Card style={styles.cardStyle}>
      <Card.Cover source={{ uri: item.imageUrl }} style={styles.cardCover}/>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph style={styles.locationStyle}>
          <Icon name='map-marker' color={'green'} size={16} /> 
          <Text style={styles.locationName}>{item.location}</Text>
        </Paragraph>
      </Card.Content>
      <Card.Actions style={styles.buttonStyle}>
        <Text>
          {Moment(item.endTime).fromNow()}
        </Text>
          <Button 
            disabled={!item.availability}
            mode='contained'
            onPress={() => {
              this.props.navigation.navigate('Booking', {
                carKey: `${item.key}`,
              });
            }
          }>

            {item.availability ? 'Book': 'Unavailable'}
          </Button>  
      </Card.Actions>
    </Card>
  );
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.subscribe = this.update.onSnapshot(this.onUpdate);
    // setImmediate(this.state.endTime, 1000)
  }

  onUpdate = (querySnapshot) =>{
    debugger
    querySnapshot.forEach((doc) => {
      const {endTime} = doc.data();
      let time = new Date()
      
    })
  }
  onCollectionUpdate = (querySnapshot) => {
    console.log(querySnapshot)
    const cars = [];
    querySnapshot.forEach((doc) => {
      const { name, location, color, registration_no,image_url, availability,endTime,nowTime } = doc.data();
      cars.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        location,
        color,
        imageUrl: image_url,
        registrationNo: registration_no,
        availability,
        endTime,
        nowTime
      });
    });
    this.setState({
      cars,
      isLoading: false,
    });
  }
  render() {
    const {cars} = this.state
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color={Color.primary}/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={cars}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem.bind(this)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
  locationStyle:{
    flexDirection:'row',
    alignItems:'center'
  },
  locationName:{
    marginHorizontal: 3,
  },
  buttonStyle:{
    justifyContent:'flex-end',
    padding:0,
    paddingHorizontal: 8,
    paddingVertical: 5,
    paddingTop: 0,
  },
  cardStyle:{
    margin: 10,
    shadowColor: 'rgba(0,0,0,0.9)',
    shadowRadius: 10,
    elevation: 5,
  },
  cardCover:{
    backgroundColor: "#fff"
  }
})

export default CarList;
