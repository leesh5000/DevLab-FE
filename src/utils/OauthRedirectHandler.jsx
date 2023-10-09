import client from "../lib/client.jsx";
import {useNavigate} from "react-router-dom";

const OauthRedirectHandler = () => {

  const baseRedirectUri = import.meta.env.VITE_BASE_REDIRECT_URI;
  const callbackURI = window.location.href.split("?")[0];
  const navigate = useNavigate();

  const requestBody = {
    oauthType: callbackURI.substring(baseRedirectUri.length),
    authorizationCode: new URL(window.location.href).searchParams.get("code")
  }

  const callOauthLoginAPI = async () => {
    try {
      await client.post("/auth/oauth-login", {
        oauth_type: requestBody.oauthType,
        authorization_code: requestBody.authorizationCode
      })
    } catch (e) {
      alert("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      console.log(e);
      navigate("/");
    }
  }

  callOauthLoginAPI().then(
    navigate("/")
  );

}

export default OauthRedirectHandler;