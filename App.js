import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Register from './src/components/Register';
import Login from './src/components/Login';

const Stack = createNativeStackNavigator()

function App () {
  return(
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name = 'Login' component={Login} />
        <Stack.Screen name = 'Register' component={Register} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;