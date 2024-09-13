import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="px-4 md:px-6 py-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="#" className="flex items-center gap-2">
            <TrophyIcon className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">DSA League</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link to="#" className="text-sm font-medium hover:underline">
              1v1
            </Link>
            <Link to="#" className="text-sm font-medium hover:underline">
              League
            </Link>
          </nav>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 container mx-auto flex items-center justify-center py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Welcome to the DSA League - Compete and Climb the Ranks
            </h1>
            <p className="text-muted-foreground text-lg">
              Compete in thrilling matches and climb the ranks to become the
              ultimate champion.
            </p>
            <div className="flex justify-center md:justify-start">
              <Button size={"lg"} asChild>
                <Link to="/match">Start a Match</Link>
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative flex justify-center">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary rounded-full blur-[100px] opacity-50" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary rounded-full blur-[100px] opacity-50" />
            <img
              src="./hero-image.jpeg"
              width={600}
              height={600}
              alt="DSA League"
              className="relative z-10 rounded-2xl shadow-lg"
              style={{ aspectRatio: "600/600", objectFit: "cover" }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function TrophyIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
