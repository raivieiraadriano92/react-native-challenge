import { FunctionComponent } from "react";

import { formatDistance, parseISO } from "date-fns";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Story } from "src/services/api/types";

type StoryRowProps = TouchableOpacityProps & {
  story: Story;
};

export const StoryRow: FunctionComponent<StoryRowProps> = ({
  className,
  story,
  ...props
}) => (
  <TouchableOpacity
    className={`border-b-[1px] border-neutral-100 p-6 ${className}`}
    {...props}
  >
    <Text className="font-medium text-base text-primary">
      {story.story_title}
    </Text>
    <Text className="text-sm text-neutral-400">
      {`${story.author} - ${formatDistance(parseISO(story.created_at), new Date())}`}
    </Text>
  </TouchableOpacity>
);
