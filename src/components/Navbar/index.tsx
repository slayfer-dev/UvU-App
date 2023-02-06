import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Navbar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="drawer">
      <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
      <section role="drawer-navbar" className="drawer-content flex flex-col">
        <div role="horizontal-navbar" className="w-full navbar flex min-h-fit">
          <div className="flex items-center justify-center lg:hidden m-auto">
            <label htmlFor="menu-drawer" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex gap-6 items-center px-2 mx-2 w-full m-auto z-20">
            <span className="font-semibold text-xl tracking-tight relative lg:static top-0 left-0 w-full text-center">
              <Link
                href="/"
                className="text-secondary-base no-underline flex gap-2 items-center justify-center"
              >
                <div className="bg-primary-600 text-primary-base rounded-full w-16 h-16 flex items-center justify-center text-2xl">
                  {"UvU"}
                </div>
                <p className="text-slate-500 text-8xl font-bold -mt-2">
                  {"APP"}
                </p>
              </Link>
            </span>
            <div className="hidden lg:flex mr-auto justify-between w-full">
              <NavLinks orientation={"horizontal"} />
            </div>
          </div>
        </div>
        <main role={"main"} className={`mt-0 md:mt-6 h-[calc(100vh-8rem)]`}>
          {children}
        </main>
      </section>
      <section
        role={"drawer-sidebar"}
        className="drawer-side flex flex-row-reverse"
      >
        <label htmlFor="menu-drawer" className="drawer-overlay"></label>
        <NavLinks orientation={"vertical"} />
      </section>
    </nav>
  );
}
