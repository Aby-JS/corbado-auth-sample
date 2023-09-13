import React, { ReactNode } from "react";

import { Navigate } from "react-router-dom";

export const Protected = ({
  isSignedIn,
  children,
}: {
  isSignedIn: boolean;
  children: ReactNode;
}) => {
  return !isSignedIn ? <Navigate to="/login" replace /> : <>{children}</>;
};
export default Protected;
