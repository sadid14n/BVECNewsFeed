import React from "react";
import CreateNotification from "../../component/CreateNotification";
import AdminMenu from "../../component/Authorities/AdminMenu";
import Layout from "../../component/Layout";

const AuthCreateNotification = () => {
  return (
    <>
      <Layout>
        <div className="flex min-h-screen">
          {/* Left side menu */}
          <AdminMenu />

          {/* Right side content */}
          <div className="flex-1 bg-gray-100 p-8">
            <CreateNotification />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AuthCreateNotification;
