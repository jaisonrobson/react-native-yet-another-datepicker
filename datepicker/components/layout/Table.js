import React from 'react'
import { StyleSheet, View } from 'react-native'

export default Table = ({ style = {}, ...props }) => <View style={[styles.table, style]} {...props} />

const styles = StyleSheet.create({
    table: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});