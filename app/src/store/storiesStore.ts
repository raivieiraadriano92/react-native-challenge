import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { fetchStories } from "src/services/api";
import { Story } from "src/services/api/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoriesStoreState = {
  favorites: string[];
  isFeching: boolean;
  list: Story[];
  preferences: {
    android: boolean;
    ios: boolean;
  };
  fetch: () => Promise<void>;
  markAsDeleted: (_objectID: string) => void;
  toggleFavorite: (_objectID: string) => void;
};

const STORAGE_KEY = "storiesStore";

export const useStoriesStore = create<StoriesStoreState>()(
  persist(
    (set, get) => ({
      favorites: [],
      list: [],
      isFeching: false,
      preferences: {
        android: Platform.OS === "android",
        ios: Platform.OS === "ios"
      },
      fetch: async () => {
        set((state) => ({ ...state, isFeching: true }));

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

        set((state) => ({
          ...state,
          isFeching: false,
          list: response.data.hits
        }));
      },
      markAsDeleted: (objectID) =>
        set((state) => {
          const draftList = [...state.list];

          const storyIndex = draftList.findIndex(
            (story) => story.objectID === objectID
          );

          draftList[storyIndex].isDeleted = true;

          return {
            list: draftList
          };
        }),
      toggleFavorite: (objectID) =>
        set((state) => {
          const favoritesDraft = [...state.favorites];

          const index = favoritesDraft.findIndex((id) => id === objectID);

          if (index === -1) {
            favoritesDraft.push(objectID);
          } else {
            favoritesDraft.splice(index, 1);
          }

          return { favorites: favoritesDraft };
        })
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
