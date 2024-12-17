import { expect, test } from "bun:test";
import Renderer from "../../index";
import { screen, render } from "@testing-library/react";

// https://github.com/editor-js/paragraph#output-data
const correctData = {
  blocks: [
    {
      type: "paragraph",
      data: {
        text: "Check out our projects on a GitHub page.",
      },
    },
  ],
};

const errorData = {
  blocks: [
    {
      type: "notParagraph",
      data: {
        text: "Check out our projects on a GitHub page.",
      },
    },
  ],
};

test("Paragraph", () => {
  render(<Renderer data={correctData} />);
  const component = screen.getByText(correctData.blocks[0].data.text);
  // @ts-expect-error
  expect(component).toBeInTheDocument();
});

test("Error paragraph", () => {
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
