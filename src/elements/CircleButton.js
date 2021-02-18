import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

class CircleButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={[styles.circleAddButton, this.props.style]} onPress={this.props.onPress}>
        {this.props.value === true ? <Text style={styles.circleButtonText}>{this.props.children}</Text> : <Image style={{ width: 35, height: 35 }} resizeMode="contain" source={require('../../assets/bin.png')} />}
        {/* <Text style={styles.circleButtonText}>{this.props.children}</Text> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  circleAddButton: {
    width: 48,
    height: 48,
    backgroundColor: '#000',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 10,
  },
  circleButtonText: {
    fontSize: 40,
    lineHeight: 40,
    color: '#fff',
  },
});

export default CircleButton;
