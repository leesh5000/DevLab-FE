import {useEffect, useState} from "react";
import client from "../lib/client.jsx";

const NicknameInputBox = ({nickname, setNickname, isValid, setIsValid}) => {

  const [isDuplicated, setIsDuplicated] = useState(false);

  useEffect(() => {

    validateNickname(nickname);

  }, [nickname]);

  function validateNickname(nickname) {
    if (nickname.length === 0 || (nickname.length < 4 || nickname.length > 20)) {
      setIsValid(false);
      setIsDuplicated(false);
      return;
    }

    const validateDuplicateNickname = async (nickname) => {
      try {
        await client.get("/auth/nickname-checks", {params: {nickname}})
          .then((response) => {
            setIsValid(true);
            setIsDuplicated(false);
          });
      } catch (e) {
        if (e.response.status === 409) {
          setIsValid(false);
          setIsDuplicated(true);
        }
      }
    };

    validateDuplicateNickname(nickname);
  }

  const onKeyUp = (e) => {
    setNickname(e.target.value);
  }

  const onBlur = (e) => {
    validateNickname(e.target.value);
  }

  const onFocus = () => {
    setIsValid(false);
  }

  return (
    <div id="nickname-box" className="flex h-24">
      <div className="w-1/6 mr-12">
        닉네임
      </div>
      <div className="flex-1">
        <div className="flex mb-1.5 items-center">
          <input type="text"
                 className="w-1/2 h-8 border-1 border-gray-400 p-1.5 text-gray-600"
                 onKeyUp={onKeyUp}
                 onBlur={onBlur}
                 onFocus={onFocus}/>
          {
            isValid ?
              <svg className="ml-4 h-7 w-7 text-green-500" width="22" height="22" viewBox="0 0 24 24"
                   strokeWidth="2" stroke="currentColor" fill="none"
                   strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <circle cx="12" cy="12" r="9"/>
                <path d="M9 12l2 2l4 -4"/>
              </svg> :
              null
          }
        </div>
        <div className="text-sm text-gray-400">
          <p>
            닉네임은 4~10자로 되어야합니다. (띄어쓰기는 불가능합니다.)
          </p>
          {
            nickname.length !== 0 && (nickname.length < 4 || nickname.length > 20) ?
              <p className="text-sm text-red-600">
                글자 수를 확인해주세요.
              </p> :
              null
          }
          {
            isDuplicated ?
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