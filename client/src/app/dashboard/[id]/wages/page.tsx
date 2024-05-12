import { redirect } from "next/navigation";
import { WagesTable } from "@/components/wages-table";
import { SubmitButton } from "@/components/submit-button";
import { getSession, getWages, addWage } from "@/utils/api";

export default async function Wages({ params }: { params: { id: string } }) {
  const session = await getSession();
  const user_id = session?.user?.user_id;

  if (!user_id) {
    redirect("/");
  }

  const wages = await getWages(user_id);

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6 bg-neutral-800">
      <div className="flex flex-col m-8">
        <h1 className="font-semibold text-lg md:text-2xl text-white">Wages</h1>
        <h3 className="font-semibold text-sm md:text-sm text-white italic mt-2">
          Table with the wages deposited in the app
        </h3>
        <div className="mt-6">
          <WagesTable wages={wages} />
        </div>
        <div>
          <h3 className="font-semibold text-sm md:text-sm text-white italic my-4">
            Test purpose only:
          </h3>
          <form
            action={async (formData) => {
              "use server";
              await addWage(formData, user_id);
            }}
            className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16 rounded-lg w-full max-w-md"
          >
            <div>
              <label
                htmlFor="balance"
                className="block text-xs text-gray-600 uppercase"
              >
                Wage amount
              </label>
              <input
                id="balance"
                name="balance"
                type="number"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              />
            </div>
            <SubmitButton>Add Wage</SubmitButton>
          </form>
        </div>
      </div>
    </main>
  );
}
