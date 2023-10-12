export const EmailInputBox = () => {
  return (
    <div id="email-box" className="flex">
      <div className="w-1/6 mr-12">
        이메일 인증
      </div>
      <div className="flex-1 flex flex-col justify-centers">
        <div className="flex flex-rows items-center mb-1.5">
          <input type="text" className="w-1/4 h-8 border-1 border-gray-400 p-1.5"/>
          <div className="mx-2">
                  <span>
                    @
                  </span>
          </div>
          <input type="text" className="w-1/4 h-8 border-1 p-1.5 border-gray-400 mr-4"/>
          <select className="h-8 border-1 border-gray-400">
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="gmail.com">gmail.com</option>
            <option value="nate.com">nate.com</option>
            <option value="">직접 입력</option>
          </select>
        </div>
        <div className="mb-8">
          <div className="text-sm text-blue-700">
            이메일은 입력하지 않아도 가입이 가능하며, 추후 내정보 페이지에서 입력할 수 있습니다.
          </div>
          <div className="text-sm text-gray-400">
            이메일은 아이디/비밀번호 찾기에 사용됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}
