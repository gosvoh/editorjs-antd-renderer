import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import { Matchers, AsymmetricMatchers } from "bun:test";

declare module "bun:test" {
  interface Matchers<T>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  // @ts-expect-error https://github.com/oven-sh/bun/issues/15222
  interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
