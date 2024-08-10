import { fireEvent, render, screen } from "@testing-library/react-native";
import { formatDistance, parseISO } from "date-fns";
import { StoryRow } from "src/components/StoryRow";
import { Story } from "src/services/api/types";

const mockStory: Story = {
  author: "toomuchtodo",
  objectID: "41195352",
  story_title: "China's Real Economic Crisis",
  story_url: "https://www.foreignaffairs.com/china/chinas-real-economic-crisis",
  created_at: "2024-08-08T19:37:08Z",
  created_at_i: 1723145828,
  isDeleted: false
};

describe("<StoryRow />", () => {
  test("it should render correctly", () => {
    render(<StoryRow story={mockStory} />);

    expect(screen.getByText(mockStory.story_title)).toBeTruthy();

    expect(
      screen.getByText(
        `${mockStory.author} - ${formatDistance(parseISO(mockStory.created_at), new Date())}`
      )
    ).toBeTruthy();
  });

  test("onPressFavorite must be called", () => {
    const onPressFavoriteMock = jest.fn();

    render(
      <StoryRow story={mockStory} onPressFavorite={onPressFavoriteMock} />
    );

    fireEvent.press(screen.getByTestId("toogleFavoriteButton"));

    expect(onPressFavoriteMock).toHaveBeenCalledTimes(1);
  });

  test("onPressUndo must be called", () => {
    const onPressUndoMock = jest.fn();

    render(<StoryRow story={mockStory} onPressUndo={onPressUndoMock} />);

    fireEvent.press(screen.getByTestId("undoButton"));

    expect(onPressUndoMock).toHaveBeenCalledTimes(1);
  });

  test("onPressDelete must be called", () => {
    const onPressDeleteMock = jest.fn();

    render(<StoryRow story={mockStory} onPressDelete={onPressDeleteMock} />);

    fireEvent.press(screen.getByTestId("deleteButton"));

    expect(onPressDeleteMock).toHaveBeenCalledTimes(1);
  });
});
