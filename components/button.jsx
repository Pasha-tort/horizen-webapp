
const cnButton = "border-solid border-2 border-sky-800 bg-sky-300 pt-1 pb-1 px-2";

export const Button = ({text, handler}) => {
  return <button onClick={handler} className={cnButton}>
    {text}
  </button>
}