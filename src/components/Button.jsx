const Button = ({name, onClick}) => {

  return (
    <button className="border-1 p-1.5 border-slate-700" onClick={onClick}>
      {name}
    </button>
  )
}

export default Button;