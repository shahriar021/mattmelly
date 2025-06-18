import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  WelcomeScreen,
} from "src/screens";
import Question1 from "src/screens/Question/Question1";
import Question2 from "src/screens/Question/Question2";
import Question3 from "src/screens/Question/Question3";
import SummaryDetails from "src/screens/Summary/SummaryDetails";
import { RootStackParamList } from "src/types/navigationType";
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = ({ setCurrentScreen }: { setCurrentScreen: any }) => {
  const routeNameRef = useRef<string | null>(null);
  const navigationRef = useRef<any>(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        setCurrentScreen(routeNameRef.current);
      }}
      onStateChange={() => {
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        setCurrentScreen(currentRouteName);
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "white",
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="Q1" component={Question1} options={{headerShown:true, headerTitle: "",}} />
        <Stack.Screen name="Q2" component={Question2} options={{headerShown:true, headerTitle: ""}} />
        <Stack.Screen name="Q3" component={Question3} options={{headerShown:true, headerTitle: ""}} />
        <Stack.Screen name="Summary Details" component={SummaryDetails} options={{headerShown:true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
