import * as Notifications from "expo-notifications";

import { Story } from "./services/api/types";

type RequestNotificationsPermissionsParams = {
  onDenied?(): void;
  onGranted?(): void;
  onUndetermined?(): void;
};

export const requestNotificationsPermissions = async ({
  onDenied,
  onGranted,
  onUndetermined
}: RequestNotificationsPermissionsParams) => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  switch (finalStatus) {
    case "granted":
      onGranted?.();

      break;

    case "denied":
      onDenied?.();

      break;

    case "undetermined":
      onUndetermined?.();

      break;
  }
};

export const displayNewStoryNotification = (story: Story) =>
  requestNotificationsPermissions({
    onGranted: () =>
      Notifications.scheduleNotificationAsync({
        content: {
          title: story.story_title,
          body: `By ${story.author}`,
          data: { url: story.story_url }
        },
        identifier: story.objectID,
        trigger: null //{ seconds: 10 }
      })
  });
