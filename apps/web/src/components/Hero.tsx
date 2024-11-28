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
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Solo Challenge
            </Link>
            <Link
              to="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Team Battles
            </Link>
            <Link
              to="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Leaderboard
            </Link>
          </nav>
          <Button asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 mx-auto  flex items-center justify-center overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center px-20">
          {/* Text Section */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Code. Compete. Conquer.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Transform your coding journey from ordinary to extraordinary.
              CodeAscend isn't just a platform—it's your digital arena where
              algorithms become your weapons and logic is your strategy.
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
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-primary rounded-full blur-[120px] opacity-30" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary rounded-full blur-[120px] opacity-30" />
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
