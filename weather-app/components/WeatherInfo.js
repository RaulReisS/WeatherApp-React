import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import {colors} from '../utils/index'

const {PRIMARY_COLOR, SECONDAY_COLOR} = colors

export default function WeatherInfo({currentWeather}) {
    const {main: {temp},
    weather: [details],
    name
    } = currentWeather

    const { icon, main, description } = details

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={styles.weatherInfo}>
            <Text>{name}</Text>
            <Image style={styles.weatherIcon} source={{uri: iconUrl}}/>
            <Text style={styles.textPrimary}>{temp} ºC</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        backgroundColor: '#b21c55',
        //flexDirection: 'row',
        alignItems: 'center',
        // Estou tentando colocar uma margem aqui.
        margin: 16
    },
    weatherDescription: {
        textTransform: 'capitalize'
    },
    weatherIcon: {
        width: 100,
        height: 100
    },
    textPrimary: {
        //backgroundColor: '#361AF5',
        fontSize: 40,
        color: PRIMARY_COLOR
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDAY_COLOR,
        fontWeight: '500',
        marginTop: 10
    }
})