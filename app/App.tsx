import { FunctionComponent } from "react";

import {
  DefaultTheme,
  NavigationContainer,
  Theme
} from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNavigator } from "src/navigation/RootNavigator";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    primary: "#FF6600"
  }
};

const App: FunctionComponent = () => (
  <GestureHandlerRootView className="flex-1">
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  </GestureHandlerRootView>
);

export default App;
