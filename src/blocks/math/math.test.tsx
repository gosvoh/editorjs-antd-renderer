import { expect, test } from "bun:test";
import Renderer from "../../index";
import { screen, render } from "@testing-library/react";

// https://github.com/n0str/editorjs-math#output-data
const correctData = {
  blocks: [
    {
      type: "math",
      data: {
        text: "\\{1,2,3,\\ldots ,n\\}",
      },
    },
  ],
};

const errorData = {
  blocks: [
    {
      type: "notMath",
      data: {},
    },
  ],
};

test("Math", () => {
  render(<Renderer data={correctData} />);
  const component = screen.getByRole("math");
  // @ts-expect-error
  expect(component).toBeInTheDocument();
});

test("Error math", () => {
  render(<Renderer data={errorData} />);
  const errorComponent = screen.getByText("Error rendering block", {
    exact: false,
  });
  const correctComponent = screen.queryByRole("math");
  // @ts-expect-error
  expect(errorComponent).toBeInTheDocument();
  // @ts-expect-error
  expect(correctComponent).not.toBeInTheDocument();
});
