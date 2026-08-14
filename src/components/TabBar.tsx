import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/home", label: "HOME", icon: "/icons/home.svg" },
  { to: "/map", label: "MAP", icon: "/icons/map.svg" },
  { to: "/saved", label: "SAVED", icon: "/icons/saved.svg" },
  { to: "/passport", label: "PASSPORT", icon: "/icons/passport.svg" },
];

export default function TabBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <nav className="max-w-[430px] mx-auto bg-white border-t border-gray-200 flex justify-around items-center h-16">
        {tabs.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] ${
                isActive ? "text-black font-semibold" : "text-gray-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={icon}
                  alt={label}
                  className="w-6 h-6"
                  style={{ filter: isActive ? "none" : "opacity(0.4)" }}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
