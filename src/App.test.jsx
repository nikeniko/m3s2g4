import { render, screen } from "@testing-library/react";

import MyFooter from "./components/MyFooter";

describe("MyFooter component", () => {
  it("renders h1 with the correct text", () => {
    render(<MyFooter />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
