import { FunctionComponent } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { formatDistance, parseISO } from "date-fns";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Story } from "src/services/api/types";
import colors from "tailwindcss/colors";

type StoryRowProps = TouchableOpacityProps & {
  isFavorite?: boolean;
  onPressDelete?: () => void;
  onPressFavorite?: () => void;
  onPressUndo?: () => void;
  story: Story;
};

export const StoryRow: FunctionComponent<StoryRowProps> = ({
  className,
  isFavorite,
  onPressDelete,
  onPressFavorite,
  onPressUndo,
  story,
  ...props
}) => {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    return (
      <View className="bg-neutral-200 flex-1 flex-row items-center">
        <View className="flex-1 p-6">
          <Text className="font-bold text-neutral-500 text-lg">
            Are you sure?
          </Text>
        </View>
        <Animated.View style={{ opacity }}>
          {!!onPressDelete && (
            <TouchableOpacity
              className="bg-red-500 flex-1 h-full items-center justify-center p-6"
              onPress={onPressDelete}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    );
  };

  const content = (
    <TouchableOpacity
      className={`bg-white border-b-[1px] border-neutral-100 flex-row p-6 space-x-6 ${className}`}
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
      {!!onPressUndo && (
        <TouchableOpacity onPress={onPressUndo}>
          <Text className="font-medium text-blue-400 text-base">Undo</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  if (onPressDelete) {
    return (
      <Swipeable renderRightActions={renderRightActions}>{content}</Swipeable>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  swipedRow: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#818181"
  },
  swipedConfirmationContainer: {
    flex: 1
  },
  deleteConfirmationText: {
    color: "#fcfcfc",
    fontWeight: "bold"
  },
  deleteButton: {
    backgroundColor: "#b60000",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%"
  },
  deleteButtonText: {
    color: "#fcfcfc",
    fontWeight: "bold",
    padding: 3
  }
});
