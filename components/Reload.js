import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../utils';

const {PRIMARY_COLOR, SECONDARY_COLOR} = colors;

export default function Reload({load}) {

    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'

    return (
        <View style={styles.reloadIcon}>
            <Ionicons onPress={load} name={reloadIconName} size={24} color={PRIMARY_COLOR} />
        </View>
    )

}


const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        top: 200,
        right: 50
    }
})