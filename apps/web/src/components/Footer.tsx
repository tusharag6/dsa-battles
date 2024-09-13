import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted py-6 border-t">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
          &copy; 2024 DSA League. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <Link to="#" className="text-sm hover:underline">
            Terms of Service
          </Link>
          <Link to="#" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link to="#" className="text-sm hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
