import Link from "next/link";

function List() {
  return (
    <>
      <li>
        <Link
          href="/sign-in"
          className="block m-1 lg:inline-block lg:mt-0 bg-primary-200 hover:text-primary-base p-1 rounded-lg min-w-[90px] text-center sm:hidden"
        >
          {"Login"}
        </Link>
      </li>
      <li>
        <Link
          href="/sign-up"
          className="block m-1 lg:inline-block lg:mt-0 bg-primary-200 hover:text-primary-base p-1 rounded-lg min-w-[90px] text-center sm:hidden"
        >
          {"Registro"}
        </Link>
      </li>
    </>
  );
}
export default function LoginLinks({
  orientation,
}: {
  orientation: "horizontal" | "vertical";
}) {
  if (orientation !== "horizontal") return <List />;

  return (
    <ul
      className={`menu ${
        orientation === "horizontal" ? "menu-horizontal" : "p-4 w-fit"
      } text-primary-base`}
    >
      <List />
    </ul>
  );
}
