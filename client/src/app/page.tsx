import SignIn from "@/components/sign-in";
import { signIn } from "@/utils/api";

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-neutral-800">
      <SignIn action={signIn} />
    </main>
  );
}
