import { useEffect } from "react";

import { FlatList } from "react-native";
import { StoryRow } from "src/components/StoryRow";
import { TabScreen } from "src/navigation/types";
import { useStoriesStore } from "src/store/storiesStore";

export const ArticlesTab: TabScreen<"Articles"> = ({ navigation }) => {
  const storiesStore = useStoriesStore();

  useEffect(() => {
    storiesStore.fetch();
  }, []);

  return (
    <FlatList
      data={storiesStore.list}
      keyExtractor={(item) => item.objectID}
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
            onPressFavorite={() => storiesStore.toggleFavorite(item)}
            story={item}
          />
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};
