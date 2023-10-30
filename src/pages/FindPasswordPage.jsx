import {SecurityCheck} from "../components/SecurityCheck.jsx";
import {PasswordChange} from "../components/PasswordChange.jsx";
import {useSelector} from "react-redux";

export const FindPasswordPage = () => {

  const security = useSelector((state) => state.security);

  return (
    security.securityCheck ?
      <PasswordChange/> :
      <SecurityCheck/>
  );
}
