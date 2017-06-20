import React from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Metrics, Images } from '../../ignite/DevScreens/DevTheme'
import API from '../../App/Services/MusicApi'
import FJSON from 'format-json'
import APIResult from '../../App/Components/ApiResult'
import FullButton from '../../App/Components/FullButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SelectionScreenStyle'

const endpoints = [
  { label: 'Pearl Jam', endpoint: 'getPearlJam' },
  {
    label: 'Pearl Jam Setlists', endpoint: 'getSetlists',
    args: { 'mbdid': '83b9cbe7-9857-49e2-ab8e-b57b01038103' }
  }
]

export default class SelectionScreen extends React.Component {
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight
    }

    this.api = API.create()
    
  }

  showResult (response, title = 'Response') {
    this.refs.container.scrollTo({x: 0, y: 0, animated: true})
    if (response.ok) {
      this.refs.result.setState({message: FJSON.plain(response.data), title: title})
    } else {
      this.refs.result.setState({message: `${response.problem} - ${response.status}`, title: title})
    }
  }

  tryEndpoint (apiEndpoint) {
    const { label, endpoint, args = [''] } = apiEndpoint
    console.log(endpoint)
    this.api[endpoint].apply(this, args).then((result) => {
      this.showResult(result, label || `${endpoint}`)
    })
  }

  renderButton (apiEndpoint) {
    const { label, endpoint, args = [''] } = apiEndpoint
    return (
      <FullButton text={label || `${endpoint}`} onPress={this.tryEndpoint.bind(this, apiEndpoint)} styles={{marginTop: 10}} key={`${endpoint}}`} />
    )
  }

  renderButtons () {
    return endpoints.map((endpoint) => this.renderButton(endpoint))
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container} ref='container'>
          <View style={{alignItems: 'center', paddingTop: 60}}>
            <Image source={Images.api} style={styles.logo} />
            <Text style={styles.titleText}>API</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionText}>
              Testing API with Postman or APIary.io verifies the server works.
              The API Test screen is the next step; a simple in-app way to verify and debug your in-app API functions.
            </Text>
            <Text style={styles.sectionText}>
              Create new endpoints in Services/Api.js then add example uses to endpoints array in Containers/APITestingScreen.js
            </Text>
          </View>
          {this.renderButtons()}
          <APIResult ref='result' />
        </ScrollView>
      </View>
    )
  }
}