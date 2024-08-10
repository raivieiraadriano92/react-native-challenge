import { ScrollView, View } from "react-native";

import { SettingsRow } from "src/components/SettingsRow";
import { SettingsSection } from "src/components/SettingsSection";
import { TabScreen } from "src/navigation/types";
import { useGeneralStore } from "src/store/generalStore";
import { useStoriesStore } from "src/store/storiesStore";

export const SettingsTab: TabScreen<"Settings"> = () => {
  const storiesStore = useStoriesStore();

  const generalStore = useGeneralStore();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1 p-6 p space-y-6">
        <SettingsSection
          description="Tailor your experience! Select your interests to receive personalized articles. Choose Android, iOS, or both to stay in the loop with the content that matters most to you."
          title="Interests"
        >
          <SettingsRow
            isActive={storiesStore.preferences.android}
            onValueChange={storiesStore.toggleAndroid}
            title="Receive articles for Android"
          />
          <SettingsRow
            isActive={storiesStore.preferences.ios}
            onValueChange={storiesStore.toggleIOS}
            title="Receive articles for iOS"
          />
        </SettingsSection>
        <View className="bg-neutral-100 h-[1px]" />
        <SettingsSection
          description="Stay updated with the latest tips, tricks, and news for your Android or iOS device! Enable notifications to never miss an article that helps you get the most out of your smartphone."
          title="Notifications"
        >
          <SettingsRow
            isActive={generalStore.notificationPreferences.android}
            onValueChange={generalStore.toggleAndroid}
            title="Receive articles for Android"
          />
          <SettingsRow
            isActive={generalStore.notificationPreferences.ios}
            onValueChange={generalStore.toggleIOS}
            title="Receive articles for iOS"
          />
        </SettingsSection>
      </View>
    </ScrollView>
  );
};
