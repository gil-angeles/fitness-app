import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface SidebarLinkProps {
  to: string;
  label: string;
  icon: ReactNode;
}

const SidebarLink = ({ to, label, icon }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-[18px] flex items-center gap-2 hover:underline px-3 py-2 rounded-full transition-shadow${
          isActive ? " active-link" : ""
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
};

export default SidebarLink;
