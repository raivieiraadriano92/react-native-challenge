import { useEffect } from "react";

import { View } from "react-native";
import { TabScreen } from "src/navigation/types";
import { fetchNews } from "src/services/api";

export const ArticlesTab: TabScreen<"Articles"> = () => {
  useEffect(() => {
    fetchNews("react").then(console.log);
  }, []);

  return <View />;
};
