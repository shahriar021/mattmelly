import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import SubmissionModal from "../Success/SubmissionModal";
import { useAppSelector } from "src/redux/hooks";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "src/types/navigationType";
import {
  useGetQuestionDataQuery,
  useSendEmailMutation,
} from "src/redux/features/question/questionApi";
import { useDispatch } from "react-redux";
import {
  setPgBar,
  setResetPgbar,
} from "src/redux/features/progress/progresSlice";

type SummaryDetailsRouteProp = RouteProp<RootStackParamList, "Summary Details">;

type Props = {
  route: SummaryDetailsRouteProp;
  // navigation: your navigation prop type (optional)
};

const SummaryDetails: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const { fqID, cID } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [sendEmail, { isLoading: isSendingEmail }] = useSendEmailMutation();
  const { data: getFQdata, isLoading: isFetchingData } =
    useGetQuestionDataQuery(fqID);

  const handleSubmit = async () => {
    try {
      const ids = { feqId: fqID, contactId: cID };
      const res = await sendEmail(ids).unwrap();
      if (res?.message == "Email sent successfully") {
        setShowModal(true);
        dispatch(setResetPgbar());
      }
    } catch (err) {
      Alert.alert("Something went Wrong!");
    }
  };
  return (
    <View className="flex-1 p-2 justify-between ">
      <View>
        <Text className="font-bold text-xl">Details</Text>
        {isFetchingData ? (
          <View className="h-full w-full items-center justify-center">
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <View>
            <View className="flex-row justify-between items-center p-1">
              <Text className="text-xl text-gray-400">Car Type</Text>
              <Text className="text-xl text-gray-400 w-[200px] text-right">
                {getFQdata?.Type_of_vehicle}
              </Text>
            </View>
            <View className="border border-gray-300" />
            <View className="flex-row justify-between items-center p-1">
              <Text className="text-xl text-gray-400">Car Features</Text>
              <Text className="text-xl text-gray-400 w-[200px] text-right">
                {getFQdata?.carInterests.join(",")}
              </Text>
            </View>
            <View className="border border-gray-300" />
            <View className="flex-row justify-between items-center p-1">
              <Text className="text-xl text-gray-400">Budget</Text>
              <Text className="text-xl text-gray-400">{getFQdata?.budget}</Text>
            </View>
            <View className="border border-gray-300" />
            <View className="flex-row justify-between items-center p-1">
              <Text className="text-xl text-gray-400">Trade-in Available</Text>
              <Text className="text-xl text-gray-400">
                {getFQdata?.tradeIn !== undefined && getFQdata?.tradeIn === true
                  ? "YES"
                  : getFQdata?.tradeIn === false && "NO"}
              </Text>
            </View>
            <View className="border border-gray-300" />
            <View className="flex-row justify-between items-center p-1">
              <Text className="text-xl text-gray-400">Lease or Buy</Text>
              <Text className="text-xl text-gray-400">
                {getFQdata?.leaseOrBuy}
              </Text>
            </View>
            <View className="border border-gray-300" />
            <View className="flex-row justify-between items-center p-1">
              <Text className="text-xl text-gray-400">Buying For</Text>
              <Text className="text-xl text-gray-400">
                {getFQdata?.buyingFor}
              </Text>
            </View>
            <View className="border border-gray-300" />
            <View className="flex-row justify-between items-center p-1">
              <Text className="text-xl text-gray-400">Passengers</Text>
              <Text className="text-xl text-gray-400">
                {getFQdata?.passengers}
              </Text>
            </View>
            <View className="border border-gray-300" />
            <View className="flex-row justify-between items-center p-1">
              <Text className="text-xl text-gray-400">Annual Mileage</Text>
              <Text className="text-xl text-gray-400 w-[200px] text-right">
                {getFQdata?.hoping_to_accomplish_today}
              </Text>
            </View>
            <View className="border border-gray-300" />
            <View className="flex-row justify-between items-center p-1">
              <Text className="text-xl text-gray-400">Colors</Text>
              <Text className="text-xl text-gray-400">
                {getFQdata?.colorPreference}
              </Text>
            </View>
            <View className="border border-gray-300" />
            <View className="flex-row justify-between items-center p-1">
              <Text className="text-xl text-gray-400">New or Pre-owned</Text>
              <Text className="text-xl text-gray-400">
                {getFQdata?.newOrPreOwned}
              </Text>
            </View>
            <View className="border border-gray-300" />
          </View>
        )}
      </View>
      {/* button */}
      <TouchableOpacity
        className="bg-[#2563FD] p-4 rounded-lg w-full items-center mt-4"
        onPress={handleSubmit}
      >
        {isSendingEmail ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-white">Submit</Text>
        )}
      </TouchableOpacity>
      <SubmissionModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
};

export default SummaryDetails;
