"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://tasks.vitasoftsolutions.com/userdata/"
        );
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error Fetching Data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://tasks.vitasoftsolutions.com/userdata/${id}`);
      // Filter out the deleted user from the users array
      setUsers(users.filter((user) => user.id !== id));
      toast.success("Delete Successful");
    } catch (error) {
      console.error("Error Deleting User:", error);
      toast.error("Something went wrong during Delete");
    }
  };

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="flex justify-between mb-4 p-1">
        <h1 className="text-2xl font-bold ">User List</h1>
        <Link
          href="/create-user"
          className="flex items-center gap-2 text-2xl font-bold hover:bg-slate-200 rounded p-1"
        >
          Create User
          <IoCreateOutline />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile Picture
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Birthdate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joining Date
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4">
                  <img
                    src={user.profile_picture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-3 py-4 ">{user.name}</td>
                <td className="px-3 py-4 ">{user.phone_number}</td>
                <td className="px-3 py-4 ">{user.birthdate}</td>
                <td className="px-6 py-4">{user.joining_date}</td>
                <td
                  className={`px-3 py-4 rounded whitespace-nowrap ${
                    user.active_status ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.active_status ? "Active" : "Inactive"}
                </td>
                <td className="px-3 py-4">
                  <div className="flex justify-center items-center gap-2">
                    <RxUpdate className="text-green-400 h-5 w-5" />
                    <MdDelete
                      className="text-red-700 h-5 w-5 cursor-pointer"
                      onClick={() => handleDeleteUser(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
