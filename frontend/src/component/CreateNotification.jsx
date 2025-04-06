import React from "react";

const CreateNotification = () => {
  return (
    <>
      <form action="" className="w-[70vw] mx-auto">
        <h1 className="text-center text-3xl font-bold my-3">
          Create a Notification
        </h1>

        <input
          type="text"
          placeholder="title"
          className="border-2 border-gray-200"
          required
        />
        <input type="file" placeholder="Upload pdf" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateNotification;
