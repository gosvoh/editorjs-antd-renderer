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
  expect(component).toBeInTheDocument();
  expect(component).toHaveAttribute(
    "href",
    correctData.blocks[0].data.file.url,
  );
});

test("Attaches applies urlPrefix from config", () => {
  render(
    <Renderer
      data={{
        blocks: [
          {
            type: "attaches",
            data: {
              file: { url: "doc.pdf", name: "doc.pdf" },
              title: "Document",
            },
          },
        ],
      }}
      config={{ attaches: { urlPrefix: "https://files.example.com/" } }}
    />,
  );
  expect(screen.getByText("Document")).toHaveAttribute(
    "href",
    "https://files.example.com/doc.pdf",
  );
});

test("Attaches sets download attribute", () => {
  render(<Renderer data={correctData} />);
  const link = screen.getByText(correctData.blocks[0].data.title);
  expect(link).toHaveAttribute(
    "download",
    correctData.blocks[0].data.file.name,
  );
});

test("Error attaches", () => {
  render(<Renderer data={errorData} />);
  const errorComponent = screen.getByText("Error rendering block", {
    exact: false,
  });
  const correctComponent = screen.queryByText(correctData.blocks[0].data.title);
  expect(errorComponent).toBeInTheDocument();
  expect(correctComponent).not.toBeInTheDocument();
});
