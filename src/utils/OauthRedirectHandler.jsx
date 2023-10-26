import {useDispatch} from "react-redux";
import {oauthLogin} from "../actions/AuthActions.jsx";
import {useNavigate} from "react-router-dom";

const OauthRedirectHandler = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseRedirectUri = import.meta.env.VITE_BASE_REDIRECT_URI;
  const callbackURI = window.location.href.split("?")[0];

  const requestBody = {
    oauth_type: callbackURI.substring(baseRedirectUri.length),
    authorization_code: new URL(window.location.href).searchParams.get("code")
  }

  dispatch(oauthLogin(requestBody))
    .then(() => {
      navigate("/");
    })
    .catch((e) => {
      console.log(e);
      alert("일시적인 서버 오류입니다. 잠시 후 다시 시도해주세요.");
      navigate("/");
    });
}

export default OauthRedirectHandler;
