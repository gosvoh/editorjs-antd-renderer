import { expect, test } from "bun:test";
import Renderer from "./index";
import { screen, render } from "@testing-library/react";

test("returns null when data is undefined", () => {
  const { container } = render(<Renderer />);
  expect(container.firstChild).toBeNull();
});

test("returns error for invalid JSON string", () => {
  render(<Renderer data="not valid json" />);
  expect(
    screen.getByText("Error rendering component: invalid JSON"),
  ).toBeInTheDocument();
});

test("returns error when blocks property is missing", () => {
  render(<Renderer data={{} as never} />);
  expect(
    screen.getByText(/Error rendering component: data must have a blocks/),
  ).toBeInTheDocument();
});

test("renders customBlocks for unknown block type", () => {
  render(
    <Renderer
      data={{ blocks: [{ type: "custom", data: { value: "hello" } }] }}
      customBlocks={{
        custom: (block) => (
          <span data-testid="custom">{String(block.data.value)}</span>
        ),
      }}
    />,
  );
  expect(screen.getByTestId("custom")).toHaveTextContent("hello");
});

test("renders error for unknown block type without customBlocks", () => {
  render(<Renderer data={{ blocks: [{ type: "unknown", data: {} }] }} />);
  expect(
    screen.getByText(/Error rendering block: unknown block type unknown/),
  ).toBeInTheDocument();
});

test("accepts data as JSON string", () => {
  const data = JSON.stringify({
    blocks: [{ type: "paragraph", data: { text: "from string" } }],
  });
  render(<Renderer data={data} />);
  expect(screen.getByText("from string")).toBeInTheDocument();
});
