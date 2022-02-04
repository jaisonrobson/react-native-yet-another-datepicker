import React from 'react'
import { StyleSheet, View } from 'react-native';

export default Cell = ({ style = {}, ...props }) => <View style={[styles.cell, style]} {...props} />

const styles = StyleSheet.create({
    cell: {
        padding: 2,
        flexGrow: 1,
    },
});