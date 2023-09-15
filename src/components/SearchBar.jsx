const SearchBar = () => {
  return (
    <div id="block" className="h-32 flex justify-center items-center border-1 border-gray-100">
      <form id="search-bar" className="w-7/12 flex flex-row rounded-lg border-slate-500 border-1">
        <div id="dropdown" className="w-1/6 h-10 border-slate-600 border-r-1"/>
        <div id="input" className="w-auto flex-auto h-10"/>
      </form>
    </div>
  )
}

export default SearchBar;
