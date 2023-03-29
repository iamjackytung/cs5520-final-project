import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Header as HeaderRNE, HeaderProps, Icon, Avatar } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header = (props) => {
  const navigation = useNavigation();

  const docsNavigate = () => {
    // Linking.openURL(
    //   `https://reactnativeelements.com/docs/components/${props.view}`
    // );
  };

  const playgroundNavigate = () => {
    // Linking.openURL(`https://react-native-elements.js.org/#/${props.view}`);
  };

  return (
    <HeaderRNE
      // leftComponent={{
      //   icon: 'menu',
      //   color: '#fff',
      //   onPress: navigation.openDrawer,
      // }}
      leftComponent={
        <Avatar
          size={'small'}
          rounded
          source={{url: 'https://randomuser.me/api/portraits/men/36.jpg'}}
        />
      }
      leftContainerStyle={styles.headerLeft}
      rightComponent={
        <>
          <TouchableOpacity onPress={docsNavigate}>
            <Icon name="description" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={playgroundNavigate}
          >
            <Icon type="antdesign" name="rocket1" color="white" />
          </TouchableOpacity>
          </>
      }
      rightContainerStyle={styles.headerRight}
      centerComponent={{ text: props.title, style: styles.heading }}
    />
  );
};

const SubHeader = ({ title, containerStyle, textStyle }) => {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <Text style={[styles.heading, textStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 5,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { Header, SubHeader };