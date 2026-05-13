import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "bun:test" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Matchers<T>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  // @ts-expect-error https://github.com/oven-sh/bun/issues/15222
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
