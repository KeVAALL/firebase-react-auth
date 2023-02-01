import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider() {
  return <div></div>;
}
