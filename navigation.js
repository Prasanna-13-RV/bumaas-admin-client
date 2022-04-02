import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import Forgot from "./screens/Forgot";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Customermaster from "./screens/customermaster/Customermaster";
// import AddCustomer from './components/customermaster/addCustomer';
import Inventrymaster from "./screens/inventrymaster/Inventrymaster.screen";
import Projectmaster from "./screens/projectmaster/projectmaster";
import ShowCustomer from "./components/customermaster/ShowCustomer";
import ShowProject from "./components/projectmaster/ShowProject";
import CustomerUpdate from "./screens/customermaster/CustomerUpdate";
import ProjectUpdate from "./screens/projectmaster/ProjectUpdate";
import InventoryUpdate from "./screens/inventrymaster/InventoryUpdate";
const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

const NavigationSignUp = () => {
    return (
        <>
            <NavigationContainer
                initialRouteName="LoginScreen"
                screenOptions={screenOptions}
            >
                <Stack.Navigator>
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="Forgot"
                        component={Forgot}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="ProfileScreen"
                        component={ProfileScreen}
                        options={screenOptions}
                    />

                    <Stack.Screen
                        name="Customermaster"
                        component={Customermaster}
                        options={screenOptions}
                    />

                    <Stack.Screen
                        name="Inventrymaster"
                        component={Inventrymaster}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="Projectmaster"
                        component={Projectmaster}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="ShowCustomer"
                        component={ShowCustomer}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="ShowProject"
                        component={ShowProject}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="CustomerUpdate"
                        component={CustomerUpdate}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="ProjectUpdate"
                        component={ProjectUpdate}
                        options={screenOptions}
                    />
                    <Stack.Screen
                        name="InventoryUpdate"
                        component={InventoryUpdate}
                        options={screenOptions}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default NavigationSignUp;

const styles = StyleSheet.create({});
