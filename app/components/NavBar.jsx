"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";

const NavBar = () => {
  return (
    <Navbar className="bg-blue-400 py-5 shadow-lg ">
      <Link
        href="/"
        className="text-xl right-[2px] md:right-[5px] lg:right-[10px] font-bold"
      >
        User Management
      </Link>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://tasks.vitasoftsolutions.com/media/profile_pictures/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Taufiqul Islam</span>
            {/* <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span> */}
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/create-user">Create User</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
