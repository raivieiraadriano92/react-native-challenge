import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ArticlesTab } from "src/screens/tabs/ArticlesTab";
import { SettingsTab } from "src/screens/tabs/SettingsTab";

import type { RootStackScreen, TabParamList } from "./types";

const BottomTab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: RootStackScreen<"Tabs"> = ({}) => (
  <BottomTab.Navigator>
    <BottomTab.Screen component={ArticlesTab} name="Articles" />
    <BottomTab.Screen component={SettingsTab} name="Settings" />
  </BottomTab.Navigator>
);
