import React from "react";
import Login from "./Login";
import RefreshToken from "./RefreshToken";
import RefreshRefreshToken from "./RefreshRefreshToken";
import Logout from "./Logout";
import ChangePassword from "./ChangePassword";
import VerifyPassword from "./VerifyPassword";
import CheckPermission from "./CheckPermission";

const Security = () => {
  return (
    <div>
      <section>
        <Login />
      </section>

      <section>
        <RefreshToken />
      </section>

      <section>
        <RefreshRefreshToken />
      </section>

      <section>
        <Logout />
      </section>

      <section>
        <ChangePassword />
      </section>

      <section>
        <VerifyPassword />
      </section>

      <section>
        <CheckPermission />
      </section>
    </div>
  );
};

export default Security;
