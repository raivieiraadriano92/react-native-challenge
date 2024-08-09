import { FunctionComponent } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { formatDistance, parseISO } from "date-fns";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native";
import { Story } from "src/services/api/types";
import colors from "tailwindcss/colors";

type StoryRowProps = TouchableOpacityProps & {
  isFavorite?: boolean;
  onPressFavorite: () => void;
  story: Story;
};

export const StoryRow: FunctionComponent<StoryRowProps> = ({
  className,
  isFavorite,
  onPressFavorite,
  story,
  ...props
}) => (
  <TouchableOpacity
    className={`border-b-[1px] border-neutral-100 flex-row p-6 space-x-6 ${className}`}
    {...props}
  >
    <View className="flex-1">
      <Text className="font-medium text-base text-primary">
        {story.story_title}
      </Text>
      <Text className="text-sm text-neutral-400">
        {`${story.author} - ${formatDistance(parseISO(story.created_at), new Date())}`}
      </Text>
    </View>
    {!!onPressFavorite && (
      <TouchableOpacity onPress={onPressFavorite}>
        <FontAwesome
          color={colors.amber[400]}
          name={isFavorite ? "star" : "star-o"}
          size={24}
        />
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);
