import { FunctionComponent } from "react";

import { Text, View, ViewProps } from "react-native";

type SettingsSectionProps = ViewProps & {
  description: string;
  title: string;
};

export const SettingsSection: FunctionComponent<SettingsSectionProps> = ({
  children,
  className,
  description,
  title,
  ...props
}) => (
  <View className={`space-y-3 ${className}`} {...props}>
    <View className="space-y-1">
      <Text className="font-bold text-xl">{title}</Text>
      <Text className="text-sm text-neutral-400">{description}</Text>
    </View>
    {children}
  </View>
);
