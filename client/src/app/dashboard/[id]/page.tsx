import { redirect } from "next/navigation";
import { RequestsTable } from "@/components/requests-table";
import { getSession, getRequests } from "@/utils/api";

export default async function Dashboard({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user_id = session?.user?.user_id;

  if (!user_id) {
    redirect("/");
  }

  const requests = await getRequests(user_id);

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6 bg-neutral-800">
      <div className="flex flex-col m-8">
        <h1 className="font-semibold text-lg md:text-2xl text-white">
          Requests
        </h1>
        <h3 className="font-semibold text-sm md:text-sm text-white italic mt-2">
          Table with the wages early access requests
        </h3>
        <div className="mt-6">
          <RequestsTable requests={requests} />
        </div>
      </div>
    </main>
  );
}
