import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

// // checkboxコンポーネント
// const checkBox = ({ id, value, checked, onChange }) => {
//   return (
//     <input
//       id={id}
//       type="checkbox"
//       name="inputNames"
//       checked={checked}
//       onChange={onChange}
//       value={value}
//     />
//   );
// };

class CheckBox extends React.Component {
  render() {
    // // checkedItemsは初期値を空のオブジェクトにする
    // const [checkedItems, setCheckedItems] = useState({});
    // // ひとつでもcheckedになっている場合にのみ送信ボタンを表示させたいので、全体のStateを監視する
    // const [isBtnHide, setIsBtnHide] = useState(true);

    // useEffect(() => {
    //   // checkedItemsが空では無い場合、送信ボタンを表示させる
    //   // eslint-disable-next-line no-unused-expressions
    //   Object.keys(checkedItems).length && setIsBtnHide(false);
    //   // すべてのcheckedItemの値がfalseの場合に送信ボタンを表示させる
    //   setTimeout(() => {
    //     if (
    //       Object.values(checkedItems).every(checkedItem => {
    //         return checkedItem === false;
    //       })
    //     ) {
    //       setIsBtnHide(true);
    //     }
    //   }, 100);
    // }, [checkedItems]);

    // const handleChange = e => {
    //   // checkedItemsのstateをセット
    //   setCheckedItems({
    //     ...checkedItems,
    //     [e.target.id]: e.target.checked,
    //   });
    //   console.log('checkedItems:', checkedItems);
    // };

    // const dataSendBtn = e => {
    //   // 既定のイベントをキャンセルさせる
    //   e.preventDefault();
    //   // 送信ボタンを押したタイミングで、checkedItemsオブジェクトのvalueがtrueのkeyのみを配列にしてconsoleに表示させる
    //   const dataPushArray = Object.entries(checkedItems).reduce((pre, [key, value]) => {
    //     // eslint-disable-next-line no-unused-expressions
    //     value && pre.push(key);
    //     return pre;
    //   }, []);
    //   console.log('dataPushArray:', dataPushArray);
    // };

    return (
      <TouchableOpacity style={styles.checkBox}>
        <Text styles={styles.txt}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  txt: {
    color: '#61C8FF',
  },
});

export default CheckBox;
