import * as z from "zod";

export const SignupValidation = z
	.object({
		username: z
			.string()
			.min(2, { message: "Name must be at least 2 characters." })
			.max(25, { message: "Name must be under 26 characters" }),
		email: z.email(),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters." })
			.max(255, { message: "Password must be under 256 characters" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const SigninValidation = z.object({
	email: z.email(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." }),
});

export const PostValidation = z.object({
	body: z
		.string()
		.min(1, { message: "Post must have at least 1 character." })
		.max(500, { message: "Posts have a maximum of 500 characters" }),
	tags: z.string().optional(),
	// ADD VALIDATION FOR AN OPTIONAL IMAGE HERE
});
