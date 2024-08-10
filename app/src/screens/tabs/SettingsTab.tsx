import { useTheme } from "@react-navigation/native";
import { Switch, Text, View } from "react-native";
import { TabScreen } from "src/navigation/types";
import { useStoriesStore } from "src/store/storiesStore";

export const SettingsTab: TabScreen<"Settings"> = () => {
  const storiesStore = useStoriesStore();

  const theme = useTheme();

  return (
    <View className="flex-1 p-6">
      <View className="space-y-3">
        <View className="space-y-1">
          <Text className="font-bold text-xl">Notifications</Text>
          <Text className="text-sm text-neutral-400">
            Stay updated with the latest tips, tricks, and news for your Android
            or iOS device! Enable notifications to never miss an article that
            helps you get the most out of your smartphone.
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm">Enable notifications for Android</Text>
          <Switch
            testID="toggleAndroid"
            trackColor={{ false: "#767577", true: theme.colors.primary }}
            thumbColor={storiesStore.preferences.android ? "white" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={storiesStore.toggleAndroid}
            value={storiesStore.preferences.android}
          />
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm">Enable notifications for iOS</Text>
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
    </View>
  );
};
