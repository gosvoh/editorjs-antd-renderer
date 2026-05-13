import { expect, test } from "bun:test";
import Renderer from "../../index";
import { screen, render } from "@testing-library/react";

const correctData = {
  blocks: [
    {
      type: "warning",
      data: {
        title: "Watch out",
        message: "This action cannot be undone.",
      },
    },
  ],
};

test("Warning renders title and message", () => {
  render(<Renderer data={correctData} />);
  expect(screen.getByText("Watch out")).toBeInTheDocument();
  expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
});

test("Warning strips script tags (XSS)", () => {
  render(
    <Renderer
      data={{
        blocks: [
          {
            type: "warning",
            data: {
              title: "Alert",
              message: 'Safe<script>alert("xss")</script>',
            },
          },
        ],
      }}
    />,
  );
  expect(screen.getByText("Safe")).toBeInTheDocument();
  expect(document.querySelector("script")).toBeNull();
});
