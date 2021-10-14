import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import DetailedView from "../DetailedView";
import { Comment, SelectedReview } from "../MockData";

afterEach(cleanup);

test("check if render with existing comment", () => {
  const setStateMock = jest.fn();
  render(
    <DetailedView
      show={true}
      review={SelectedReview}
      comments={Comment}
      setComment={setStateMock}
    />
  );

  const comment = screen.getByTestId("posted_comment");

  expect(comment.textContent).toBe("testing123");
});

test("editor shows up when three dot button pressed", () => {
  const setStateMock = jest.fn();
  render(
    <DetailedView
      show={true}
      review={SelectedReview}
      comments={Comment}
      setComment={setStateMock}
    />
  );

  const threeDot = screen.getByTestId("three_dot");

  fireEvent.click(threeDot);

  const textArea = screen.getByTestId("text_input");

  expect(textArea).toBeTruthy();
});
