import { createContext } from "react";

export const AuthContext = createContext({
  email: "",
  token: "",
  name: ""
});
