import React from "react";

const Header = () => {
  // Main navigation links (usually on the left/center)
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Product Details", href: "/productdetails" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="text-gray-600 body-font shadow-sm">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* Logo */}
        <a
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl font-bold">StoreFront</span>
        </a>

        {/* Navigation */}
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mr-5 hover:text-purple-600 transition-colors cursor-pointer font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons Group */}
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          {/* Cart Button */}
          <a
            href="/cart"
            className="inline-flex items-center text-gray-700 bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
          >
            Cart
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </a>

          {/* Login Button */}
          <a
            href="/login"
            className="text-gray-700 hover:text-purple-600 px-3 font-medium transition-colors"
          >
            Log In
          </a>

          {/* Signup Button */}
          <a
            href="/signup"
            className="inline-flex items-center bg-purple-600 text-white border-0 py-1 px-4 focus:outline-none hover:bg-purple-700 rounded text-base transition-colors"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
