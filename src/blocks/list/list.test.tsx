import { expect, test } from "bun:test";
import Renderer from "../../index";
import { screen, render } from "@testing-library/react";

// https://github.com/editor-js/list#output-data
const correctData = {
  blocks: [
    {
      type: "list",
      data: {
        style: "unordered",
        items: [
          {
            content: "Apples",
            meta: {},
            items: [
              {
                content: "Red",
                meta: {},
                items: [],
              },
            ],
          },
        ],
      },
    },
    {
      type: "list",
      data: {
        style: "ordered",
        meta: {
          start: 2,
          counterType: "upper-roman",
        },
        items: [
          {
            content: "Apples",
            meta: {},
            items: [
              {
                content: "Red",
                meta: {},
                items: [],
              },
            ],
          },
        ],
      },
    },
    {
      type: "list",
      data: {
        style: "checklist",
        items: [
          {
            content: "Apples",
            meta: { checked: false },
            items: [
              {
                content: "Red",
                meta: { checked: true },
                items: [],
              },
            ],
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

test("List", () => {
  render(<Renderer data={correctData} />);
  const applesElements = screen.getAllByText("Apples");
  expect(applesElements).toHaveLength(3);
  const redElements = screen.getAllByText("Red");
  expect(redElements).toHaveLength(3);
  const checklistItems = screen.getAllByRole("checkbox");
  expect(checklistItems).toHaveLength(2);
  expect(checklistItems[0]).not.toBeChecked();
  expect(checklistItems[1]).toBeChecked();
});

test("Error list", () => {
  render(<Renderer data={errorData} />);
  const errorComponent = screen.getByText("Error rendering block", {
    exact: false,
  });
  const correctComponent = screen.queryByText("Apples");
  expect(errorComponent).toBeInTheDocument();
  expect(correctComponent).not.toBeInTheDocument();
});
