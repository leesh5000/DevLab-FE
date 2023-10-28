import {useState} from "react";
import {SecurityCheck} from "../components/SecurityCheck.jsx";
import {PasswordChange} from "../components/PasswordChange.jsx";

export const FindPasswordPage = () => {

  const [securityCheck, setSecurityCheck] = useState(false);

  return (
    securityCheck ?
      <PasswordChange/> :
      <SecurityCheck securityCheck={securityCheck} setSecurityCheck={setSecurityCheck}/>
  );
}
