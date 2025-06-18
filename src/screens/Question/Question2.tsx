import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "src/redux/hooks";
import { useDispatch } from "react-redux";
import { setPgBar } from "src/redux/features/progress/progresSlice";
import * as Progress from "react-native-progress";
import { RadioGroup } from "react-native-radio-buttons-group";
import { colorsType, newOrown, tradin } from "../QnAdata";
import {
  setColorsST,
  setNewOrPreST,
  setRadeINST,
} from "src/redux/features/question/qustionSlice";

const Question2 = () => {
  const { width } = useWindowDimensions();
  const [selectedNorO, setSelectedNorO] = useState<string>(newOrown[0].id);
  const [selectedTRD, setSelectedTRD] = useState<string>(tradin[0].id);
  const [selectedColor, setSelectedColor] = useState<string>(colorsType[0].id);
  const navigation = useNavigation();
  const pgbar = useAppSelector((store) => store.progress.pgBar);
  const dispatch = useDispatch();
  const handleProgress = () => {
    dispatch(setPgBar(0.3));
    dispatch(setNewOrPreST(selectedNorO));
    dispatch(setRadeINST(selectedTRD));
    dispatch(setColorsST(selectedColor));
    navigation.navigate("Q3" as never);
  };
  return (
    <View className="flex-1 ">
      <ScrollView
        contentContainerStyle={{ padding: 12 }}
        className="flex-grow"
        showsVerticalScrollIndicator={false}
      >
        <View className=" mb-2">
          <Progress.Bar progress={pgbar} width={null} height={10} />
          <View className="mt-3">
            {/* radio button starts */}
            <Text className="font-bold text-2xl">
              Are you interested in new or pre-owned?
            </Text>
            <View className="items-start mb-2 w-full">
              <RadioGroup
                radioButtons={newOrown}
                onPress={setSelectedNorO}
                selectedId={selectedNorO}
                layout="column"
                containerStyle={{alignItems:'flex-start',width:'100%'}}
                labelStyle={{textAlign:'left'}}
              />
            </View>
            <Text className="font-bold text-2xl">Do you have a trade-in?</Text>
            <View className="items-start mb-2 w-full">
              <RadioGroup
                radioButtons={tradin}
                onPress={setSelectedTRD}
                selectedId={selectedTRD}
                layout="column"
                containerStyle={{alignItems:'flex-start',width:'100%'}}
                labelStyle={{textAlign:'left'}}
              />
            </View>
            <Text className="font-bold text-2xl">What colors do you like?</Text>
            {/* <View className="items-start ">
              <RadioGroup
                radioButtons={colorsType}
                onPress={setSelectedColor}
                selectedId={selectedColor}
              />
            </View> */}
            <View className="items-start mb-2 w-full ">
              <RadioGroup
                radioButtons={colorsType}
                onPress={setSelectedColor}
                selectedId={selectedColor}
                layout="column"
                containerStyle={{ alignItems: 'flex-start', width: '100%' }}
                labelStyle={{ textAlign: 'left' }}
              />
            </View>

          </View>
        </View>
      </ScrollView>
      <View className="p-3">
        <TouchableOpacity
          onPress={handleProgress}
          className="bg-[#2563FD] p-4 rounded-lg w-full items-center mt-4"
        >
          <Text className="text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Question2;
