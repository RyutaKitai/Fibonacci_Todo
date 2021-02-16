import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';

// export default CheckBox;
export default function CheckBox() {
  const [isChecked, clickState] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => clickState(!isChecked)}
      >
        {isChecked ? (
          <View>
            <View>
              <Image
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
                source={require('../../assets/check_right.png')}
              />
            </View>
          </View>
        ) :
          (
            <View>
              <Image
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
                source={require('../../assets/check_no.png')}
              />
            </View>
          )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: '#61C8FF',
  },
});
