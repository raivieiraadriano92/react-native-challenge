import { FlatList } from "react-native";
import { StoryRow } from "src/components/StoryRow";
import { TabScreen } from "src/navigation/types";
import { useStoriesStore } from "src/store/storiesStore";

export const FavoritesTab: TabScreen<"Favorites"> = ({ navigation }) => {
  const storiesStore = useStoriesStore();

  const favorites = storiesStore.list.filter(
    (story) => storiesStore.favorites.includes(story.objectID),
    []
  );

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.objectID}
      renderItem={({ item }) => (
        <StoryRow
          isFavorite={storiesStore.favorites.includes(item.objectID)}
          onPress={() =>
            navigation.navigate("Article", { story_url: item.story_url })
          }
          onPressFavorite={() => storiesStore.toggleFavorite(item.objectID)}
          story={item}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};
