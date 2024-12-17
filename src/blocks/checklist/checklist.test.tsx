import { expect, test } from "bun:test";
import Renderer from "../../index";
import { screen, render } from "@testing-library/react";

// https://github.com/editor-js/checklist#output-data
const correctData = {
  blocks: [
    {
      type: "checklist",
      data: {
        items: [
          {
            text: "This is a block-styled editor",
            checked: true,
          },
          {
            text: "Clean output data",
            checked: false,
          },
          {
            text: "Simple and powerful API",
            checked: true,
          },
        ],
      },
    },
  ],
};

const errorData = {
  blocks: [
    {
      type: "notList",
      data: {},
    },
  ],
};

test("Checklist", () => {
  render(<Renderer data={correctData} />);
  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes).toHaveLength(3);
  // @ts-expect-error
  expect(checkboxes[0]).toBeChecked();
  // @ts-expect-error
  expect(checkboxes[1]).not.toBeChecked();
  // @ts-expect-error
  expect(checkboxes[2]).toBeChecked();
});

test("Error checklist", () => {
  render(<Renderer data={errorData} />);
  const errorComponent = screen.getByText("Error rendering block", {
    exact: false,
  });
  const correctComponent = screen.queryByRole("checkbox");
  // @ts-expect-error
  expect(errorComponent).toBeInTheDocument();
  // @ts-expect-error
  expect(correctComponent).not.toBeInTheDocument();
});
