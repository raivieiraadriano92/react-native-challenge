import { FlatList } from "react-native";
import { StoryRow } from "src/components/StoryRow";
import { TabScreen } from "src/navigation/types";
import { useStoriesStore } from "src/store/storiesStore";

export const FavoritesTab: TabScreen<"Favorites"> = ({ navigation }) => {
  const storiesStore = useStoriesStore();

  return (
    <FlatList
      data={storiesStore.favorites}
      keyExtractor={(item) => item.objectID}
      renderItem={({ item }) => (
        <StoryRow
          isFavorite
          onPress={() =>
            navigation.navigate("Article", { story_url: item.story_url })
          }
          onPressFavorite={() => storiesStore.toggleFavorite(item)}
          story={item}
          testID={`story-${item.objectID}`}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};
