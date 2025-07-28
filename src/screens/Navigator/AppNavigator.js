// AppNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';


// আপনার স্ক্রিন এবং Bottom Tab Navigator ইমপোর্ট করুন
import BottomTabNavigator from './BottomTabNavigator';
import DetailsScreen from '../DetailsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EstimateAndCosting from '../EstimateAndCosting/EstimateAndCosting';
import LandCalculator from '../EstimateAndCosting/LandCalculator';
import ExcavationCalculator from '../EstimateAndCosting/ExcavationCalculator';
import BrickCalculator from '../EstimateAndCosting/BrickCalculator';
import PlastartCalculator from '../EstimateAndCosting/PlastartCalculator';
import HelpMe from '../EstimateAndCosting/HelpMe';
import ConcreteCalculator from '../EstimateAndCosting/ConcreteCalculator';
import RodCalculator from '../EstimateAndCosting/RodCalculator';


const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }} // হেডার লুকানো
          
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Estimate" component={EstimateAndCosting}   options={{ headerShown: false }} />
        <Stack.Screen name="land" component={LandCalculator}   options={{ headerShown: false }} />
        <Stack.Screen name="soilcut" component={ExcavationCalculator}   options={{ headerShown: false }} />
        <Stack.Screen name="brick" component={BrickCalculator}   options={{ headerShown: false }} />
        <Stack.Screen name="plaster" component={PlastartCalculator}   options={{ headerShown: false }} />
        <Stack.Screen name="help" component={HelpMe}   options={{ headerShown: false }} />
        <Stack.Screen name="concrete" component={ConcreteCalculator}   options={{ headerShown: false }} />
        <Stack.Screen name="rodcal" component={RodCalculator}   options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;