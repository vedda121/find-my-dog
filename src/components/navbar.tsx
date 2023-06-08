interface NavbarProps {
  isAuthenticated: boolean;
  handleLogout: React.MouseEventHandler<HTMLButtonElement>;
  sideBarComponent: JSX.Element;
}

function Navbar({ isAuthenticated, handleLogout, sideBarComponent }: NavbarProps) {
  return (
    <div className="drawer sticky top-0 z-50">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar w-full bg-[#f9eedc]">
          <div className="flex-none md:hidden">
            <label htmlFor="drawer" className="btn-ghost btn-square btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-xl font-bold text-[#300d38]">Find me a Dog</div>
          <div className="flex-none">
            {isAuthenticated && (
              <button
                type="button"
                className="mr-4 rounded border bg-[#300d38] py-2 pl-3 pr-2 font-bold text-white hover:bg-[#890075]"
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-logout"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                  <path d="M7 12h14l-3 -3m0 6l3 -3" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="drawer-side md:hidden">
        <label htmlFor="drawer" className="drawer-overlay" />
        {sideBarComponent}
      </div>
    </div>
  );
}

export default Navbar;
