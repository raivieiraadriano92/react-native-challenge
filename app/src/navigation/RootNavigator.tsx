import { type FunctionComponent } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ArticleScreen } from "src/screens/ArticleScreen";

import { TabNavigator } from "./TabNavigator";

import type { RootStackParamList } from "./types";

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: FunctionComponent = () => (
  <NavigationContainer>
    <NativeStack.Navigator>
      <NativeStack.Screen
        component={TabNavigator}
        name="Tabs"
        options={{ headerShown: false }}
      />
      <NativeStack.Screen component={ArticleScreen} name="Article" />
    </NativeStack.Navigator>
  </NavigationContainer>
);
