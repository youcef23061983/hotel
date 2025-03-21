import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import ContactUs from "../components/ContactUs";
import { HelmetProvider } from "react-helmet-async";
describe("group of contact testing", () => {
  const queryClient = new QueryClient();
  let submit;
  beforeEach(async () => {
    submit = vi.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ContactUs onSubmit={submit} />
        </HelmetProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText("...is loading")).toBeNull();
    });
  });
  it("should render the background of the div", async () => {
    const div = screen.getByTestId("custom-element");
    expect(div).toBeInTheDocument();
    expect(div).toHaveStyle(
      `background: url(src/images/homepage/img1.jpg) center/cover`
    );
  });
  it("should render the proper elements", async () => {
    const h2 = screen.getByRole("heading", { name: "GET IN TOUCH" });
    expect(h2).toBeInTheDocument();
    const allh4 = screen.getAllByRole("heading", { level: 4 });
    expect(allh4).toHaveLength(4);
    allh4.forEach((h4) => {
      expect(h4).toBeInTheDocument();
    });
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    const textInput = screen.getAllByRole("textbox");
    // screen.debug(textInput);
    const termLabel = screen.getByLabelText("First Name:");
    expect(termLabel).toBeInTheDocument();
    const emailInput = screen.getByLabelText("Email:");
    expect(emailInput).toBeInTheDocument();
    const commentTextarea = screen.getByLabelText("Comment:");
    expect(commentTextarea).toBeInTheDocument();
  });

  it("should send an email when the form is submitted", async () => {
    const user = userEvent.setup();
    // Get form inputs
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const commentTextarea = screen.getByLabelText(/Comment/i);
    // Enter data into form inputs
    const name = "John";
    const email = "john@example.com";
    const comment = "This is a test comment.";
    await user.type(firstNameInput, name);
    await user.type(emailInput, email);
    await user.type(commentTextarea, comment);
    // Click the submit button
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    await user.click(submitButton);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith({
      name,
      email,
      comment,
    });
    // screen.debug();
  });
});
