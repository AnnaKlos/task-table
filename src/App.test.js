import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("renders App with input and table", () => {
  render(<App />);
  const input = screen.getByRole("spinbutton");
  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});

test("can write a number in input", () => {
  render(<App />);
  const input = screen.getByRole("spinbutton");

  user.click(input);
  user.keyboard("2");

  expect(input).toHaveValue(2);
});
