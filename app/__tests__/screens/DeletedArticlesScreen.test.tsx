import { render, screen } from "@testing-library/react-native";
import { DeletedArticlesScreen } from "src/screens/DeletedArticlesScreen";
import { Story } from "src/services/api/types";

const mockNavigationProps = {
  setOptions: jest.fn()
};

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
  objectID: Math.random().toString(),
  isDeleted: true
};

jest.mock("src/store/storiesStore", () => ({
  useStoriesStore: () => ({
    list: [mockStory, mockDeletedStory]
  })
}));

describe("<DeletedArticlesScreen />", () => {
  test("should render only deleted articles", () => {
    render(<DeletedArticlesScreen navigation={mockNavigationProps} />);

    expect(() => screen.getByText(mockStory.story_title)).toThrow();

    expect(screen.getByText(mockDeletedStory.story_title)).toBeTruthy();
  });

  it("Snapshot", () => {
    const tree = render(
      <DeletedArticlesScreen navigation={mockNavigationProps} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
