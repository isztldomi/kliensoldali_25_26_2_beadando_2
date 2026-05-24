import { NavLink } from "react-router-dom";

interface HeaderLinkProps {
  to: string;
  children: React.ReactNode;
}

export const HeaderLink = ({ to, children }: HeaderLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        transition-colors duration-300
        ${isActive ? "font-bold text-[var(--text)]" : "text-[var(--text-muted)]"}
        `
      }
    >
      {children}
    </NavLink>
  );
};
