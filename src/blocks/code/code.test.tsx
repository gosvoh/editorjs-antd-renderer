import { expect, test } from "bun:test";
import Renderer from "../../index";
import { screen, render } from "@testing-library/react";

// https://github.com/editor-js/code#output-data
const correctData = {
  blocks: [
    {
      type: "code",
      data: {
        code: "body {\n font-size: 14px;\n line-height: 16px;\n}",
      },
    },
  ],
};

const errorData = {
  blocks: [
    {
      type: "notCode",
      data: {},
    },
  ],
};

test("Code", () => {
  render(<Renderer data={correctData} />);
  const component = screen.getByRole("code");
  // @ts-expect-error
  expect(component).toBeInTheDocument();
});

test("Error code", () => {
  render(<Renderer data={errorData} />);
  const errorComponent = screen.getByText("Error rendering block", {
    exact: false,
  });
  const correctComponent = screen.queryByRole("code");
  // @ts-expect-error
  expect(errorComponent).toBeInTheDocument();
  // @ts-expect-error
  expect(correctComponent).not.toBeInTheDocument();
});
