import React from "react";
import { render } from "@testing-library/react";
import App from "./index";

describe("Components", () => {
  test("Render React Hooks Todos", () => {
    const { getByText } = render(<App />);
    const headerText = getByText(/React Hooks Todos/i);
    expect(headerText).toBeInTheDocument();
  });
});
