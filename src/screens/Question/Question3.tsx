import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "src/redux/hooks";
import { useDispatch } from "react-redux";
import { setPgBar } from "src/redux/features/progress/progresSlice";
import * as Progress from "react-native-progress";
import { RadioGroup } from "react-native-radio-buttons-group";
import { forWhom, pessanges, todayGoals } from "../QnAdata";
import { StackNavigationProp } from "@react-navigation/stack";
import { useQuestionHook } from "src/hooks/useQuestionHook";
import { useSendQuestionToApiMutation } from "src/redux/features/question/questionApi";
import { RootStackParamList } from "src/types/navigationType";

type SummaryDetailsScreenProp = StackNavigationProp<
  RootStackParamList,
  "Summary Details"
>;

const Question3 = () => {
  const { width } = useWindowDimensions();
  const [selectedOwner, setSelectedOwner] = useState<string>(forWhom[0].id);
  const [selectedPsngr, setSelectedPsngr] = useState<string>(pessanges[0].id);
  const [selectedKM, setSelectedKM] = useState<string>(todayGoals[0].id);
  const navigation = useNavigation<SummaryDetailsScreenProp>();
  const pgbar = useAppSelector((store) => store.progress.pgBar);
  const dispatch = useDispatch();
  const id = useAppSelector((store) => store.progress.ID);
  const [postQuestion, { isLoading }] = useSendQuestionToApiMutation();

  const {
    vehicleType,
    carTypesdatas,
    budgets,
    leaseORbuy,
    newORpre,
    tradeIN,
    colorsData,
  } = useQuestionHook();

  const handleProgress = async () => {
    const datas = {
      contactId: id,
      Type_of_vehicle: vehicleType,
      carInterests: carTypesdatas,
      budget: budgets,
      leaseOrBuy: leaseORbuy,
      newOrPreOwned: newORpre,
      ...(tradeIN === "Yes" && { tradeIn: true }),
      ...(tradeIN === "No" && { tradeIn: false }),
      colorPreference: colorsData,
      buyingFor: selectedOwner,
      ...(selectedPsngr && { passengers: Number(selectedPsngr) }),
      hoping_to_accomplish_today: selectedKM,
    };

    try {
      const response = await postQuestion(datas).unwrap();

      navigation.navigate("Summary Details" as never, {
        fqID: response._id,
        cID: response.contactId,
      });
    } catch (err) {
      // console.log("❌ Error while sending question:", err);
      Alert.alert("Something went wrong!");
    }
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
              Are you buying for yourself or someone else?
            </Text>
            <View className="items-start mb-2 w-full">
              <RadioGroup
                radioButtons={forWhom}
                onPress={setSelectedOwner}
                selectedId={selectedOwner}
                layout="column"
                containerStyle={{ alignItems: "flex-start", width: "100%" }}
                labelStyle={{ textAlign: "left" }}
              />
            </View>
            <Text className="font-bold text-2xl">
              How many passengers are you?
            </Text>
            <View className="items-start mb-2 w-full">
              <RadioGroup
                radioButtons={pessanges}
                onPress={setSelectedPsngr}
                selectedId={selectedPsngr}
                layout="column"
                containerStyle={{ alignItems: "flex-start", width: "100%" }}
                labelStyle={{ textAlign: "left" }}
              />
            </View>
            <Text className="font-bold text-2xl">
              What are you hoping to accomplish today?
            </Text>
            <View className="items-start w-full mb-2">
              <RadioGroup
                radioButtons={todayGoals}
                onPress={setSelectedKM}
                selectedId={selectedKM}
                layout="column"
                containerStyle={{ alignItems: "flex-start", width: "100%" }}
                labelStyle={{ textAlign: "left" }}
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
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white">Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Question3;
