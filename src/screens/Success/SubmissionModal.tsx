import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/types/navigationType"; 

type NavigationProp = StackNavigationProp<RootStackParamList, "Summary Details">;

const SubmissionModal = ({ visible, onClose }: any) => {
    const navigation=useNavigation<NavigationProp>()
    const handleModalClose=()=>{
        navigation.navigate("Welcome")
        onClose()
    }
  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <View className='flex-1 p-2  '>
        {/* centered content */}
        <View className="flex-1 items-center justify-center "> 
            <FontAwesome name="check-circle" size={84} color="#06DB7B" />
        <Text className="font-bold text-3xl">Submission Successful!</Text>
        <Text>
            Thank you for completing the questionnaira .
        </Text>
        <Text>your preference have been recorded</Text>
        </View>
        
        {/* button */}
        <TouchableOpacity
          className="bg-[#2563FD] p-4 rounded-lg w-full items-center mt-4"
          onPress={handleModalClose}
        >
          <Text className="text-white">OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SubmissionModal;
