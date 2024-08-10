import { fireEvent, render, screen } from "@testing-library/react-native";
import { FavoritesTab } from "src/screens/tabs/FavoritesTab";
import { Story } from "src/services/api/types";

const mockNavigationProps = {
  setOptions: jest.fn(),
  navigate: jest.fn()
};

const mockToggleFavorite = jest.fn();

const mockStory: Story = {
  author: "toomuchtodo",
  objectID: "41195352",
  story_title: "China's Real Economic Crisis",
  story_url: "https://www.foreignaffairs.com/china/chinas-real-economic-crisis",
  created_at: "2024-08-08T19:37:08Z",
  created_at_i: 1723145828,
  isDeleted: false
};

jest.mock("src/store/storiesStore", () => ({
  useStoriesStore: () => ({
    favorites: [mockStory],
    toggleFavorite: mockToggleFavorite
  })
}));

describe("<FavoritesTab />", () => {
  test("should navigate to ArticleScreen", () => {
    render(<FavoritesTab navigation={mockNavigationProps} />);

    fireEvent.press(screen.getByTestId(`story-${mockStory.objectID}`));

    expect(mockNavigationProps.navigate).toHaveBeenCalledWith("Article", {
      story_url: mockStory.story_url
    });
  });

  test("should call toggleFavorite from useStoriesStore", () => {
    render(<FavoritesTab navigation={mockNavigationProps} />);

    fireEvent.press(screen.getByTestId("toogleFavoriteButton"));

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it("Snapshot", () => {
    const tree = render(
      <FavoritesTab navigation={mockNavigationProps} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
