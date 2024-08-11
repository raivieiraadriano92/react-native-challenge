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
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response", JSON.stringify(response));

        const story_url = response?.notification?.request?.content?.data?.url;

        if (story_url) {
          navigation.navigate("Article", {
            story_url
          });
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);

      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [navigation]);
};
