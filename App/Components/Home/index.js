import React,{Component} from 'react';
import { connect } from 'react-redux';

import HomeView from './Home';
import {Color} from '../../Style/Color';
import { watchCarsList,getUserToken } from '../../actions'


const mapStateToProps = (state) => {
  return { 
    token: state.userTokenReducers.token,
    carsList: state.carListReducers.carsList,
   
  };
}

const mapDispatchToProps = (dispatch,props) => {
  return { 
    getUserToken: () => dispatch(getUserToken()),
    watchCarsList: () => dispatch(watchCarsList()),   
  };
}

class Home extends Component {

  constructor(props){
    super(props)
    this.props.getUserToken()
    this.props.watchCarsList()
  }

  componentDidMount(){
    this.props.getUserToken()
    const token = this.props.token
    this.props.watchCarsList()
  }



  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerTintColor: Color.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  render() {
    const {carsList,navigation} = this.props
    return (
      <HomeView carsList={carsList} navigation={navigation} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);