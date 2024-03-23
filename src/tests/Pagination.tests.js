import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Pagination from "../components/Pagination";

test("checking buttons", () => {
  render(<Pagination />);
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);
});

test("clicking 'next' button calls nextPage function", () => {
  const mock = jest.fn();

  render(<Pagination nextPage={mock} />);
  const nextButton = screen.getByTitle("next");
  user.click(nextButton);

  expect(mock).toHaveBeenCalled();
});
