import { expect, test } from "bun:test";
import Renderer from "../../index";
import { screen, render } from "@testing-library/react";

// https://github.com/editor-js/attaches#output-data
const correctData = {
  blocks: [
    {
      type: "attaches",
      data: {
        file: {
          url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
          size: 91,
          name: "hero.jpg",
          extension: "jpg",
        },
        title: "Hero",
      },
    },
  ],
};

const errorData = {
  blocks: [
    {
      type: "notAttaches",
      data: {},
    },
  ],
};

test("Attaches", () => {
  render(<Renderer data={correctData} />);
  const component = screen.getByText(correctData.blocks[0].data.title);
  // @ts-expect-error
  expect(component).toBeInTheDocument();
  // @ts-expect-error
  expect(component).toHaveAttribute(
    "href",
    correctData.blocks[0].data.file.url,
  );
});

test("Error attaches", () => {
  render(<Renderer data={errorData} />);
  const errorComponent = screen.getByText("Error rendering block", {
    exact: false,
  });
  const correctComponent = screen.queryByText(correctData.blocks[0].data.title);
  // @ts-expect-error
  expect(errorComponent).toBeInTheDocument();
  // @ts-expect-error
  expect(correctComponent).not.toBeInTheDocument();
});
