import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <header className="px-4 md:px-6 py-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="CodeAscend Logo"
                className="h-full w-auto"
              />
            </div>
            {/* <span className="text-xl font-bold">CodeAscend</span> */}
          </Link>
          <Button asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 mx-auto  flex items-center justify-center overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl">
          {/* Text Section */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Code. Compete. Ascend.
            </h1>
            <p className="text-lg text-muted-foreground">
              Level up your coding skills through interactive challenges,
              tournaments, and real-time coding battles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary/0 text-white"
              >
                <Link to="/game/modes">Start Your Ascent</Link>
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative flex justify-center">
            <img
              src="/hero.jpeg"
              width={500}
              height={500}
              alt="Coders competing in CodeAscend challenges"
              className="relative z-10 rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
