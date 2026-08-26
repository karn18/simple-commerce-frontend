import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Page from "../app/page";

test("Page", async () => {
  const page = await Page({ searchParams: Promise.resolve({}) });
  render(page);
  expect(
    screen.getByRole("heading", { level: 1, name: "Product Page" }),
  ).toBeDefined();
});
