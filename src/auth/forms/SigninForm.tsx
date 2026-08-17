import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldDescription,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { SigninValidation } from "@/Validation";
// import { useSignInWithEmailAndPassword } from "@/firebase/api";

type SigninFormData = z.infer<typeof SigninValidation>;

function SigninForm() {
	const form = useForm<SigninFormData>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const navigate = useNavigate();

	async function handleSignin(user: SigninFormData) {
		try {
			const credential = await useSignInWithEmailAndPassword(
				user.email,
				user.password,
			);
			if (credential) navigate("/");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<main className="flex min-h-svh flex-col items-center justify-center">
			<form className="min-w-sm" onSubmit={form.handleSubmit(handleSignin)}>
				<FieldGroup>
					<FieldSet>
						<FieldDescription>Sign in to your account</FieldDescription>

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
					</FieldSet>
					<Field>
						<Button type="submit">Submit</Button>
					</Field>
				</FieldGroup>
			</form>

			<p className="mt-5">
				Need an account?{" "}
				<Link to={"/signup"} className="text-[#1E90FF]">
					Click here
				</Link>{" "}
				to make one.
			</p>
		</main>
	);
}

export default SigninForm;
