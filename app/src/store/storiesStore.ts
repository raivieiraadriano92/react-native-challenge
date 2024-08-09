import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { fetchStories } from "src/services/api";
import { Story } from "src/services/api/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoriesStoreState = {
  favorites: Story[];
  isFeching: boolean;
  isRefreshing: boolean;
  list: Story[];
  preferences: {
    android: boolean;
    ios: boolean;
  };
  fetch: (_refresh?: boolean) => Promise<void>;
  toggleDeleted: (_objectID: string) => void;
  toggleFavorite: (_story: Story) => void;
};

const STORAGE_KEY = "storiesStore";

export const useStoriesStore = create<StoriesStoreState>()(
  persist(
    (set, get) => ({
      favorites: [],
      list: [],
      isFeching: false,
      isRefreshing: false,
      preferences: {
        android: Platform.OS === "android",
        ios: Platform.OS === "ios"
      },
      fetch: async (refresh) => {
        set((state) => ({
          ...state,
          isFeching: true,
          isRefreshing: !!refresh
        }));

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
          isRefreshing: false,
          list: response.data.hits
        }));
      },
      toggleDeleted: (objectID) =>
        set((state) => {
          const draftList = [...state.list];

          let draftFavorites = [...state.favorites];

          const storyIndex = draftList.findIndex(
            (story) => story.objectID === objectID
          );

          draftList[storyIndex].isDeleted = !draftList[storyIndex].isDeleted;

          if (draftList[storyIndex].isDeleted) {
            draftFavorites = draftFavorites.filter(
              (story) => story.objectID !== objectID
            );
          }

          return {
            list: draftList,
            favorites: draftFavorites
          };
        }),
      toggleFavorite: (story) =>
        set((state) => {
          const favoritesDraft = [...state.favorites];

          const index = favoritesDraft.findIndex(
            (favorite) => favorite.objectID === story.objectID
          );

          if (index === -1) {
            favoritesDraft.push(story);
          } else {
            favoritesDraft.splice(index, 1);
          }

          return {
            favorites: favoritesDraft.sort(
              (a, b) => b.created_at_i - a.created_at_i
            )
          };
        })
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
