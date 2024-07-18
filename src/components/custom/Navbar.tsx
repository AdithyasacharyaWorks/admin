"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2 " />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 px-1", className)}
    >
      <Menu setActive={setActive} >
        <Link href={"/"}>Home</Link>
        <MenuItem setActive={setActive} active={active} item="Menu">
          <div className="flex flex-col space-y-4 text-sm ">
            <HoveredLink href="/menu/add">Add Menu</HoveredLink>
            <HoveredLink href="/menu">Menu List</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Category">
          <div className="flex flex-col space-y-4 text-sm ">
            <HoveredLink href="/category/add">Add Category</HoveredLink>
            <HoveredLink href="/category">Category List</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Table">
          <div className="flex flex-col space-y-4 text-sm ">
            <HoveredLink href="/category/add">Add Table</HoveredLink>
            <HoveredLink href="/category/list">Manage Table</HoveredLink>
          </div>
        </MenuItem>
        <Link href="/order">Order</Link>
        <Link href={"profile"}>Profile</Link>
      </Menu>
    </div>
  );
}

