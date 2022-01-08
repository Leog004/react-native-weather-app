import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import Reload from './components/Reload';
import WeatherDetails from './components/WeatherDetails';
import {WEATHER_APIKEY} from '@env'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitSystem])


 async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
   try{

    let {status} = await Location.requestForegroundPermissionsAsync();

    if(status !== 'granted') return setErrorMessage('Access to location is needed to run the app');

    const location = await Location.getCurrentPositionAsync();
    const {latitude, longitude} = location.coords;

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitSystem}&APPID=${WEATHER_APIKEY}`

    const response = await fetch(weatherURL);

    const result = await response.json();

    if(response.ok){
      setCurrentWeather(result);
    }else{
      setErrorMessage(result.message);
    }

   }catch(error){
     console.log(error)
   }
 }

 if(currentWeather){

  return (
    <View style={styles.container}>
          <StatusBar style="auto" />     
            <View style={styles.main}>
              <Reload load={load} />
              <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
              <WeatherInfo currentWeather={currentWeather} />
            </View>
          <WeatherDetails currentWeather={currentWeather} unitsSystem={unitSystem} />
    </View>
  )
}else if (errorMessage){
  return (
    <View style={styles.container}>
    <Text>{errorMessage}</Text>
    <StatusBar style="auto" />
  </View>
  )  
}else{
  return (
    <View style={styles.container}>
    <ActivityIndicator size={'large'} />
    <StatusBar style="auto" />
  </View>
  )
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  main: {
    justifyContent:'center',
    flex: 1
  }
});
