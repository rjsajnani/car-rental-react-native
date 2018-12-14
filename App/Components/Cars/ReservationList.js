import React, { Component } from 'react';
import { StyleSheet, ScrollView,FlatList, ActivityIndicator, View, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../../FirebaseConfig';
import { Color } from '../../Style/Color';


class ReservationList extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('reservations')
    this.unsubscribe = null;
    this.subscribe = null;
    this.state = {
      isLoading: true,
      reservationList: []
    };
  }
  _renderItem = ({item}) => (
    <Card>
      <Card.Cover source={{ uri: item.imageUrl }} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph style={styles.locationStyle}>
          <Icon name='map-marker' color={'green'} size={16} /> 
          <Text style={styles.locationName}>{item.location}</Text>
        </Paragraph>
      </Card.Content>
      <Card.Actions style={styles.buttonStyle}>
          <Button 
            disabled={!item.active}
            mode='contained'>
            {item.active ? 'Book': 'Unavailable'}
          </Button>  
      </Card.Actions>
    </Card>
  );
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
      debugger
    console.log(querySnapshot)
    const reservationList = [];
    querySnapshot.forEach((doc) => {
      const { endTime, startTime, color, active,image_url, name,location, } = doc.data();
      reservationList.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        location,
        color,
        imageUrl: image_url,
      });
    });
    this.setState({
        reservationList,
      isLoading: false,
    });
  }
  render() {
    const {reservationList} = this.state
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
          data={reservationList}
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
  }
})

export default ReservationList;
