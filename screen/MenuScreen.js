import React, { useState } from 'react';
import { Text, View } from 'react-native';
import apiKey from '../key/key.js';
import apiCurrencyKey from '../key/keyCurrency.js'
import apiKeyWeather from '../key/keyWeather.js'
import * as Location from 'expo-location';
import { BottomNavigation, Card, Title, Paragraph, TextInput, Button, Headline} from 'react-native-paper';


const LocationRoute = () => {
  
  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  
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
      (async () => {
        if (lat !== undefined && lng !== undefined) {
          try {
          const result = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${apiKey}`)
          const resultJson = await result.json();
          setCity(resultJson.results[0].components.county),
          setCountry(resultJson.results[0].components.country);
          } catch (e) {
          console.log(e);
        }
      }

    })();

  }, [lng]);

 return (  

        <>    
            <Card
                style={{
                width: '100%',
                marginTop: 20,
                width: '100%',
                marginTop: 20,
                borderColor: '#595959',
                borderStyle: 'solid',
                borderWidth: 0.5,
              }}
            >
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content>
                <Title>Welcome!</Title>
                <Paragraph>Here is your latitude: {lat}</Paragraph>
                <Paragraph>Here is your longitude: {lng}</Paragraph>
                <Paragraph style={{ fontWeight: 'bold' }}>
                You are in: {city} </Paragraph>
                <Paragraph style={{ fontWeight: 'bold' }}>
                A wonderful city in: {country}</Paragraph>
              
      
              </Card.Content>
              </Card>
    </>
    
  )}

const CurrencyRoute = () => { 

   
  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
  const [text, setText] = React.useState(0);
  const [currency, setCurrency] = React.useState(null);
  const [newCurrency, setNewCurrency] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [errorMsg, setErrorMsg] = React.useState(null);
  
  


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
      (async () => {
        if (lat !== undefined && lng !== undefined) {
          try {
            const result = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${apiKey}`)
            const resultJson = await result.json();
            setCurrency(resultJson.results[0].annotations.currency.iso_code);
          } catch (e) {
            console.log(e);
          }
        }
        })();
        
        }, [lng]);
           

      React.useEffect(() => {
        (async () => {
          if (lat !== undefined && lng !== undefined) {
            try {
        const result = await fetch(`https://api.currencyfreaks.com/latest?apikey=61157a41d37940f4a620eb34aa9ca29e&symbols=${currency}`)
        const resultJson = await result.json();
        setNewCurrency(resultJson.rates[currency])
      } catch (e) {
        console.log(e);
      }
    }
    })();
    
    }, [currency]);
    

      const convertCurrency = () => {
        console.log(currency);
        console.log(newCurrency);
        let value = (newCurrency * text);
        setAmount(value);
        }
    
     return (
        <>
        <Title>Currency Converter</Title>
        <TextInput
        label=" USD "
        value={text}
        onChangeText={setText}
        //setAmount(parseInt(text))}
      />
       <TextInput
        label={currency}
        value={amount}
        //onChangeText={setText}
      />
       <Button icon="calculator" mode="contained" onPress={() => convertCurrency() }>
    CONVERT
  </Button>
      </>
    );
  };
     


const WeatherRoute = () => {

  const [weather, setWeather] = React.useState(null);
  const [weatherName, setWeatherName] = React.useState(null);
  const [weatherTemp, setWeatherTemp] = React.useState(null);
  const [weatherLength, setWeatherLength] = React.useState(null);
  const [weatherDescription, setWeatherDescription] = React.useState(null);
  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);

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
    (async () => {
      if (lat !== undefined && lng !== undefined) {
        try {
          const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKeyWeather}`)
          const resultJson = await result.json();
          setWeather(resultJson),
          setWeatherName(resultJson.name),
          setWeatherTemp(resultJson.main.temp),
          setWeatherLength(resultJson.weather.length),
          setWeatherDescription(resultJson.weather[0].description)

          } catch (e) {
          console.log(e);
        }
      }

    })();

  }, [lat,lng]);

  return (
    
    <Paragraph>
      <br /><br /><br />
      {weather && (
        <> 
          <Text style={{ fontSize: 30 }}>Weather in {weatherName}:</Text><br />
   
         {/* temperature is in Kelvin, so subtracts 273.15 and removes decimal places, shows the weather descriptioin */}
          <Text style={{ fontSize: 30 }}>{(weatherTemp - 273.15).toFixed(0)}°C {weatherLength > 0 && weatherDescription}</Text>
        </>
      )}
    </Paragraph>
    
  );
} 

  const MenuScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'location', title: 'Location', icon: 'navigation' },
    { key: 'currency', title: 'Currencies', icon: 'card' },
    { key: 'weather', title: 'Weather', icon: 'weather-snowy' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    location: LocationRoute,
    currency: CurrencyRoute,
    weather: WeatherRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};


export default MenuScreen;