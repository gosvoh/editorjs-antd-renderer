import { expect, test } from "bun:test";
import Renderer from "../../index";
import { screen, render } from "@testing-library/react";

// https://github.com/editor-js/image#output-data
const correctData = {
  blocks: [
    {
      type: "image",
      data: {
        file: {
          url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
        },
        caption: "Roadster // tesla.com",
        withBorder: false,
        withBackground: false,
        stretched: true,
      },
    },
  ],
};

const errorData = {
  blocks: [
    {
      type: "notImage",
      data: {},
    },
  ],
};

test("Image", () => {
  render(<Renderer data={correctData} />);
  const component = screen.getByAltText(correctData.blocks[0].data.caption);
  // @ts-expect-error
  expect(component).toBeInTheDocument();
  // @ts-expect-error
  expect(component).toHaveAttribute("src", correctData.blocks[0].data.file.url);
});

test("Error image", () => {
  render(<Renderer data={errorData} />);
  const errorComponent = screen.getByText("Error rendering block", {
    exact: false,
  });
  const correctComponent = screen.queryByAltText(
    correctData.blocks[0].data.caption,
  );
  // @ts-expect-error
  expect(errorComponent).toBeInTheDocument();
  // @ts-expect-error
  expect(correctComponent).not.toBeInTheDocument();
});
