"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";

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

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Profile Picture
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Phone Number
            </th>

            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Birthdate
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Joining Date
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Active Status
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
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
              <td className="px-6 py-4 ">{user.phone_number}</td>

              <td className="px-6 py-4 ">{user.birthdate}</td>
              <td className="px-6 py-4">{user.joining_date}</td>
              <td
                className={`px-6 py-4 rounded whitespace-nowrap ${
                  user.active_status ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.active_status ? "Active" : "Inactive"}
              </td>
              <td className=" px-6 py-4">
                <div className="flex justify-center items-center gap-2">
                  <RxUpdate className="text-green-400 h-5 w-5" />
                  <MdDelete className=" text-red-700 h-5 w-5" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
