import React from 'react'
import { StyleSheet, View } from 'react-native';

export default Cell = ({ style = {}, ...props }) => <View style={[styles.cell, style]} {...props} />

const styles = StyleSheet.create({
    cell: {
        margin: 7,
        flexGrow: 1,
    },
});