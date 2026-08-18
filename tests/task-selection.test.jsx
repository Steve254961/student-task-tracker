import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

describe("Student Task Tracker", () => {
  test("renders the main dashboard", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /student task tracker/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /my tasks/i,
      })
    ).toBeInTheDocument();
  });

  test("allows a user to select a task", async () => {
    const user = userEvent.setup();

    render(<App />);

    const checkbox = screen.getByRole("checkbox", {
      name: /select complete networking assignment/i,
    });

    await user.click(checkbox);

    expect(checkbox).toBeChecked();

    const selectedLabel = screen.getByText("Selected");
expect(selectedLabel.nextElementSibling).toHaveTextContent("1");
  });

  test("filters tasks using the search field", async () => {
    const user = userEvent.setup();

    render(<App />);

    const search = screen.getByRole("searchbox", {
      name: /search tasks/i,
    });

    await user.type(search, "database");

    expect(
      screen.getByText("Database practical")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Build React dashboard")
    ).not.toBeInTheDocument();
  });
});