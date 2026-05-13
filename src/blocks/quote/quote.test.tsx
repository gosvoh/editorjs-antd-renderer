import { expect, test } from "bun:test";
import Renderer from "../../index";
import { screen, render } from "@testing-library/react";

const correctData = {
  blocks: [
    {
      type: "quote",
      data: {
        text: "The unexamined life is not worth living.",
        caption: "Socrates",
        alignment: "left",
      },
    },
  ],
};

test("Quote renders text and caption", () => {
  render(<Renderer data={correctData} />);
  expect(screen.getByText(correctData.blocks[0].data.text)).toBeInTheDocument();
  expect(
    screen.getByText(correctData.blocks[0].data.caption),
  ).toBeInTheDocument();
});

test("Quote renders without caption", () => {
  render(
    <Renderer
      data={{
        blocks: [
          {
            type: "quote",
            data: { text: "No caption here", alignment: "left" },
          },
        ],
      }}
    />,
  );
  expect(screen.getByText("No caption here")).toBeInTheDocument();
});

test("Quote renders HTML content in text", () => {
  render(
    <Renderer
      data={{
        blocks: [
          {
            type: "quote",
            data: {
              text: "Life is <b>beautiful</b>",
              alignment: "left",
            },
          },
        ],
      }}
    />,
  );
  expect(screen.getByText("beautiful")).toBeInTheDocument();
});

test("Quote strips script tags (XSS)", () => {
  render(
    <Renderer
      data={{
        blocks: [
          {
            type: "quote",
            data: {
              text: 'Safe text<script>alert("xss")</script>',
              alignment: "left",
            },
          },
        ],
      }}
    />,
  );
  expect(screen.getByText("Safe text")).toBeInTheDocument();
  expect(document.querySelector("script")).toBeNull();
});
