import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ArticlesTab } from "src/screens/tabs/ArticlesTab";
import { FavoritesTab } from "src/screens/tabs/FavoritesTab";
import { SettingsTab } from "src/screens/tabs/SettingsTab";

import type { RootStackScreen, TabParamList } from "./types";

const BottomTab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: RootStackScreen<"Tabs"> = ({}) => (
  <BottomTab.Navigator>
    <BottomTab.Screen
      component={ArticlesTab}
      name="Articles"
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome color={color} name="list" size={size} />
        )
      }}
    />
    <BottomTab.Screen
      component={FavoritesTab}
      name="Favorites"
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome color={color} name="star" size={size} />
        )
      }}
    />
    <BottomTab.Screen
      component={SettingsTab}
      name="Settings"
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome color={color} name="gear" size={size} />
        )
      }}
    />
  </BottomTab.Navigator>
);
