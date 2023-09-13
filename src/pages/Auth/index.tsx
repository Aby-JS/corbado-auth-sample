import "@corbado/webcomponent/pkg/auth_cui.css";
import "@corbado/webcomponent";

import React from "react";

const Login: React.FC = () => {
  return (
    <div>
      <corbado-auth project-id="pro-503401103218055321" conditional="yes">
        <input
          name="username"
          id="corbado-username"
          required
          autoComplete="webauthn"
        />
      </corbado-auth>
    </div>
  );
};

export default Login;
