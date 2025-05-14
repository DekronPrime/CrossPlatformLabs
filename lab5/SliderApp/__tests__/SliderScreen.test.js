import { isAboveThreshold } from "../screens/SliderScreen";

test("returns true when value is above threshold", () => {
  expect(isAboveThreshold(60)).toBe(true);
});

test("returns false when value is below or equal to threshold", () => {
  expect(isAboveThreshold(50)).toBe(false);
  expect(isAboveThreshold(30)).toBe(false);
});
