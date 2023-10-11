export const EmailInputBox = () => {
  return (
    <div id="email-box" className="flex">
      <div className="w-1/6 mr-12">
        이메일 인증
      </div>
      <div className="flex-1 flex flex-col justify-centers">
        <div className="flex flex-rows items-center mb-1.5">
          <input type="text" className="w-1/4 h-8 border-1 border-gray-400 p-1.5 text-gray-600"/>
          <div className="mx-2">
                  <span>
                    @
                  </span>
          </div>
          <input type="text" className="w-1/4 h-8 border-1 p-1.5 border-gray-400 text-gray-600 mr-4"/>
          <div className="group relative h-8 w-1/4 bg-amber-200">
            <button type="button"
                    className="h-full w-full border-1 border-gray-300 flex items-center justify-around bg-gray-200">
              이메일 선택
              <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                   strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div id="dropdown-menu"
                 className="border-1 hidden border-t-0 border-gray-300 w-full absolute bg-white opacity-0 group-hover:opacity-100 group-hover:block">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">gmail.com</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">naver.com</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">daum.net</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">hanmail.net</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">직접 입력</a>
            </div>
          </div>
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
