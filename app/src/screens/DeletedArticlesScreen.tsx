import { FlatList } from "react-native";

import { StoryRow } from "src/components/StoryRow";
import { RootStackScreen } from "src/navigation/types";
import { useStoriesStore } from "src/store/storiesStore";

export const DeletedArticlesScreen: RootStackScreen<"DeletedArticles"> = ({
  navigation
}) => {
  const storiesStore = useStoriesStore();

  const deletedStories = storiesStore.list.filter((story) => story.isDeleted);

  return (
    <FlatList
      data={deletedStories}
      keyExtractor={(item) => item.objectID}
      renderItem={({ item }) => (
        <StoryRow
          isFavorite
          onPress={() =>
            navigation.navigate("Article", { story_url: item.story_url })
          }
          onPressUndo={() => storiesStore.toggleDeleted(item.objectID)}
          story={item}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};
