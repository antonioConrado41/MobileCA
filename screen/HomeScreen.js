import React, { useState } from 'react';
import { Text, TextInput, Button} from 'react-native';
import apiKey from './key.js';
import * as Location from 'expo-location';

const HomeScreen = () => {
  
  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
  const [city, setCity] = useState('Your city is');
  const [currency, setCurrency] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({});
      setLat(location.coords.latitude);
      setLng(location.coords.longitude);
    })();
  }, []);
  
  
    React.useEffect(() => {
    //function openCage(){
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${apiKey}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setCity(json.results[0].components.country),
            setCurrency(json.results[0].annotations.currency.iso_code);
        }, [lat, lng]);
      })
 return (  
 
        <>    
        <Text>Welcome, your current location is {city}</Text>
        <Text>Here is your currently latitude: {lat} </Text>
        <Text>Here is your currently longitude: {lng} </Text>
        <Text>The currency in your location is: {currency} </Text>

    </>
    
  )}

export default HomeScreen;