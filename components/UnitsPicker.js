import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import {Picker} from '@react-native-picker/picker';


export default function UnitsPicker({unitSystem, setUnitSystem}) {
    return (
        <View style={styles.unitsSystem}>
            <Picker selectedValue={unitSystem} onValueChange={(item) => setUnitSystem(item)} mode='dropdown' itemStyle={{fontSize: 12}}>
                <Picker.Item label='C°' value={'metric'} />
                <Picker.Item label='F°' value={'imperial'} />
            </Picker>
        </View>
    )
}


const styles = StyleSheet.create({
    unitsSystem: {
        position: 'absolute',
        left: '40%',
        top: '20%',
        height: 50,
        width: 100,
        ...Platform.select({
            ios: {
                top: 30,
                left: 20,
            },
            adroid: {
                top: 30,
                left: 20,
            },
        }),
        zIndex: 10
    }
})