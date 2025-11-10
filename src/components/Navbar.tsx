import { NavLink } from "react-router-dom";

function Navbar() {

    const linkBase = "px-3 py-2 rounded text-sm font-medium hover:bg-gray-100 transition";
    const active ="bg-gray-200 text-gray-900 font-semibold";

    return ( 

    <nav className="flex justify-center items-center gap-4 pb-4">
      <NavLink
        to="/"
        className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
      >
        Home
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
      >
        Login
      </NavLink>
    </nav>
  );

}

export default Navbar;