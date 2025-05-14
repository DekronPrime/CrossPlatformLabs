import { render, fireEvent } from "@testing-library/react-native";
import SliderScreen from "../screens/SliderScreen";

test("slider value updates and displays correct text", () => {
  const { getByText, getByTestId } = render(<SliderScreen />);
  const slider = getByTestId("slider");

  fireEvent(slider, "valueChange", 75);

  getByText("Value: 75");
  getByText("Above threshold");
});
