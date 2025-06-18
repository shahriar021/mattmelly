import {
  View,
  Text,
  useWindowDimensions,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "src/redux/features/auth/authSlice";
import { useLoginMutation } from "src/redux/features/auth/authApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, EvilIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import { useUserMutation } from "src/redux/features/user/userApi";
import { setID } from "src/redux/features/progress/progresSlice";
import { isValidEmail } from "src/validation/validEmail";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [postUser, { isLoading }] = useUserMutation();

  const dispatch = useDispatch();

  const hendleWelcome = async () => {
 

  if (!email || !name || !phone || !address) {
    Alert.alert("Please Fill Up All The Blank Field!");
    return;
  }
   if (!isValidEmail(email)) {
    setEmailError(true);
    Alert.alert("Not a valid Email");
    return; // stop further execution
  }

  try {
    const output = { name, email, phone, address };
    const result = await postUser(output).unwrap();
    dispatch(setID(result._id));
    navigation.navigate("Q1" as never);
  } catch (error) {
    Alert.alert("Something went wrong");
    // Alert.alert("Something went wrong");
  }
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 "
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="items-center justify-center flex-1 p-3 ">
          <View style={{ width: width * 0.5, height: height * 0.3 }}>
            <Image
              source={require("../../../assets/Media.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
          <View className="flex-row items-center border border-gray-300  rounded-lg mb-2 p-1">
            <AntDesign name="user" size={24} color="gray" />
            <TextInput
              className=" flex-1"
              placeholder="Your Name"
              onChangeText={setName}
            />
          </View>
          <View
            className={`flex-row items-center border  ${
              emailError ? "border-red-500" : "border-gray-300"
            }  rounded-lg mb-2 p-1`}
          >
            <Fontisto name="email" size={24} color="gray" />
            <TextInput
              className=" flex-1"
              placeholder="Your E-Mail"
              onChangeText={setEmail}
            />
          </View>
          <View className="flex-row items-center border border-gray-300  rounded-lg mb-2 p-1">
            <Ionicons name="call-outline" size={24} color="gray" />
            <TextInput
              className=" flex-1"
              placeholder="Phone Number"
              onChangeText={setPhone}
            />
          </View>
          <View className="flex-row items-center border border-gray-300  rounded-lg mb-2 p-1">
            <EvilIcons name="location" size={24} color="black" />
            <TextInput
              className=" flex-1"
              placeholder="Present Address"
              onChangeText={setAddress}
            />
          </View>
          <TouchableOpacity
            className="bg-[#2563FD] p-4 rounded-lg w-full items-center mt-4"
            onPress={hendleWelcome}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white">Start Question</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  
);

};

export default WelcomeScreen;
