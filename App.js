import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';
import MenuScreen from './screen/MenuScreen';
import MyPlaces from './screen/MyPlaces';

const Stack = createStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Mobile CA"
          component={MenuScreen}
        />
        <Stack.Screen
          name="MyPlaces"
          component={MyPlaces}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
export default App;