import { expect, test } from "bun:test";
import Renderer from "../../index";
import { screen, render } from "@testing-library/react";

// https://github.com/editor-js/header#output-data
const correctData = {
  blocks: [
    {
      type: "header",
      data: {
        text: "Why Telegram is the best messenger",
        level: 2,
      },
    },
  ],
};

const errorData = {
  blocks: [
    {
      type: "notHeader",
      data: {},
    },
  ],
};

test("Header", () => {
  render(<Renderer data={correctData} />);
  const component = screen.getByText(correctData.blocks[0].data.text);
  // @ts-expect-error
  expect(component).toBeInTheDocument();
});

test("Error header", () => {
  render(<Renderer data={errorData} />);
  const errorComponent = screen.getByText("Error rendering block", {
    exact: false,
  });
  const correctComponent = screen.queryByText(correctData.blocks[0].data.text);
  // @ts-expect-error
  expect(errorComponent).toBeInTheDocument();
  // @ts-expect-error
  expect(correctComponent).not.toBeInTheDocument();
});
