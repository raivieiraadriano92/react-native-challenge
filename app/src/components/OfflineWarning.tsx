import { FunctionComponent } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View, ViewProps } from "react-native";

export const OfflineWarning: FunctionComponent<ViewProps> = ({
  className,
  ...props
}) => (
  <View
    className={`bg-red-500 flex-row items-center justify-center p-3 space-x-2 ${className}`}
    {...props}
  >
    <FontAwesome color="black" name="warning" size={16} />
    <Text className="font-medium text-sm">No internet connection!</Text>
  </View>
);
