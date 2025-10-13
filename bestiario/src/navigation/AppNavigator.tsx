import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import CreateMonsterScreen from "../screens/CreateMonsterScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: "bestiario principal" }} />
                <Stack.Screen name="Create" component={CreateMonsterScreen} options={{ title: "Criar Monstro" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
