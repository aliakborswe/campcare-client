
import AuthContext from "@/providers/AuthContext";
import { AuthInfo } from "@/utils/AuthInfo";
import { useContext } from "react";


const useAuth = () => {
    const context = useContext(AuthContext) as any as AuthInfo;
    return context
};

export default useAuth;