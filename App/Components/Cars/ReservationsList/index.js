import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
   StyleSheet,
   ScrollView,
   FlatList, 
   ActivityIndicator, 
   View, 
   Text
  } from 'react-native';
import { 
  Button,
  Card, 
  Title,
  Paragraph,
  Switch,
  List
} from 'react-native-paper';
import {watchReservationList} from '../../../actions'
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

import firebase from '../../../../FirebaseConfig';
import { Color } from '../../../Style/Color';
import { StyleDefault } from '../../../Style/Styles';

class ReservationList extends Component {
  constructor(props) {
    super(props);
  }
  _renderItem = ({item}) => (
    <Card style={
      [StyleDefault.cardStyle,
      {
        borderWidth:2, borderColor: item.active ? Color.activeBooking : Color.inActiveBooking
       }
    ]}>
      <View style={{flexDirection:'row'}}>
        <View style={styles.col55}>
          <Card.Cover source={{ uri: item.imageUrl }}  style={StyleDefault.cardCover}/>
        </View>
        <View style={styles.col45}>
          <Card.Content>
            <Text style={styles.carTitle}>{item.name}</Text>
            <Paragraph style={StyleDefault.locationStyle}>
              <Icon name='map-marker' color={'green'} size={16} /> 
              <Text> {item.location}</Text>
            </Paragraph>
          </Card.Content>
        </View>
      </View>  
      <View style={styles.dateInfo}>
        <View style={[styles.wrapperColumn,styles.col50]}>
          <Text>Collected </Text>
          <Text>{Moment(item.startTime).format("DD-MMM-YYYY HH:mm")}</Text>
          </View>
        <View style={[styles.borderLeft,styles.wrapperColumn,styles.col50]}>
          <Text> {item.active ? 'Ride in progress' : 'Returned'}</Text> 
          <Text>
            {!item.active ? Moment(item.endTime).format("DD-MMM-YYYY HH:mm") : ''}
          </Text>
        </View>      
      </View>  
    </Card>
  );
  //toggle switch
  updateToggle(val){
    this.props.toggle(val)
  }

  render() {
    const {reservationList,activeList} = this.props
    if(reservationList === undefined){
      return(
        <View style={StyleDefault.activity}>
          <ActivityIndicator size="large" color={Color.primary}/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row',alignItems:'center',margin:10}}>
          <Text style={styles.activeText}>
            View Active Bookings 
          </Text>
          <Switch
            value={activeList}
            onValueChange={() =>
              this.updateToggle(!activeList)
              }
            />
        </View>
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
    backgroundColor:Color.white
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  wrapperColumn:{
    flexDirection:'column',
    padding:5,
  },
  carTitle:{
    fontSize:14,
    fontWeight: 'bold',
    margin:5
  },
  col55:{
    width:'55%'
  },
  col50:{
    width:'50%'
  },
  col45:{
    width:'45%'
  },
  locationName:{
    marginHorizontal: 3,
  },
  dateInfo:{
    flexDirection:'row',
    borderWidth: 2,
    borderColor: Color.borderColor,
  },
  borderLeft:{
    borderLeftWidth:1,
    borderLeftColor: Color.borderColor,
  },
  activeText:{
    fontSize:15,
    fontWeight:'bold'
  }
})

export default ReservationList;
