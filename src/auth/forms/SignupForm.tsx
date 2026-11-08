import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCreateUserAccount, useSignInAccount } from "@/lib/tanstack-query/queries";
import { useUserContext } from "@/context/AuthContext";

type SignupFormData = z.infer<typeof SignupValidation>;

function SignupForm() {
	const { mutateAsync: createAccount, isPending: isCreatingAccount } = useCreateUserAccount();
	const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();
	const { isLoading: isUserLoading } = useUserContext();
	const navigate = useNavigate();

	const form = useForm<SignupFormData>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function handleSignup(user: SignupFormData) {
		try {
			await createAccount(user);
		} catch (error) {
			toast.error("There was an error creating the account");
			return;
		}

		try {
			await signInAccount({ email: user.email, password: user.password});
		} catch (error) {
			toast.error("There was an error signing into your new account");
			navigate("/signin");
			return;
		}

		toast.success("Account created successfully");
		navigate("/");
		return;
	}

	return (
		<main className="flex min-h-svh flex-col items-center justify-center">
			<form className="min-w-sm" onSubmit={form.handleSubmit(handleSignup)}>
				<FieldGroup>
					<FieldSet>
						<FieldLegend>Sign up for a new account</FieldLegend>
						<FieldDescription>
							Passwords must be at least 8 characters
						</FieldDescription>
						<Controller
							name="username"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="username">Username</FieldLabel>
									<Input
										{...field}
										id="username"
										placeholder="Enter username"
										required
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="email">Email</FieldLabel>
									<Input
										{...field}
										id="email"
										placeholder="Enter email"
										required
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="password"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<Input
										{...field}
										id="password"
										placeholder="Enter password"
										required
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="confirmPassword"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<FieldLabel htmlFor="confirm-password">
										Confirm password
									</FieldLabel>
									<Input
										{...field}
										id="confirm-password"
										placeholder="Confirm password"
										required
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldSet>
					<Field>
						<Button type="submit">
							{isCreatingAccount || isUserLoading || isSigningIn ?
							"Loading..." : "Sign Up"
							}
						</Button>
					</Field>
				</FieldGroup>
			</form>

			<p className="mt-5">
				Have an account?{" "}
				<Link to={"/signin"} className="text-[#1E90FF]">	
					Click here
				</Link>{" "}
				to sign in.
			</p>
		</main>
	);
}

export default SignupForm;
