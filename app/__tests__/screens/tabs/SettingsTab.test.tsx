import { render } from "@testing-library/react-native";
import { SettingsTab } from "src/screens/tabs/SettingsTab";

const mockNavigationProps = {
  setOptions: jest.fn()
};

describe("<SettingsTab />", () => {
  it("Snapshot", () => {
    const tree = render(
      <SettingsTab navigation={mockNavigationProps} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
