import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

import { fetchStories } from "./api";
import { Story } from "./api/types";

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

export const displayNotification = (story: Story) =>
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

const TASK_NAME = "notification-task";

// Note: This needs to be called in the global scope (e.g outside of your React components)
export const createNotificationTask = () =>
  TaskManager.defineTask(TASK_NAME, async () => {
    const response = await fetchStories("mobile");

    const story = response.data.hits[0];

    const { status } = await Notifications.getPermissionsAsync();

    if (status === "granted") {
      displayNotification(story);
    }

    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData;
  });

export const registerNotificationTask = async () => {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);

    if (!isRegistered) {
      const response = await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 60 * 10, // 10 minutes
        stopOnTerminate: false, // android only
        startOnBoot: true // android only
      });

      console.log("Background fetch registered", response);

      return response;
    }

    console.log("Background fetch already registered");
  } catch (error) {
    console.error("Failed to register background fetch", error);
  }
};

export const unregisterNotificationTask = async () => {
  try {
    await BackgroundFetch.unregisterTaskAsync(TASK_NAME);

    console.log("Background fetch unregistered");
  } catch (error) {
    console.error("Failed to unregister background fetch", error);
  }
};
