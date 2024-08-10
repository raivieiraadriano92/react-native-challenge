import { type FunctionComponent } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNotificationHandler } from "src/hooks/useNotificationHandler";
import { ArticleScreen } from "src/screens/ArticleScreen";
import { DeletedArticlesScreen } from "src/screens/DeletedArticlesScreen";

import { TabNavigator } from "./TabNavigator";

import type { RootStackParamList } from "./types";

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: FunctionComponent = () => {
  useNotificationHandler();

  return (
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
  );
};
