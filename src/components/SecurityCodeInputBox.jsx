import {useDispatch, useSelector} from "react-redux";
import {setNickname} from "../actions/UserRegisterActions.js";

export const SecurityCodeInputBox = () => {

  const dispatch = useDispatch();
  const userInput = useSelector(state => state.userRegisterReducer);

  const onNicknameHandler = (e) => {
    dispatch(setNickname(e.target.value));
  }

  return (
    <div id="id-box" className="flex mb-8">
      <div className="w-40">
        보안코드 발급 이메일
      </div>
      <div>
        <input type="text" className="h-8 w-40 border-1 border-gray-400 p-1.5" onChange={onNicknameHandler}/>
        <div className="my-1">
          <p className="text-sm text-blue-700">
            보안코드를 발급하지 않아도 회원가입이 가능하며, 추후 내정보 페이지에서 발급받을 수 있습니다.
          </p>
          {
            userInput.isDuplicatedNickname ?
              <p className="text-sm text-red-600">
                이미 존재하는 닉네임입니다.
              </p> :
              null
          }
        </div>
      </div>
    </div>
  );
}
