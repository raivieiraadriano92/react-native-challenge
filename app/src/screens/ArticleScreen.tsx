import WebView from "react-native-webview";
import { RootStackScreen } from "src/navigation/types";

export const ArticleScreen: RootStackScreen<"Article"> = ({
  route: { params }
}) => <WebView className="flex-1" source={{ uri: params.story_url }} />;
