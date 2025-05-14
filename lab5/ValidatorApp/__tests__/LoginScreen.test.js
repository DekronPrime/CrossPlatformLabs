const { validateEmail, validatePassword } = require("../screens/LoginScreen");

test("invalid email fails validation", () => {
  expect(validateEmail("email")).toBe(false);
});

test("valid email passes validation", () => {
  expect(validateEmail("admin@gmail.com")).toBe(true);
});

test("short password fails validation", () => {
  expect(validatePassword("qwe")).toBe(false);
});

test("long password passes validation", () => {
  expect(validatePassword("Qwerty123")).toBe(true);
});
