import { expect, test } from "bun:test";
import Renderer from "../../index";
import { screen, render } from "@testing-library/react";

const withHeadingsData = {
  blocks: [
    {
      type: "table",
      data: {
        withHeadings: true,
        content: [
          ["Name", "Role"],
          ["Alice", "Admin"],
          ["Bob", "User"],
        ],
      },
    },
  ],
};

const withoutHeadingsData = {
  blocks: [
    {
      type: "table",
      data: {
        withHeadings: false,
        content: [
          ["Alice", "Admin"],
          ["Bob", "User"],
        ],
      },
    },
  ],
};

test("Table renders column headings", () => {
  render(<Renderer data={withHeadingsData} />);
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Role")).toBeInTheDocument();
});

test("Table renders data rows", () => {
  render(<Renderer data={withHeadingsData} />);
  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("Bob")).toBeInTheDocument();
  expect(screen.getByText("Admin")).toBeInTheDocument();
});

test("Table renders without headings", () => {
  render(<Renderer data={withoutHeadingsData} />);
  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("User")).toBeInTheDocument();
});

test("Table renders HTML content in cells", () => {
  render(
    <Renderer
      data={{
        blocks: [
          {
            type: "table",
            data: {
              withHeadings: false,
              content: [["<b>Bold</b>", "Plain"]],
            },
          },
        ],
      }}
    />,
  );
  expect(screen.getByText("Bold")).toBeInTheDocument();
});

test("Table strips script tags in cells (XSS)", () => {
  render(
    <Renderer
      data={{
        blocks: [
          {
            type: "table",
            data: {
              withHeadings: false,
              content: [['Safe<script>alert("xss")</script>', ""]],
            },
          },
        ],
      }}
    />,
  );
  expect(screen.getByText("Safe")).toBeInTheDocument();
  expect(document.querySelector("script")).toBeNull();
});
