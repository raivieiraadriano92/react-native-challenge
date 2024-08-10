import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackScreen } from "src/navigation/types";
import { requestNotificationsPermissions } from "src/notifications";
import { useGeneralStore } from "src/store/generalStore";

export const OnboardingScreen: RootStackScreen<"Onboarding"> = ({
  navigation
}) => {
  const generalStore = useGeneralStore();

  const handleOnPress = async () => {
    await requestNotificationsPermissions({});

    generalStore.setIsFirstLaunch(false);

    navigation.replace("Tabs");
  };

  return (
    <SafeAreaView className="flex-1 p-6">
      <View className="flex-1 items-center justify-center space-y-2">
        <Text className="font-medium text-base">Welcome to</Text>
        <View className="flex-row items-center space-x-2">
          <Image
            className="h-10 w-10 rounded-lg"
            source={require("assets/icon.png")}
          />
          <Text className="font-bold text-base text-3xl">Hacker News</Text>
        </View>
      </View>
      <View className="space-y-6">
        <View className="space-y-1">
          <Text className="font-bold text-xl">Pro Tip</Text>
          <Text className="text-sm text-neutral-400">
            Stay updated with the latest tips, tricks, and news for your Android
            or iOS device! Enable notifications to never miss an article that
            helps you get the most out of your smartphone.
          </Text>
        </View>
        <TouchableOpacity
          className="bg-primary h-14 items-center justify-center rounded-xl"
          onPress={handleOnPress}
        >
          <Text className="font-medium text-base text-white">Let's do it!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
