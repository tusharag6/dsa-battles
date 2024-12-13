import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-3 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-sm font-bold">CodeAscend</span>
          </Link>
          <p className="text-xs text-muted-foreground">
            &copy; 2024 All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end gap-4">
          <Link
            to="/about"
            className="text-xs hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="/terms"
            className="text-xs hover:text-primary transition-colors"
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            className="text-xs hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link
            to="/contact"
            className="text-xs hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
