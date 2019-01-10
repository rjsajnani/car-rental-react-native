import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Button } from 'react-native-paper'

import { Color } from '../../Style/Color';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

class CustomCallout extends React.Component {
  render() {
    const {disabled} = this.props
    return (
        <View style={[styles.container, this.props.style]}>
          <View style={styles.bubble}>
            <View style={styles.amount}>
              {this.props.children}
              <Button mode={'contained'} disabled={disabled} onPress={() => this.props.confirmBooking()} >
                <Text style={{fontSize:12}}>{disabled ? "Unavailable": "Pick Up"}</Text>
              </Button>
            </View>
          </View>
          <View style={styles.arrowBorder} />
          <View style={styles.arrow} />
        </View>
    );
  }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: "100%",
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: Color.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderColor: Color.white,
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: Color.white,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: Color.white,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  buttonStyle:{
    padding:3,
    fontSize:14
  }
});

export default CustomCallout;