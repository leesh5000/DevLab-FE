export const CertInputBox = () => {
  return (
    <div id="cert-box" className="flex">
      <div className="w-1/6 mr-12">
        인증번호 입력
      </div>
      <div className="w-1/4 flex items-center mb-1.5 border-1 border-gray-400 bg-gray-100">
        <input type="text" className="w-28 h-full border-r-1 border-gray-400 p-1.5 text-gray-600"/>
        <button className="w-8 m-auto">
          확인
        </button>
      </div>
      <button className="w-32 text-sm ml-8 border-1 border-gray-400 flex justify-center items-center">
        인증코드 받기
      </button>
    </div>
  );
}