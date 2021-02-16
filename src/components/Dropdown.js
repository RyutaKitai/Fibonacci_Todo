import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

// export default function DropDownMenu() {
//   const [isChecked, clickState] = useState(false);

//   return (
//     <View>
//       <TouchableOpacity
//         style={styles.checkBox}
//         onPress={() => clickState(!isChecked)}
//       >
//         {isChecked ? (
//           <View>
//             <View>
//               <Image
//                 style={{ width: 40, height: 40 }}
//                 resizeMode="contain"
//                 source={require('../../assets/check_right.png')}
//               />
//             </View>
//           </View>
//         ) :
//           (
//             <View>
//               <Image
//                 style={{ width: 40, height: 40 }}
//                 resizeMode="contain"
//                 source={require('../../assets/check_no.png')}
//               />
//             </View>
//           )}
//       </TouchableOpacity>
//     </View>
//   );
// }

class DropDownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
    };
  }

  handleClickMenu(val) {
    this.setState({
      listOpen: false,
    });
    alert(val);
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }));
  }

  render() {
    const { listOpen } = this.state;
    return (
      <View style={styles.dropDownMenu}>
        <View onClick={this.toggleList.bind(this)} style={styles.menuButton}>
          <Text>menu</Text>
        </View>
        {listOpen && (
          <View style={styles.menuBox}>
            <View style={styles.menuContent}>
              <View onClick={this.handleClickMenu.bind(this, 1)}><Text>1</Text></View>
            </View>
            <View style={styles.menuContent}>
              <View onClick={this.handleClickMenu.bind(this, 2)}><Text>2</Text></View>
            </View>
            <View style={styles.lastMenuContent}>
              <View onClick={this.handleClickMenu.bind(this, 3)}><Text>3</Text></View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropDownMenu: {
    position: 'relative',
  },
  menuButton: {
    padding: 3,
  },
  menuBox: {
    position: 'absolute',
    top: 23,
    width: 120,
  },
  menuContent: {
    padding: 5,
  },
  lastMenuContent: {
    padding: 5,
  },
});

export default DropDownMenu;
