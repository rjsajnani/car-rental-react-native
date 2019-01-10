import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import car from './car.png'
import CustomCallout from './CustomCallout';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE =3.060751;
const LONGITUDE = 101.678477;
const LATITUDE_DELTA = 0.922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class HomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
       
      },
      carList: []
    };
  }

  componentWillReceiveProps(){
    this.setState({
      carList: this.props.carsList
    })
  }


  confirmBooking(val){  
    this.props.navigation.navigate('Booking', {carKey: val})
  }

  render() {
    const { region,carList} = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={region}
        >
          {
            carList.map(marker => (
              <Marker
                key={marker.key}
                image={car}
                coordinate={marker.coordinate}
                title={marker.name}
                description={marker.name}
              >
                <Callout tooltip style={styles.customView}>
                  <CustomCallout disabled={!marker.availability} confirmBooking={this.confirmBooking.bind(this,marker.key)} >
                    <Text>{marker.name}</Text>
                    <Text>{"@ "+marker.location}</Text>
                  </CustomCallout>
                </Callout>
              </Marker>
            ))
          }
        </MapView>
        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text>Tap on markers to see different cars availability</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customView: {
    width: 150,
    height: 100,
  },
  plainView: {
    width: 60,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default HomeView;