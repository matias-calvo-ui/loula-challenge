"use client";
import { useState } from "react";
import { NavItem } from "@/components/nav-item";

export default function MobileSidebar({ user_id }: { user_id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`lg:hidden fixed top-0 left-0 h-full bg-zinc-800 text-white z-10 ${
        isOpen ? "w-40" : "w-10"
      } transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <button
        className="absolute top-2 left-2 p-2 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? "X" : "->"}
      </button>
      {isOpen && (
        <nav className="pt-12">
          <NavItem href={`/dashboard/${user_id}`}>Requests Table</NavItem>
          <NavItem href={`/dashboard/${user_id}/wage-request`}>
            New Request
          </NavItem>
          <NavItem href={`/dashboard/${user_id}/wages`}>Wages</NavItem>
        </nav>
      )}
    </div>
  );
}
