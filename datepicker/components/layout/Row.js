import React from "react";
import { StyleSheet, View } from 'react-native'

export default Row = ({ style = {}, ...props }) => <View style={[styles.row, style]} {...props} />

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});