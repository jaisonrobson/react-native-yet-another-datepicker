import React from 'react'
import { StyleSheet, StatusBar, View } from 'react-native'

import DatePickerModalButton from './datepicker'

export default function App() {
  return (
    <View style={styles.container}>
      <DatePickerModalButton />

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
