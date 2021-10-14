import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import ReviewCard from "../ReviewCard";
import { Reviews, OneReview } from "../MockData";

afterEach(cleanup);

test("renders the correct number of reviews", () => {
  render(<ReviewCard reviews={Reviews} />);
  const cards = screen.getAllByTestId("card");

  expect(cards.length).toBe(Reviews.length);
});

test("date formatting is corrent", () => {
  render(<ReviewCard reviews={OneReview} />);
  const date = screen.getByTestId("date");

  expect(date.textContent).toBe("6/27/1974");
});

test("check if comment gets posted", () => {
  render(<ReviewCard reviews={OneReview} />);
  const card = screen.getByTestId("card");

  fireEvent.click(card);

  const textArea = screen.getByTestId("text_input");
  const submitButton = screen.getByText(/submit/i);

  fireEvent.change(textArea, { target: { value: "hello!" } });
  fireEvent.click(submitButton);

  const comment = screen.getByText(/hello/i);

  expect(comment.textContent).toBe("hello!");
});

test("check if comment icon renders when a comment is posted", () => {
  render(<ReviewCard reviews={OneReview} />);
  const card = screen.getByTestId("card");

  fireEvent.click(card);

  const textArea = screen.getByTestId("text_input");
  const submitButton = screen.getByText(/submit/i);

  fireEvent.change(textArea, { target: { value: "hello!" } });
  fireEvent.click(submitButton);

  const replyIcon = screen.getByTestId("replies_icon");

  expect(replyIcon).toBeTruthy();
});
