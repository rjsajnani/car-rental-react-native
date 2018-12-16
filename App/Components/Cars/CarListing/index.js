import React, { Component } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { 
  StyleSheet, 
  ScrollView,
  FlatList, 
  ActivityIndicator, 
  View, 
  Text,
  Image,
  TouchableOpacity
 } from 'react-native';
import { 
  Button, 
  Card, 
  Title, 
  Paragraph 
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Color } from '../../../Style/Color';
import { watchCarsList } from '../../../actions';
import firebase from '../../../../FirebaseConfig';
import { StyleDefault } from '../../../Style/Styles';

class CarList extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem = ({item,key}) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Booking', {
      carKey: `${item.key}`})} disabled={!item.availability}>
      <Card style={StyleDefault.cardStyle} key={key}>
        <Card.Cover source={{uri: item.imageUrl}} style={StyleDefault.cardCover}/>
        <Card.Content>
          <Title>{item.name}</Title>
          <Paragraph style={StyleDefault.locationStyle}>
            <Icon name='map-marker' color={'green'} size={16}/> 
            <Text> {item.location}</Text>
          </Paragraph>
        </Card.Content>
        <Card.Actions style={styles.buttonStyle}>
          <Button 
            disabled={!item.availability}
            mode='contained'
            onPress={() => {
              this.props.navigation.navigate('Booking', {
              carKey: `${item.key}`});
            }
          }>
            {item.availability ? 'Book': 'Unavailable'}
          </Button>  
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );

  render() {
    const {carsList} = this.props
    if(carsList === undefined){
      return(
        <View style={StyleDefault.activity}>
          <ActivityIndicator size="large" color={Color.primary}/>
        </View>
      )
    }else{
      return (
        <ScrollView style={styles.container}>
          <FlatList
            data={carsList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem.bind(this)}
          />
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Color.white
  },
  buttonStyle:{
    justifyContent:'flex-end',
    padding:0,
    paddingHorizontal: 8,
    paddingVertical: 5,
    paddingTop: 0,
  },
})

export default (CarList);
