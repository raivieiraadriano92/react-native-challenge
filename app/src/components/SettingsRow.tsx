import { FunctionComponent } from "react";

import { useTheme } from "@react-navigation/native";
import { Switch, Text, View, ViewProps } from "react-native";

type SettingsRowProps = ViewProps & {
  isActive: boolean;
  onValueChange: (_value: boolean) => void;
  title: string;
};

export const SettingsRow: FunctionComponent<SettingsRowProps> = ({
  className,
  isActive,
  onValueChange,
  title,
  ...props
}) => {
  const theme = useTheme();

  return (
    <View
      className={`flex-row items-center justify-between ${className}`}
      {...props}
    >
      <Text className="text-base">{title}</Text>
      <Switch
        testID="toggleAndroid"
        trackColor={{ false: "#767577", true: theme.colors.primary }}
        thumbColor={isActive ? "white" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={isActive}
      />
    </View>
  );
};
