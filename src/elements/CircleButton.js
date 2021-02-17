import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class CircleButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.circleAddButton} onPress={this.props.onPress}>
        <Text style={styles.circleButtonText}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  circleAddButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
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
