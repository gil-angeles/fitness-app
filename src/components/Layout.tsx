import { ChartColumn, ListCheck } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import SidebarLink from "./SidebarLink";

const Layout = () => {
  return (
    <div className="flex h-screen w-screen">
      <aside className="w-64 bg-[#323232] text-white py-6 px-8 flex-shrink-0">
        <h1 className="mb-10 font-bold mt-8">
          <NavLink to="/" className="text-[24px] hover:underline pl-1 block">
            Fit App
          </NavLink>
        </h1>

        <nav className="flex flex-col space-y-6 pl-4">
          <SidebarLink
            to="/challenges"
            label="Challenges"
            icon={<ListCheck size={18} />}
          />
          <SidebarLink
            to="/leaderboard"
            label="Leaderboard"
            icon={<ChartColumn size={18} />}
          />
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
