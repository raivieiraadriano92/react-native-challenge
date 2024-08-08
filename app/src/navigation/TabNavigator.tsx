import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import type { RootStackScreen, TabParamList } from "./types";
import { ArticlesTab } from "src/screens/tabs/ArticlesTab";
import { SettingsTab } from "src/screens/tabs/SettingsTab";

const BottomTab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: RootStackScreen<"Tabs"> = ({ navigation }) => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen component={ArticlesTab} name="Articles" />
      <BottomTab.Screen component={SettingsTab} name="Settings" />
    </BottomTab.Navigator>
  );
};
