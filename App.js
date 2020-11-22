import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';
import MenuScreen from './screen/MenuScreen';

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
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'HomeScreen',
            headerTitleStyle: { alignSelf: 'center' },
          }}
        />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  )
};
export default App;