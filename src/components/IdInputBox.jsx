import client from "../lib/client.jsx";
import {useEffect, useState} from "react";

const IdInputBox = ({id, setId, isValid, setIsValid, userInputValidator}) => {

  const [isDuplicated, setIsDuplicated] = useState(false);

  useEffect(() => {
    validateId(id);
  }, [id]);

  function validateId(id) {

    if (!userInputValidator.id.test(id)) {
      setIsValid(false);
      setIsDuplicated(false);
      return;
    }

    const checkDuplicatedId = async (id) => {
      return await client.get("/auth/validation/id", {params: {id}})
        .then(() => {
          return true;
        }).catch((e) => {
          if (e.response.status === 409) {
            return false;
          }
        });
    };

    checkDuplicatedId(id)
      .then((result) => {
        if (result) {
          setIsValid(true);
          setIsDuplicated(false);
        } else {
          setIsValid(false);
          setIsDuplicated(true);
        }
      });
  }

  const onChange = (e) => {
    setId(e.target.value);
  }

  const onBlur = (e) => {
    validateId(e.target.value);
  }

  const onFocus = () => {
    setIsValid(false);
  }

  return (
    <div id="id-box" className="h-24 flex">
      <div className="w-1/6 mr-12">
        로그인 아이디
      </div>
      <div className="flex-1">
        <div className="flex mb-1.5 items-center">
          <input type="text"
                 className="w-1/2 h-8 border-1 border-gray-400 p-1.5 text-gray-600"
                 onChange={onChange}
                 onFocus={onFocus}
                 onBlur={onBlur}/>
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
        <div className="text-sm text-gray-400 mb-6">
          <p>
            아이디는 4~20자 이내로 되어야합니다.
          </p>
          {
            id.length !== 0 && !userInputValidator.id.test(id) ?
              <p className="text-sm text-red-600">
                글자 수를 확인해주세요.
              </p> :
              null
          }
          {
            isDuplicated ?
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