import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { fetchStories } from "src/services/api";
import { Story } from "src/services/api/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoriesStoreState = {
  preferences: {
    android: boolean;
    ios: boolean;
  };
  list: Story[];
  fetch: () => Promise<void>;
};

const STORAGE_KEY = "storiesStore";

export const useStoriesStore = create<StoriesStoreState>()(
  persist(
    (set, get) => ({
      list: [],
      preferences: {
        android: Platform.OS === "android",
        ios: Platform.OS === "ios"
      },
      fetch: async () => {
        const { android, ios } = get().preferences;

        const query = [];

        if (android) {
          query.push("android");
        }

        if (ios) {
          query.push("ios");
        }

        if (query.length === 0) {
          query.push();
        }

        const response = await fetchStories(query.join(","));

        set((state) => ({ ...state, list: response.data.hits }));
      }
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
