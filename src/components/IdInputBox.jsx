import {useDispatch, useSelector} from "react-redux";
import {setId} from "../actions/UserRegisterActions.jsx";

const IdInputBox = () => {

  const dispatch = useDispatch();
  const userInput = useSelector(state => state.register);

  const onIdHandler = (e) => {
    dispatch(setId(e.target.value));
  }

  return (
    <div id="id-box" className="flex mb-8">
      <div className="w-40">
        로그인 아이디
      </div>
      <div>
        <input type="text" className="h-8 w-60 border-1 border-gray-400 p-1.5" onChange={onIdHandler}/>
        <div className="my-1">
          <p className="text-sm text-gray-400">
            아이디는 영어, 숫자로 된 4~20자리여야 합니다.
          </p>
          {
            userInput.isDuplicatedId ?
              <p className="text-sm text-red-600">
                이미 존재하는 아이디입니다.
              </p> :
              null
          }
        </div>
      </div>
    </div>
  );
}

export default IdInputBox;
