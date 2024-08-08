import { useEffect } from "react";

import { View } from "react-native";
import { TabScreen } from "src/navigation/types";
import { useStoriesStore } from "src/store/storiesStore";

export const ArticlesTab: TabScreen<"Articles"> = () => {
  const storiesStore = useStoriesStore();

  useEffect(() => {
    storiesStore.fetch();
  }, []);

  console.log(storiesStore.list.length);

  return <View />;
};
