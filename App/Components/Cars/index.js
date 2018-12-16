import React,{Fragment,Component} from 'react';
import { connect } from 'react-redux';
import { Appbar } from 'react-native-paper';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet
} from 'react-native';
import { 
  TabView, 
  TabBar, 
  SceneMap 
} from 'react-native-tab-view';

import CarList from './CarListing';
import {Color} from '../../Style/Color';
import ReservationList from './ReservationsList'
import { watchCarsList,watchReservationList } from '../../actions'


const mapStateToProps = (state) => {
  return { 
    carsList: state.carListReducers.carsList,
    reservationList: state.reservationReducers.reservationList,
    activeList : state.reservationReducers.activeList
  };
}

const mapDispatchToProps = (dispatch,props) => {
  return { 
    watchCarsList: () => dispatch(watchCarsList()),
    watchReservationList: (val) => dispatch(watchReservationList(val))
  };
}

class Cars extends Component {
  constructor(props){
    super(props)
    this.props.watchCarsList()
    this.props.watchReservationList()
  }
  state = {
    index: 0,
    routes: [
      { key: 'carListing', title: 'Book a Car' },
      { key: 'reservation', title: 'Reservations' },
    ],
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Car',
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerTintColor: Color.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  _renderTabBar = props => {
    return (
      <View>
        <TabBar
          {...props}
        />
      </View>
     
    );
  };

  toggle(value){
    this.props.watchReservationList(value) 
  }

  _renderScene = ({ route }) => {
    const {carsList,reservationList,activeList} = this.props
    switch (route.key) {
      case 'carListing':
        return  <CarList navigation={this.props.navigation} carsList={carsList} />;
      case 'reservation':
        return <ReservationList reservationList={reservationList} activeList={activeList} toggle={this.toggle.bind(this)} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cars);