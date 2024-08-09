import { useEffect, useLayoutEffect } from "react";

import { FlatList, RefreshControl, Text, TouchableOpacity } from "react-native";
import { StoryRow } from "src/components/StoryRow";
import { TabScreen } from "src/navigation/types";
import { useStoriesStore } from "src/store/storiesStore";

export const ArticlesTab: TabScreen<"Articles"> = ({ navigation }) => {
  const storiesStore = useStoriesStore();

  const list = storiesStore.list.filter((story) => !story.isDeleted);

  useEffect(() => {
    storiesStore.fetch();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          className="mr-6"
          onPress={() => navigation.navigate("DeletedArticles")}
        >
          <Text className="text-sm text-red-400">See all deleted</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.objectID}
      refreshControl={
        <RefreshControl
          refreshing={storiesStore.isRefreshing}
          onRefresh={() => storiesStore.fetch(true)}
        />
      }
      renderItem={({ item }) => {
        const isFavorite =
          storiesStore.favorites.findIndex(
            (favorite) => favorite.objectID === item.objectID
          ) !== -1;

        return (
          <StoryRow
            isFavorite={isFavorite}
            onPress={() =>
              navigation.navigate("Article", { story_url: item.story_url })
            }
            onPressDelete={() => storiesStore.toggleDeleted(item.objectID)}
            onPressFavorite={() => storiesStore.toggleFavorite(item)}
            story={item}
          />
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};
