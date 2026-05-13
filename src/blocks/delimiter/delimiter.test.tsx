import { expect, test } from "bun:test";
import Renderer from "../../index";
import { render } from "@testing-library/react";

test("Delimiter renders a separator", () => {
  const { container } = render(
    <Renderer data={{ blocks: [{ type: "delimiter", data: {} }] }} />,
  );
  expect(container.querySelector(".ant-divider")).toBeInTheDocument();
});

test("Delimiter accepts props via blocksProps", () => {
  const { container } = render(
    <Renderer
      data={{ blocks: [{ type: "delimiter", data: {} }] }}
      blocksProps={{ delimiter: { dashed: true } }}
    />,
  );
  expect(container.querySelector(".ant-divider-dashed")).toBeInTheDocument();
});
