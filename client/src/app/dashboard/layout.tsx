import MobileSidebar from "@/components/mobile-sidebar";
import { NavItem } from "@/components/nav-item";
import { getSession, signOut, getWages } from "@/utils/api";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const { user_id } = session?.user;
  const wages = await getWages(user_id);
  let balance = 0;

  if (Array.isArray(wages)) {
    wages.forEach((wage) => (balance += Math.round(wage.amount)));
  }

  const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const usdBalance = usdFormatter.format(balance);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] pl-10 lg:pl-0">
      <div className="hidden border-r bg-gray-100 lg:block dark:bg-zinc-800">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-5">
            <p className="font-semibold text-sm text-white">
              {session?.user?.email}
            </p>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavItem href={`/dashboard/${user_id}`}>Requests Table</NavItem>
              <NavItem href={`/dashboard/${user_id}/wage-request`}>
                New Request
              </NavItem>
              <NavItem href={`/dashboard/${user_id}/wages`}>Wages</NavItem>
            </nav>
          </div>
        </div>
      </div>
      <MobileSidebar user_id={user_id} />
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100 px-6 dark:bg-zinc-800 justify-between">
          <p className="font-semibold text-md text-white">
            Balance: {usdBalance}
          </p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              className="flex items-center gap-2 font-semibold text-white"
              type="submit"
            >
              Logout
            </button>
          </form>
        </header>
        {children}
      </div>
    </div>
  );
}
