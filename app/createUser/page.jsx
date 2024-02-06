"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import DatePicker from "react-datepicker";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import axios from "axios";

const CreateUser = () => {
  const { handleSubmit, reset, register } = useForm();
  const [profilePicture, setProfilePicture] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [activeStatus, setActiveStatus] = useState(false);

  const onDrop = (acceptedFiles) => setProfilePicture(acceptedFiles[0]);
  console.log("activeStatus", activeStatus);

  const handleCreateUser = (data) => {
    const inputDate = new Date(startDate);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("profile_picture", profilePicture);
    formData.append("description", description);
    formData.append("birthdate", formattedDate);
    formData.append("active_status", activeStatus);
    formData.append("phone_number", data.phone_number);

    axios
      .post("https://tasks.vitasoftsolutions.com/userdata/", formData)

      .then((res) => {
        console.log("Data--->", data);
        reset();
        setProfilePicture(null);
        setDescription("");
        setActiveStatus(false);
        toast.success("User Created successfully");
      })
      .catch((error) => {
        toast.error(`Something went wrong!`);
      });
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit(handleCreateUser)}
        className="p-16 bg-white rounded-md shadow-md"
      >
        <h1
          className="mb-10 font-bold text-2xl flex justify-center
         items-center "
        >
          Create User
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
            placeholder="Name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="profile_picture"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                className="mt-1 py-6 bg-slate-100 text-center border rounded-md cursor-pointer"
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
              placeholder="Phone Number"
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="block text-sm font-medium text-gray-700">
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          </div>
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

export default CreateUser;
