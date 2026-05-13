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
      data: {},
    },
  ],
};

test("Paragraph", () => {
  render(<Renderer data={correctData} />);
  const component = screen.getByText(correctData.blocks[0].data.text);
  expect(component).toBeInTheDocument();
});

test("Paragraph renders HTML content", () => {
  render(
    <Renderer
      data={{
        blocks: [
          { type: "paragraph", data: { text: "Click <a href='/'>here</a>" } },
        ],
      }}
    />,
  );
  expect(screen.getByRole("link", { name: "here" })).toBeInTheDocument();
});

test("Paragraph strips script tags (XSS)", () => {
  render(
    <Renderer
      data={{
        blocks: [
          {
            type: "paragraph",
            data: { text: 'Safe<script>alert("xss")</script>' },
          },
        ],
      }}
    />,
  );
  expect(screen.getByText("Safe")).toBeInTheDocument();
  expect(document.querySelector("script")).toBeNull();
});

test("Error paragraph", () => {
  render(<Renderer data={errorData} />);
  const errorComponent = screen.getByText("Error rendering block", {
    exact: false,
  });
  const correctComponent = screen.queryByText(correctData.blocks[0].data.text);
  expect(errorComponent).toBeInTheDocument();
  expect(correctComponent).not.toBeInTheDocument();
});
