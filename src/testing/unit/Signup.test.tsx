import Signup from "@/auth/forms/SignupForm";
import * as api from "@/lib/supabase/api";
import { renderWithProviders } from "@/testing/test-utils";

import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";


describe("Signup functionality", () => {
	test("Render", () => {
		renderWithProviders(<Signup />);

		expect(screen.getByText(/for a new account/)).toBeInTheDocument();
		expect(screen.getByText(/at least 8 characters/)).toBeInTheDocument();
		expect(screen.getByText(/password/)).toBeInTheDocument();
	});

	test("Textboxes contain proper values", async () => {
		renderWithProviders(<Signup />);

		const textboxes = screen.getAllByRole("textbox");
		const emailValue = "bademail";
		const usernameValue = "me";
		const passwordValue = "thisthis";
		const confirmPasswordValue = "thisthis";

		expect(textboxes.length).toBe(4);

		await userEvent.type(textboxes[0], emailValue);
		expect(textboxes[0]).toHaveValue(emailValue);
		await userEvent.type(textboxes[1], usernameValue);
		expect(textboxes[1]).toHaveValue(usernameValue);
		await userEvent.type(textboxes[2], passwordValue);
		expect(textboxes[2]).toHaveValue(passwordValue);
		await userEvent.type(textboxes[3], confirmPasswordValue);
		expect(textboxes[3]).toHaveValue(confirmPasswordValue);
	});

	test("Mock useSignup()", async () => {
		renderWithProviders(<Signup />);

		const mockSignup = vi.spyOn(api, "createUserAccount");
		mockSignup.mockResolvedValue([]);

		const emailValue = "qw@qw.net";
		const usernameValue = "qwerty";
		const passwordValue = "qqqqqqqq";
		const confirmPasswordValue = "qqqqqqqq";

		await userEvent.type(screen.getByLabelText(/email/i), emailValue);
		await userEvent.type(screen.getByLabelText(/username/i), usernameValue);
		await userEvent.type(screen.getByLabelText(/^password$/i), passwordValue);
		await userEvent.type(
			screen.getByLabelText(/confirm password/i),
			confirmPasswordValue,
		);

		const button = screen.getByRole("button");
		await userEvent.click(button);

		expect(mockSignup).toHaveBeenCalled();
		await expect(mockSignup.mock.results[0].value).resolves.toEqual([]);
		expect(mockSignup).toHaveBeenCalledWith({
			email: emailValue,
			username: usernameValue,
			password: passwordValue,
			confirmPassword: confirmPasswordValue,
		});
	});
});
