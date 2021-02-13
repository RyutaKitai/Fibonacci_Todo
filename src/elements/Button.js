import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.onPress}
      >
        <Text style={styles.buttonTxt}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 4,
    borderColor: '#61C8FF',
    alignItems: 'center',
    width: 200,
    padding: 15,
    alignSelf: 'center',
    backgroundColor: 'skyblue',
    borderRadius: 5,
  },
  buttonTxt: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 17,
  },
});

export default Button;
