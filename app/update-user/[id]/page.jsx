"use client";
import react, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import DatePicker from "react-datepicker";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = ({ params }) => {
  const [user, setUser] = useState(null); // Initialize user state with null
  const { handleSubmit, reset, register } = useForm();
  const [profilePicture, setProfilePicture] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [description, setDescription] = useState("");
  const [activeStatus, setActiveStatus] = useState(false);
  const id = params.id;
  console.log("id rcv", id);

  const onDrop = (acceptedFiles) => setProfilePicture(acceptedFiles[0]);
  console.log("activeStatus", activeStatus);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://tasks.vitasoftsolutions.com/userdata/${id}/`
        );
        const data = await response.json();
        console.log(data);
        setUser(data);
        // toast.success("Delete Successful");

        if (!startDate) {
          setStartDate(new Date(data.birthdate));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // toast.error("Something went wrong during Delete");
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateUser = async (updatedData) => {
    try {
      updatedData.birthdate = startDate.toISOString().split("T")[0];
      const response = await axios.put(
        `https://tasks.vitasoftsolutions.com/userdata/${id}/`,
        updatedData
      );
      console.log("Updated user data:", response.data);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error occurred while updating user.");
    }
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit(handleUpdateUser)}
        className="p-16 bg-white rounded-md shadow-md"
      >
        <ToastContainer />
        <h1
          className="mb-10 font-bold text-2xl flex justify-center
         items-center "
        >
          Update User
        </h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            className="mt-1 p-2 border rounded-md w-full"
            {...register("name")}
            type="text"
            defaultValue={user?.name}
            placeholder="Name"
            required
          />
        </div>

        <div className="flex justify-around gap-20 items-center mb-4">
          <div className="overflow-hidden">
            <img
              // src={user?.profile_picture}
              src={`${user?.profile_picture}?timestamp=${new Date().getTime()}`}
              alt=""
              className="h-20 w-20 rounded-full"
            />
          </div>
          <div>
            <label
              htmlFor="profile_picture"
              className="block text-sm font-medium text-gray-700"
            >
              Update Picture
            </label>
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  className="mt-1 py-6 px-12 bg-slate-100 text-center border rounded-md cursor-pointer"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <p>
                    {profilePicture
                      ? profilePicture?.name
                      : "Drag 'n' drop your profile picture here, or click to select file"}
                  </p>
                </div>
              )}
            </Dropzone>
          </div>
        </div>

        <div className="flex justify-start gap-36">
          <div className="mb-4">
            <label
              htmlFor="birthdate"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <DatePicker
              className="mt-1 p-2 border rounded-md w-full"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              defaultValue={user?.birthdate}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              className="mt-1 p-2 border rounded-md w-full"
              {...register("phone_number")}
              type="tel"
              defaultValue={user?.phone_number}
              placeholder="Phone Number"
              required
            />
          </div>

          {/* Active Status */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="active_status"
              {...register("active_status")}
              checked={activeStatus} // Set checked attribute based on activeStatus state
              onChange={(e) => setActiveStatus(e.target.checked)} // Update activeStatus state
              className="mr-2"
            />
            <label
              htmlFor="active_status"
              className="block font-medium text-gray-700"
            >
              Status
            </label>
          </div>
        </div>

        <div className="mb-4">
          {/* <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label> */}
          {/* <div className="block text-sm font-medium text-gray-700">
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
              required
            />
          </div> */}
        </div>
        <button
          className="bg-indigo-500 text-white p-2 rounded-md w-full"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Page;
