import type { FunctionComponent } from "react";

import {
  CompositeScreenProps,
  NavigatorScreenParams
} from "@react-navigation/native";
import { Story } from "src/services/api/types";

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Article: Pick<Story, "story_url">;
  Tabs: undefined | NavigatorScreenParams<TabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootStackScreen<RouteName extends keyof RootStackParamList> =
  FunctionComponent<RootStackScreenProps<RouteName>>;

export type TabParamList = {
  Articles: undefined;
  Settings: undefined;
};

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type TabScreen<RouteName extends keyof TabParamList> = FunctionComponent<
  TabScreenProps<RouteName>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
