import Navbar from "../Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen flex flex-col min-h-screen max-h-screen content-center">
      <Navbar>
        {children}
        <div className="footer" />
      </Navbar>
    </div>
  );
}
