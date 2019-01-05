import React,{Component} from 'react';
import { connect } from 'react-redux';
import {
  View,
  Dimensions,
  StyleSheet
} from 'react-native';
import { 
  TabView, 
  TabBar, 
} from 'react-native-tab-view';

import CarList from './CarListing';
import {Color} from '../../Style/Color';
import ReservationList from './ReservationsList'
import { watchCarsList,watchReservationList,getUserToken } from '../../actions'


const mapStateToProps = (state) => {
  return { 
    token: state.userTokenReducers.token,
    carsList: state.carListReducers.carsList,
    activeList : state.reservationReducers.activeList,
    reservationList: state.reservationReducers.reservationList,
  };
}

const mapDispatchToProps = (dispatch,props) => {
  return { 
    getUserToken: () => dispatch(getUserToken()),
    watchCarsList: () => dispatch(watchCarsList()),
    watchReservationList: (val,token) => dispatch(watchReservationList(val,token)),
  };
}

class Cars extends Component {
  constructor(props){
    super(props)
    this.props.getUserToken()
    this.props.watchCarsList()
    this.props.watchReservationList()
  }
  componentDidMount(){
    this.props.getUserToken()
    const token = this.props.token
    this.props.watchReservationList(false,token) 
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
    const token = this.props.token
    this.props.watchReservationList(value,token) 
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