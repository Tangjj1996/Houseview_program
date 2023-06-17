import { describe, it, expect } from "vitest";
import { getImgExt } from "../utils";

describe("Utils function", () => {
  it("Sould return file extention", () => {
    expect(getImgExt("/src/avatar.png")).toBe(".png");
  });
});
