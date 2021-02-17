import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { strings } from 'prop-types';

export default function Button(props) {
  const { children } = props;
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
      >
        <Text style={styles.buttonTxt}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

Button.prototypes = {
  children: strings,
};

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

// export default Button;
