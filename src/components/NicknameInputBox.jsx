import {useDispatch, useSelector} from "react-redux";
import {setNickname} from "../actions/UserRegisterActions.js";

const NicknameInputBox = () => {

  const dispatch = useDispatch();
  const userInput = useSelector(state => state.userRegisterReducer);

  const onNicknameHandler = (e) => {
    dispatch(setNickname(e.target.value));
  }

  return (
    <div className="flex">
      <div className="w-40">
        닉네임
      </div>
      <div>
        <input type="text" className="h-8 w-60 border-1 border-gray-400 p-1.5" onChange={onNicknameHandler}/>
        <div className="mt-1">
          <p className="text-sm text-gray-400">
            닉네임는 한글, 영어, 숫자로 된 2-9자리여야 합니다.
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

export default NicknameInputBox;
