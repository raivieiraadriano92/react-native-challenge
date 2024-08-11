import { useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

/**
 * @todo implement notification handler using React Navigation's deep linking
 */
export const useNotificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      () => {
        // console.log("notification", JSON.stringify(notification));
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          console.log("response", JSON.stringify(response));

          const identifier = response.notification.request.identifier;

          if (identifier.includes("https://")) {
            navigation.navigate("Article", {
              story_url: identifier
            });
          }
        }
      );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);

      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [navigation]);
};
