import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GeneralStoreState = {
  isFirstLaunch: boolean;
  notificationPreferences: {
    android: boolean;
    ios: boolean;
  };
  setIsFirstLaunch: (_: boolean) => void;
  toggleAndroid: (_: boolean) => void;
  toggleIOS: (_: boolean) => void;
};

const STORAGE_KEY = "generalStore";

export const useGeneralStore = create<GeneralStoreState>()(
  persist(
    (set) => ({
      isFirstLaunch: true,
      notificationPreferences: {
        android: Platform.OS === "android",
        ios: Platform.OS === "ios"
      },
      setIsFirstLaunch: (value) =>
        set(() => ({
          isFirstLaunch: value
        })),
      toggleAndroid: (value) =>
        set((state) => ({
          notificationPreferences: {
            ...state.notificationPreferences,
            android: value
          }
        })),
      toggleIOS: (value) =>
        set((state) => ({
          notificationPreferences: {
            ...state.notificationPreferences,
            ios: value
          }
        }))
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
