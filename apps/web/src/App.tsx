import { cn } from "@repo/ui/lib/utils";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className={cn("antialiased")}>
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
