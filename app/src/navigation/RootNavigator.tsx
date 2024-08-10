import { type FunctionComponent } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TabNavigator } from "./TabNavigator";

import type { RootStackParamList } from "./types";

import { useNotificationHandler } from "src/hooks/useNotificationHandler";
import { ArticleScreen } from "src/screens/ArticleScreen";
import { DeletedArticlesScreen } from "src/screens/DeletedArticlesScreen";
import { OnboardingScreen } from "src/screens/OnboardingScreen";
import { useGeneralStore } from "src/store/generalStore";

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: FunctionComponent = () => {
  useNotificationHandler();

  const generalStore = useGeneralStore();

  const initialRouteName = generalStore.isFirstLaunch ? "Onboarding" : "Tabs";

  return (
    <NativeStack.Navigator initialRouteName={initialRouteName}>
      <NativeStack.Screen component={ArticleScreen} name="Article" />
      <NativeStack.Screen
        component={DeletedArticlesScreen}
        name="DeletedArticles"
        options={{ title: "Deleted Articles" }}
      />
      <NativeStack.Screen
        component={OnboardingScreen}
        name="Onboarding"
        options={{
          headerShown: false
        }}
      />
      <NativeStack.Screen
        component={TabNavigator}
        name="Tabs"
        options={{ headerShown: false }}
      />
    </NativeStack.Navigator>
  );
};
