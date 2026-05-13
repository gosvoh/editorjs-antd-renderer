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
  expect(component).toBeInTheDocument();
  expect(component).toHaveAttribute("src", correctData.blocks[0].data.file.url);
});

test("Image applies urlPrefix from config", () => {
  render(
    <Renderer
      data={{
        blocks: [
          {
            type: "image",
            data: {
              file: { url: "photo.jpg" },
              caption: "photo",
              withBorder: false,
              withBackground: false,
              stretched: false,
            },
          },
        ],
      }}
      config={{ image: { urlPrefix: "https://cdn.example.com/" } }}
    />,
  );
  expect(screen.getByAltText("photo")).toHaveAttribute(
    "src",
    "https://cdn.example.com/photo.jpg",
  );
});

test("Image uses url field when file is absent (simpleImage)", () => {
  render(
    <Renderer
      data={{
        blocks: [
          {
            type: "simpleImage",
            data: {
              url: "https://example.com/img.jpg",
              caption: "simple",
              withBorder: false,
              withBackground: false,
              stretched: false,
            },
          },
        ],
      }}
    />,
  );
  expect(screen.getByAltText("simple")).toHaveAttribute(
    "src",
    "https://example.com/img.jpg",
  );
});

test("Error image", () => {
  render(<Renderer data={errorData} />);
  const errorComponent = screen.getByText("Error rendering block", {
    exact: false,
  });
  const correctComponent = screen.queryByAltText(
    correctData.blocks[0].data.caption,
  );
  expect(errorComponent).toBeInTheDocument();
  expect(correctComponent).not.toBeInTheDocument();
});
