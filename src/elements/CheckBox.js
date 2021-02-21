import React, { useContext } from 'react';
import {
  TouchableOpacity, StyleSheet, View, Image,
} from 'react-native';
import { MyContext } from '../screens/MemoListScreen';

export default function CheckBox(props) {
  const { dispatch } = useContext(MyContext);
  const { isChecked, id } = props;
  return (
    <View>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={
          () => dispatch({
            type: 'CHECKED_BOX',
            actid: id,
          })
        }
      >
        {isChecked ? (
          <View>
            <View>
              <Image
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
                // eslint-disable-next-line global-require
                source={require('../../assets/check_right.png')}
              />
            </View>
          </View>
        )
          : (
            <View>
              <Image
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
                // eslint-disable-next-line global-require
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
