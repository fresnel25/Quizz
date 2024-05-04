import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { Welcome } from "./src/Components/Layout";
import Routes from "./src/Constants/Routes";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.Welcome}>
          <Stack.Screen
            name={Routes.Welcome}
            component={Welcome}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
