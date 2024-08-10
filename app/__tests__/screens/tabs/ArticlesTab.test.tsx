import { fireEvent, render, screen } from "@testing-library/react-native";
import { ArticlesTab } from "src/screens/tabs/ArticlesTab";
import { Story } from "src/services/api/types";

const mockNavigationProps = {
  setOptions: jest.fn(),
  navigate: jest.fn()
};

const mockToggleDeleted = jest.fn();

const mockFetch = jest.fn();

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

const mockDeletedStory: Story = {
  ...mockStory,
  story_title: "Deleted Story",
  objectID: "41195222",
  isDeleted: true
};

jest.mock("src/store/storiesStore", () => ({
  useStoriesStore: () => ({
    favorites: [],
    list: [mockStory, mockDeletedStory],
    fetch: mockFetch,
    toggleDeleted: mockToggleDeleted,
    toggleFavorite: mockToggleFavorite
  })
}));

afterEach(() => {
  mockFetch.mockClear();
});

describe("<ArticlesTab />", () => {
  test("should not render deleted articles", () => {
    render(<ArticlesTab navigation={mockNavigationProps} />);

    expect(() => screen.getByText(mockDeletedStory.story_title)).toThrow();

    expect(screen.getByText(mockStory.story_title)).toBeTruthy();
  });

  test("should fetch articles at first launch", () => {
    render(<ArticlesTab navigation={mockNavigationProps} />);

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("should navigate to ArticleScreen", () => {
    render(<ArticlesTab navigation={mockNavigationProps} />);

    fireEvent.press(screen.getByTestId(`story-${mockStory.objectID}`));

    expect(mockNavigationProps.navigate).toHaveBeenCalledWith("Article", {
      story_url: mockStory.story_url
    });
  });

  test("should call toggleFavorite from useStoriesStore", () => {
    render(<ArticlesTab navigation={mockNavigationProps} />);

    fireEvent.press(screen.getByTestId("toogleFavoriteButton"));

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });

  test("should call toggleDeleted from useStoriesStore", () => {
    render(<ArticlesTab navigation={mockNavigationProps} />);

    fireEvent.press(screen.getByTestId("deleteButton"));

    expect(mockToggleDeleted).toHaveBeenCalledTimes(1);
  });

  it("Snapshot", () => {
    const tree = render(
      <ArticlesTab navigation={mockNavigationProps} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
