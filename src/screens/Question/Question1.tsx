import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import { useAppSelector } from "src/redux/hooks";
import { useDispatch } from "react-redux";
import { setPgBar } from "src/redux/features/progress/progresSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import CheckBox from "src/components/shared/CheckBox";
import RadioGroup from "react-native-radio-buttons-group";
import { carType, leaseOrbuy, radioButtons, vehicleType } from "../QnAdata";
import { setBudgetST, setCarTypesST, setLeasOrbuyST, setVehicleTypesST } from "src/redux/features/question/qustionSlice";

const Question1 = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>(vehicleType[0].id);
  const [selectedBudget, setSelectedBudget] = useState<string>(radioButtons[0].id);
  const [selectedLeaseOrBuy, setSelectedLeaseOrBuy] = useState<string>(leaseOrbuy[0].id);
  const [typeCar, setTypeCar] = useState<string[]>([]);
  const navigation = useNavigation();
  const pgbar = useAppSelector((store) => store.progress.pgBar);
  const dispatch = useDispatch();

  const handleProgress = () => {
    dispatch(setPgBar(0.3));
    dispatch(setVehicleTypesST(selectedVehicle))
    dispatch(setCarTypesST(typeCar))
    dispatch(setBudgetST(selectedBudget))
    dispatch(setLeasOrbuyST(selectedLeaseOrBuy))
    navigation.navigate("Q2" as never);
  };

  const handleCheck = (type: string) => {
    setTypeCar((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };
  return (
    <View className="flex-1 ">
      <ScrollView
        contentContainerStyle={{ padding: 12 }}
        className="flex-grow"
        showsVerticalScrollIndicator={false}
      >
        <View className=" mb-2 ">
          <Progress.Bar progress={pgbar} width={null} height={10} />
          <View className="mt-3">
             <Text className="font-bold text-2xl">What kind of vehicle do you want?</Text>
            <View className="items-start mb-2 w-full">
              <RadioGroup
                radioButtons={vehicleType}
                onPress={setSelectedVehicle}
                selectedId={selectedVehicle}
                layout="column"
                containerStyle={{alignItems:'flex-start',width:'100%'}}
                labelStyle={{textAlign:'left'}}
              />
            </View>
            <View className="mt-2 mb-2">
              <Text className="font-bold text-2xl">
                What features do you want your car to have?
              </Text>
              {carType?.map((option) => (
                <View key={option} className="flex-row items-center">
                  <CheckBox
                    checked={typeCar.includes(option)}
                    onChange={() => handleCheck(option)}
                  />
                  <Text>{option}</Text>
                </View>
              ))}
            </View>
            {/* radio button starts */}
            <Text className="font-bold text-2xl">What's your budget?</Text>
            <View className="items-start mb-2 w-full">
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedBudget}
                selectedId={selectedBudget}
                layout="column"
                containerStyle={{alignItems:'flex-start',width:'100%'}}
                labelStyle={{textAlign:'left'}}
              />
            </View>
            <Text className="font-bold text-2xl">Looking to lease or buy?</Text>
            <View className="items-start mb-2 w-full">
              <RadioGroup
                radioButtons={leaseOrbuy}
                onPress={setSelectedLeaseOrBuy}
                selectedId={selectedLeaseOrBuy}
                layout="column"
                containerStyle={{alignItems:'flex-start',width:'100%'}}
                labelStyle={{textAlign:'left'}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="p-3 w-full">
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

export default Question1;
