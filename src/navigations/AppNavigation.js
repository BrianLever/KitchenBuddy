import React, { useEffect } from 'react'
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import IngredientAddScreen from '../screens/Ingredient/IngredientAddScreen';
import { Ionicons } from "@expo/vector-icons";
import IngredientUpdateScreen from '../screens/Ingredient/IngredientUpdateScreen';
import Scanner from '../screens/Scanner/Scanner';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Navigator = () => {
  return (
    <Tab.Navigator    
      screenOptions={({ route }) => ({                     
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
             ? 'home'
              : 'home-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'link' : 'link-outline';
         }
          else{
            iconName = focused ? 'search' : 'search-outline';
          }       
         return <Ionicons name={iconName} size={size} color={color} />;
      },              
      tabBarInactiveTintColor:'black',
      tabBarActiveTintColor:'blue'
    })}    
    initialRouteName='Home'    
    >               
      <Tab.Screen name="Categories" component={MainNavigator} />    
      <Tab.Screen name="Home" component={IngredientAddScreen} />  
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Scanner" component={Scanner} />
    </Tab.Navigator>
  );
};

function MainNavigator() {  

    console.log('Component has mounted!');

  return(
    <Stack.Navigator      
      screenOptions={({ route }) =>({
          headerShown: false,          
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,            
          }          
      })}
      initialRouteName='Category'          
    >
      {/* <Stack.Screen name='Home' component={IngredientAddScreen} /> */}
      
      <Stack.Screen name='Category' component={CategoriesScreen}/>
      <Stack.Screen name='Update' component={IngredientUpdateScreen}/>           
      <Stack.Screen name='Search' component={SearchScreen} />     
    </Stack.Navigator>
  )
} 
 export default function AppContainer() {
  return(
    <NavigationContainer>
      <Navigator/>     
    </NavigationContainer>
  )
} 
 

console.disableYellowBox = true;