import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
import { getSession, createRequest } from "@/utils/api";

export default async function WageRequest() {
  const session = await getSession();
  const user_id = session?.user?.user_id;

  if (!user_id) {
    redirect("/");
  }

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6 bg-neutral-800">
      <div className="flex flex-col m-8">
        <h1 className="font-semibold text-lg md:text-2xl text-white">
          Wage Request
        </h1>
        <h3 className="font-semibold text-sm md:text-sm text-white italic mt-2">
          Form to request early access to earned wages
        </h3>
        <h3 className="font-semibold text-sm md:text-sm text-white italic mt-2 mb-4">
          Early access request will be approved or rejected depending of the
          available balance
        </h3>

        <div className="flex items-center justify-center w-full">
          <form
            action={async (formData) => {
              "use server";
              await createRequest(formData, user_id);
            }}
            className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16 rounded-lg w-full max-w-md"
          >
            <div>
              <label
                htmlFor="amount"
                className="block text-xs text-gray-600 uppercase"
              >
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="currency"
                className="block text-xs text-gray-600 uppercase"
              >
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              >
                <option value="usd">USD</option>
              </select>
            </div>
            <SubmitButton>Request</SubmitButton>
          </form>
        </div>
      </div>
    </main>
  );
}
