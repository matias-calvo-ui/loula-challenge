import Link from "next/link";
import { AuthForm } from "./auth-form";
import { SubmitButton } from "./submit-button";

export default function SignUp({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
        <h3 className="text-xl font-semibold">Sign Up</h3>
        <p className="text-sm text-gray-500">
          Create an account with your email and password
        </p>
      </div>
      <AuthForm action={action}>
        <SubmitButton>Sign Up</SubmitButton>
        <p className="text-center text-sm text-gray-600">
          {"Already have an account? "}
          <Link href="/" className="font-semibold text-gray-800">
            Sign in
          </Link>
          {" instead."}
        </p>
      </AuthForm>
    </div>
  );
}
