import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import WetaherInfo from './components/WeatherInfo'

const WEATHER_API_KEY = "e3226d5a710ed7b606cbe4443abb8c31"
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?"


export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, SetUnitsSystem] = useState("metric")
  useEffect(() =>{
    load()
  }, [])

  async function load() {
    try {
      let { status } = await Location.requestPermissionsAsync()

      if (status != 'granted' ) {
        setErrorMessage('Acessar o local é necessário para rodar o aplicativo')
        alert(status)
        return 
      }
      let location = await Location.getCurrentPositionAsync({accuracy: 1})

      

      const {latitude, longitude} = location.coords
      const wetaherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&lang=pt_br&appid=${WEATHER_API_KEY}`
      //alert(`Latitude: ${latitude}\nLongitude: ${longitude}`)


      const response = await fetch(wetaherUrl);

      const result = await response.json()

      if (response.ok) {
        setCurrentWeather(result)
      }
      else {
        setErrorMessage(result.message)
      }
    }
    catch (error) {
      setErrorMessage(error.message)
      alert(`Catch: ${error}`)
    }
  }
  if(currentWeather) {
    const {main : {temp}} = currentWeather
    return (
      <View style={styles.container}>
        <WetaherInfo currentWeather={currentWeather}/>
        <StatusBar style="auto" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  main : {
    justifyContent: 'center',
    flex: 1,
  },
});
