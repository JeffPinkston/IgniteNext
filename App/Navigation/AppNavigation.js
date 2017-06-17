import { StackNavigator } from 'react-navigation'
import SelectionScreen from '../Containers/SelectionScreen'
import Concerts from '../Containers/Concerts'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SelectionScreen: { screen: SelectionScreen },
  Concerts: { screen: Concerts },
  LaunchScreen: { screen: LaunchScreen },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: { title: 'Login' }
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SelectionScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
