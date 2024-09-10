import { Button } from "@repo/ui";
import React from "react";
import { Link } from "react-router-dom";

export default function Result() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">DSA Battle Results</h1>
      </header>
      <main className="flex-1 bg-background px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground font-bold text-2xl">
                  W
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Victory!</h2>
                  <p className="text-muted-foreground">Final Score: 100 - 80</p>
                </div>
              </div>
              <div className="bg-muted rounded-full px-4 py-2 text-muted-foreground shadow-md">
                Opponent: Team Alpha
              </div>
            </div>
          </div>
          <div className="rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Detailed Breakdown</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="">
                <h3 className="text-lg font-medium mb-2">Your Performance</h3>
                <ul className="space-y-2 bg-card p-6">
                  <li>
                    <span className="font-medium">Questions Solved:</span> 100
                  </li>
                  <li>
                    <span className="font-medium">Time Taken:</span> 45 minutes
                  </li>
                  <li>
                    <span className="font-medium">Easy Questions Solved:</span>{" "}
                    50
                  </li>
                  <li>
                    <span className="font-medium">
                      Medium Questions Solved:
                    </span>{" "}
                    30
                  </li>
                  <li>
                    <span className="font-medium">Hard Questions Solved:</span>{" "}
                    20
                  </li>
                  <li>
                    <span className="font-medium">Accuracy:</span> 90%
                  </li>
                  <li>
                    <span className="font-medium">Efficiency:</span> 85%
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Opponent's Performance
                </h3>
                <ul className="space-y-2 bg-card p-6">
                  <li>
                    <span className="font-medium">Questions Solved:</span> 80
                  </li>
                  <li>
                    <span className="font-medium">Time Taken:</span> 50 minutes
                  </li>
                  <li>
                    <span className="font-medium">Easy Questions Solved:</span>{" "}
                    40
                  </li>
                  <li>
                    <span className="font-medium">
                      Medium Questions Solved:
                    </span>{" "}
                    25
                  </li>
                  <li>
                    <span className="font-medium">Hard Questions Solved:</span>{" "}
                    15
                  </li>
                  <li>
                    <span className="font-medium">Accuracy:</span> 85%
                  </li>
                  <li>
                    <span className="font-medium">Efficiency:</span> 80%
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button className="shadow-md hover:shadow-lg transition-shadow">
              Rematch
            </Button>
            <Button
              variant="outline"
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              Share on Social Media
            </Button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:underline transition-colors"
            >
              <HomeIcon className="w-5 h-5" />
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function HomeIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
