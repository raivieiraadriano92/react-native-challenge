import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNavigator } from "src/navigation/RootNavigator";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <RootNavigator />
    </GestureHandlerRootView>
  );
}
