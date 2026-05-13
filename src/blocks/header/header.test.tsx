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
  expect(component).toBeInTheDocument();
});

test("Header renders correct heading level", () => {
  render(<Renderer data={correctData} />);
  const heading = screen.getByRole("heading", { level: 2 });
  expect(heading).toBeInTheDocument();
});

test("Header renders HTML content", () => {
  render(
    <Renderer
      data={{
        blocks: [
          { type: "header", data: { text: "Hello <b>World</b>", level: 1 } },
        ],
      }}
    />,
  );
  expect(screen.getByText("World")).toBeInTheDocument();
});

test("Error header", () => {
  render(<Renderer data={errorData} />);
  const errorComponent = screen.getByText("Error rendering block", {
    exact: false,
  });
  const correctComponent = screen.queryByText(correctData.blocks[0].data.text);
  expect(errorComponent).toBeInTheDocument();
  expect(correctComponent).not.toBeInTheDocument();
});
