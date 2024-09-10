import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted py-6 border-t">
      <div className="container flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
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
