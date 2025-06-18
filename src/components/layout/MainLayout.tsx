import { View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import StackNavigation from "src/routes/StackNavigation";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const MainLayout = () => {
  const [, setCurrentScreen] = useState("");

  
  return (
    <SafeAreaView  edges={['left', 'right', 'bottom']}
      className="flex-1 ">
      <StatusBar style="dark" />
      <StackNavigation setCurrentScreen={setCurrentScreen} />
    </SafeAreaView>
  );
};

export default MainLayout;
