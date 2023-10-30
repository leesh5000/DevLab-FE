import {SecurityCheck} from "../components/SecurityCheck.jsx";
import {PasswordChange} from "../components/PasswordChange.jsx";
import {useSelector} from "react-redux";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";
import {Footer} from "../components/Footer.jsx";

export const FindPasswordPage = () => {

  const security = useSelector((state) => state.security);

  return (
    <>
      <Header/>
      <Navbar/>
      {
        security.securityCheck ?
          <PasswordChange/> :
          <SecurityCheck/>
      }
      <Footer/>
    </>
  );
}
