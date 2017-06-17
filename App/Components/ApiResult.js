import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'

export default class APIResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: false,
      title: false
    }
  }

  onApiPress = () => {
    this.setState({message: false})
  }

  renderView () {
    return (
      <ScrollView style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute' }} overflow='hidden'>
        <TouchableOpacity
          style={{backgroundColor: 'white', padding: 20}}
          onPress={this.onApiPress}
        >
          <Text>{this.state.title} Response:</Text>
          <Text allowFontScaling={false} style={{fontFamily: 'CourierNewPS-BoldMT', fontSize: 10}}>
            {this.state.message}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  render () {
    let messageView = null
    if (this.state.message) {
      return this.renderView()
    }

    return messageView
  }
}

