
import { AuthInfo } from "@/utils/AuthInfo";
import { createContext } from "react";

const AuthContext = createContext<AuthInfo | null>(null);

export default AuthContext;