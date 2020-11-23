import React from 'react';
import {DataTable} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, View} from 'react-native';

const MyPlaces = ({ route }) =>{
    const geoData = route.params;

    const city = geoData.city;
    const country = geoData.country;
    console.log(city);
    console.log(country);
    const [locals, setLocals] = React.useState(false);

    const saveData = async () =>{
        try{
        let values ={
            city: city,
            country: country,
        }

        await AsyncStorage.setItem('values', JSON.stringify(values));
        let places = JSON.parse(await AsyncStorage.getItem('places')) || [];
        places.push(values);
        await AsyncStorage.setItem('places', JSON.stringify(places));
        showData();
        }catch(e){
            console.log(e);
        }

    }

    const showData = async () =>{
        let locations = await AsyncStorage.getItem('places') && JSON.parse(await AsyncStorage.getItem('places'));
        setLocals(locations);
    }
    React.useEffect(() =>{
        showData();
    }, [])
    return (
        <View>
            <Button title="save data" onPress={saveData}></Button>
            {locals && locals.map((item, index) => (
                <ul key={index}>
                    <li>{item.city}</li>
                    <li>{item.country}</li>
                </ul>
            ))}
        </View>
    )


}

export default MyPlaces;