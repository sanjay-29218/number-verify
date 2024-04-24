import Input from "../component/Input";
import { describe, test, expect } from "vitest";
import { render } from "../utils/test.utils";

describe("Input component", () => {
  test("it renders six input fields", () => {
    render(<Input />);
    const inputFields = screen.getAllByRole("textbox");
    expect(inputFields.length).toBe(6);
  });

  test("it handles input change correctly", () => {
    render(<Input />);
    const firstInput = screen.getByRole("textbox", { name: /digit 1/i });
    fireEvent.change(firstInput, { target: { value: "1" } });
    expect(firstInput).toHaveValue("1");
  });

  test("it focuses on the next input when a digit is entered", () => {
    render(<Input />);
    const firstInput = screen.getByRole("textbox", { name: /digit 1/i });
    fireEvent.change(firstInput, { target: { value: "1" } });
    const secondInput = screen.getByRole("textbox", { name: /digit 2/i });
    expect(document.activeElement).toBe(secondInput);
  });

  test("it handles paste event correctly", () => {
    render(<Input />);
    const firstInput = screen.getByRole("textbox", { name: /digit 1/i });
    fireEvent.paste(firstInput, {
      clipboardData: {
        getData: () => "123456",
      },
    });
    expect(screen.getByRole("textbox", { name: /digit 1/i })).toHaveValue("1");
    expect(screen.getByRole("textbox", { name: /digit 2/i })).toHaveValue("2");
    expect(screen.getByRole("textbox", { name: /digit 3/i })).toHaveValue("3");
    expect(screen.getByRole("textbox", { name: /digit 4/i })).toHaveValue("4");
    expect(screen.getByRole("textbox", { name: /digit 5/i })).toHaveValue("5");
    expect(screen.getByRole("textbox", { name: /digit 6/i })).toHaveValue("6");
  });

  test("it handles form submission correctly", async () => {
    render(<Input />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    // Add assertions for form submission
  });

  test("it handles form submission error correctly", async () => {
    render(<Input />);
    const firstInput = screen.getByRole("textbox", { name: /digit 1/i });
    fireEvent.change(firstInput, { target: { value: "1" } });
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
  });
});
