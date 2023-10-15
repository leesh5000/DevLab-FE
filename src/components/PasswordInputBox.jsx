import {useDispatch, useSelector} from "react-redux";
import {setPassword, setPasswordConfirm} from "../actions/UserRegisterActions.js";

const PasswordInputBox = () => {

  const dispatch = useDispatch();
  const userInput = useSelector(state => state.userRegisterReducer);

  const onPasswordHandler = (e) => {
    dispatch(setPassword(e.target.value));
  }

  const onPasswordConfirmHandler = (e) => {
    dispatch(setPasswordConfirm(e.target.value));
  }

  return (
    <div id="password-box" className="flex mb-8">
      <div className="w-40">
        비밀번호
      </div>
      <div>
        <input type="password" className="h-8 w-60 border-1 border-gray-400 p-1.5 mb-2 block"
               onChange={onPasswordHandler}/>
        <input type="password" className="h-8 w-60 border-1 border-gray-400 p-1.5 mb-2 block"
               onChange={onPasswordConfirmHandler}/>
        <div className="my-1">
          <p className="text-sm text-gray-400">
            비밀번호는 6~30자리로 되어야합니다.
          </p>
          {
            !userInput.password || userInput.isPasswordConfirmed ?
              null :
              <p className="text-sm text-red-600">
                비밀번호가 일치하지 않습니다.
              </p>
          }
        </div>
      </div>
    </div>
  );
}

export default PasswordInputBox;
