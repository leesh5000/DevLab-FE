import {useEffect, useState} from "react";

const PasswordInputBox = ({password, setPassword, isValid, setIsValid, userInputValidator}) => {

  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {

    if (password.length === 0) {
      setIsValid(false);
      return;
    }

    if (password === passwordConfirm) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

  }, [password, passwordConfirm]);

  const onChange = (e) => {
    setPassword(e.target.value);
  }

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  }

  return (
    <div id="password-box" className="flex h-32">
      <div className="w-1/6 mr-12">
        비밀번호
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col mb-1.5">
          <div className="flex mb-1.5 items-center">
            <input type="password"
                   className="w-1/2 h-8 border-1 border-gray-400 p-1.5 text-gray-600"
                   onChange={onChange}
            />
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
          <input type="password"
                 className="w-1/2 h-8 border-1 border-gray-400 p-1.5 text-gray-600"
                 onChange={onChangePasswordConfirm}
          />
        </div>
        <div className="text-sm text-gray-400">
          <p>
            비밀번호는 6~30자로 되어야합니다.
          </p>
          {
            password.length !== 0 && !userInputValidator.password.test(password) ?
              <p className="text-sm text-red-600">
                글자 수를 확인해주세요.
              </p> :
              null
          }
          {
            passwordConfirm.length === 0 || !userInputValidator.password.test(password) ?
              null : ((passwordConfirm === password) ?
              null :
              <p className="text-sm text-red-600">
                비밀번호가 일치하지 않습니다.
              </p>)
          }
        </div>
      </div>
    </div>
  );
}

export default PasswordInputBox;