import SignUp from "@/components/sign-up";
import { register } from "@/utils/api";

export default function Register() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-neutral-800">
      <SignUp action={register} />
    </main>
  );
}
