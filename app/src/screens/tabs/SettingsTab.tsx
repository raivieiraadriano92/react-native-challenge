import { useTheme } from "@react-navigation/native";
import { ScrollView, Switch, Text, View } from "react-native";

import { TabScreen } from "src/navigation/types";
import { useGeneralStore } from "src/store/generalStore";
import { useStoriesStore } from "src/store/storiesStore";

export const SettingsTab: TabScreen<"Settings"> = () => {
  const storiesStore = useStoriesStore();

  const generalStore = useGeneralStore();

  const theme = useTheme();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1 p-6 p space-y-6">
        <View className="space-y-3">
          <View className="space-y-1">
            <Text className="font-bold text-xl">Interests</Text>
            <Text className="text-sm text-neutral-400">
              Tailor your experience! Select your interests to receive
              personalized articles. Choose Android, iOS, or both to stay in the
              loop with the content that matters most to you.
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-base">Receive articles for Android</Text>
            <Switch
              testID="toggleAndroid"
              trackColor={{ false: "#767577", true: theme.colors.primary }}
              thumbColor={
                storiesStore.preferences.android ? "white" : "#f4f3f4"
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={storiesStore.toggleAndroid}
              value={storiesStore.preferences.android}
            />
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-base">Receive articles for iOS</Text>
            <Switch
              testID="toggleIOS"
              trackColor={{ false: "#767577", true: theme.colors.primary }}
              thumbColor={storiesStore.preferences.ios ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={storiesStore.toggleIOS}
              value={storiesStore.preferences.ios}
            />
          </View>
        </View>
        <View className="bg-neutral-100 h-[1px]" />
        <View className="space-y-3">
          <View className="space-y-1">
            <Text className="font-bold text-xl">Notifications</Text>
            <Text className="text-sm text-neutral-400">
              Stay updated with the latest tips, tricks, and news for your
              Android or iOS device! Enable notifications to never miss an
              article that helps you get the most out of your smartphone.
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-base">Enable notifications for Android</Text>
            <Switch
              testID="toggleAndroid"
              trackColor={{ false: "#767577", true: theme.colors.primary }}
              thumbColor={
                generalStore.notificationPreferences.android
                  ? "white"
                  : "#f4f3f4"
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={generalStore.toggleAndroid}
              value={generalStore.notificationPreferences.android}
            />
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-base">Enable notifications for iOS</Text>
            <Switch
              testID="toggleIOS"
              trackColor={{ false: "#767577", true: theme.colors.primary }}
              thumbColor={
                generalStore.notificationPreferences.ios ? "white" : "#f4f3f4"
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={generalStore.toggleIOS}
              value={generalStore.notificationPreferences.ios}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
