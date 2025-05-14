import { render, fireEvent } from "@testing-library/react-native";
import LoginScreen from "../screens/LoginScreen";

test("shows success message on valid login", () => {
  const { getByPlaceholderText, getByText } = render(<LoginScreen />);

  fireEvent.changeText(getByPlaceholderText("Email"), "admin@gmail.com");
  fireEvent.changeText(getByPlaceholderText("Password"), "Qwerty123");
  fireEvent.press(getByText("Login"));

  expect(getByText("Login successful!")).toBeTruthy();
});
