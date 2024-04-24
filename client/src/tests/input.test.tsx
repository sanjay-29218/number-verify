import React from "react";
import {
  render,
  fireEvent,
  getAllByRole,
  getByRole,
  screen,
} from "@testing-library/react";
import Input from "../component/Input";
import { describe, expect, it } from "vitest";

it("renders Input component without crashing", async () => {
  render(<Input />);
});

it("updates digits state correctly on input change", () => {
  const { getAllByRole } = render(<Input />);

  const inputs = getAllByRole("textbox") as HTMLInputElement[];

  inputs.forEach((input, index) =>
    fireEvent.change(input, { target: { value: "1" } })
  );
});

it("Entering valid digits and submitting", async () => {
  const { getAllByRole, getByRole } = render(<Input />);
  const inputs = getAllByRole("textbox") as HTMLInputElement[];

  inputs.forEach((input, index) =>
    fireEvent.change(input, { target: { value: "1" } })
  );

  const submitButton = getAllByRole("button")[0];
  console.log("btn", submitButton);
  fireEvent.submit(submitButton);
});
it("Entering invalid digits and submitting", async () => {
  const { getAllByRole, getByRole } = render(<Input />);
  const inputs = getAllByRole("textbox") as HTMLInputElement[];

  inputs.forEach((input, index) =>
    fireEvent.change(input, { target: { value: "a" } })
  );

  const submitButton = getAllByRole("button")[0];
  console.log("btn", submitButton);
  fireEvent.submit(submitButton);
});

it("entering valid digit", async () => {
  const { getAllByRole, getByRole } = render(<Input />);

  const inputs = getAllByRole("textbox") as HTMLInputElement[];

  inputs.forEach((input, index) => {
    fireEvent.change(input, { target: { value: "1" } });
    expect(inputs[index].value).toBe("1");
  });
});

it("entering invalid digit", async () => {
  const { getAllByRole } = render(<Input />);
  const inputs = getAllByRole("textbox") as HTMLInputElement[];

  inputs.forEach((input, index) => {
    fireEvent.change(input, { target: { value: "a" } });
    expect(input.value).not.toBe("a");
  });
});
