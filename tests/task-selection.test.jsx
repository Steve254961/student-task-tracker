import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

describe("Student Task Tracker", () => {
  test("renders the main dashboard", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "Student Task Tracker",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "My Tasks" })
    ).toBeInTheDocument();
  });

  test("allows a user to select a task", async () => {
    const user = userEvent.setup();

    render(<App />);

    const taskCheckbox = screen.getByLabelText(
      "Select Complete networking assignment"
    );

    expect(taskCheckbox).not.toBeChecked();

    await user.click(taskCheckbox);

    expect(taskCheckbox).toBeChecked();
  });

  test("filters tasks using the search field", async () => {
    const user = userEvent.setup();

    render(<App />);

    const searchInput = screen.getByLabelText(
      "Search tasks"
    );

    await user.type(searchInput, "database");

    expect(
      screen.getByText("Database practical")
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Complete networking assignment"
      )
    ).not.toBeInTheDocument();
  });

  test("selection persists after clearing a filter", async () => {
    const user = userEvent.setup();

    render(<App />);

    const networkingTask = screen.getByLabelText(
      "Select Complete networking assignment"
    );

    await user.click(networkingTask);

    expect(networkingTask).toBeChecked();

    const searchInput = screen.getByLabelText(
      "Search tasks"
    );

    await user.type(searchInput, "database");

    expect(
      screen.queryByText(
        "Complete networking assignment"
      )
    ).not.toBeInTheDocument();

    await user.clear(searchInput);

    const restoredTask = screen.getByLabelText(
      "Select Complete networking assignment"
    );

    expect(restoredTask).toBeChecked();
  });
});
test("filters tasks by category", async () => {
  render(<App />);

  const categoryFilter = screen.getByLabelText(
    "Filter tasks by category"
  );

  await userEvent.selectOptions(categoryFilter, "Database");

  expect(screen.getByText("Database practical")).toBeInTheDocument();

  expect(
    screen.queryByText("Complete networking assignment")
  ).not.toBeInTheDocument();
});

