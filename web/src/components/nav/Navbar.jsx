import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore()

  return (

    <nav className="relative bg-gray-900 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              command="--toggle"
              commandfor="mobile-menu"
              onClick={() => setOpen(!openProfile)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                data-slot="icon"
                aria-hidden="true"
                className="size-6 in-aria-expanded:hidden"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                data-slot="icon"
                aria-hidden="true"
                className="size-6 not-in-aria-expanded:hidden"
              >
                <path
                  d="M6 18 18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Logo and main nav */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
                className="h-8 w-auto"
              />
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to={'/'}
                  // aria-current="page"
                  className="rounded-md  px-3 py-2 text-sm font-medium text-white"
                >
                  Dashboard
                </Link>

              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <button onClick={() => setOpenProfile(!openProfile)} className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img
                  src={user?.picture || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
                  alt={user?.name}
                  onError={(e) => { e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'; }}
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </button>

              {/* Dropdown Menu */}
              {openProfile && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition">
                  <Link
                    to={"/profile"}
                    className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden"
                  >
                    {user?.name || "wtf"}
                  </Link>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-sm cursor-pointer text-gray-300 focus:bg-white/5 focus:outline-hidden"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      <div id="mobile-menu" className="block sm:hidden ">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <a
            href="#"
            aria-current="page"
            className="block rounded-md bg-gray-950/50 px-3 py-2 text-base font-medium text-white"
          >
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

