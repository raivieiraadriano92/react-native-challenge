import { type FunctionComponent } from "react";

import {
  DefaultTheme,
  NavigationContainer,
  Theme
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ArticleScreen } from "src/screens/ArticleScreen";
import { DeletedArticlesScreen } from "src/screens/DeletedArticlesScreen";

import { TabNavigator } from "./TabNavigator";

import type { RootStackParamList } from "./types";

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    primary: "#FF6600"
  }
};

export const RootNavigator: FunctionComponent = () => (
  <NavigationContainer theme={theme}>
    <NativeStack.Navigator>
      <NativeStack.Screen
        component={TabNavigator}
        name="Tabs"
        options={{ headerShown: false }}
      />
      <NativeStack.Screen component={ArticleScreen} name="Article" />
      <NativeStack.Screen
        component={DeletedArticlesScreen}
        name="DeletedArticles"
        options={{ title: "Deleted Articles" }}
      />
    </NativeStack.Navigator>
  </NavigationContainer>
);
