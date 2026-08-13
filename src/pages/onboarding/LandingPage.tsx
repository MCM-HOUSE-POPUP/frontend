import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 items-center justify-center">
        <h1 className="font-dm-serif text-center text-4xl leading-[1.7]">
          MCM HOUSE
          <br />
          POP-UP
        </h1>
      </div>

      <Link
        to="/home"
        className="mb-5 self-center px-6 py-5 text-sm font-medium text-[#8A8A86]"
      >
        TAP TO ENTER
      </Link>
    </main>
  );
}