import { useEffect, useLayoutEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { OfflineWarning } from "src/components/OfflineWarning";
import { StoryRow } from "src/components/StoryRow";
import { useInternetStatus } from "src/hooks/useInternetStatus";
import { TabScreen } from "src/navigation/types";
import { useStoriesStore } from "src/store/storiesStore";

export const ArticlesTab: TabScreen<"Articles"> = ({ navigation }) => {
  const storiesStore = useStoriesStore();

  const { isOffline } = useInternetStatus();

  const [isFetched, setIsFetched] = useState(false);

  const list = storiesStore.list.filter((story) => !story.isDeleted);

  useEffect(() => {
    if (!isOffline && !isFetched) {
      console.log("fetching");

      setIsFetched(true);

      storiesStore.fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOffline, isFetched]);

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
    <>
      {storiesStore.isFeching && (
        <View className="p-6">
          <ActivityIndicator />
        </View>
      )}
      <FlatList
        ListHeaderComponent={isOffline ? <OfflineWarning /> : undefined}
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
              testID={`story-${item.objectID}`}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};
