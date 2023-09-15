const Header = () => {
  return (
    <div className="h-36 w-auto flex justify-between items-center border-gray-100 border-2">
      <h1 className="text-3xl mr-2">
        DEVLAB
      </h1>
      <div className="">
        <button className="rounded-none border-1 p-1.5 border-slate-700 text-zinc-700 mr-4">
          로그인
        </button>
        <button className="rounded-none border-1 p-1.5 border-slate-700 text-zinc-700">
          회원가입
        </button>
      </div>
    </div>
  )
}

export default Header;
