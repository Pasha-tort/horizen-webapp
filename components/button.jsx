import cn from "classnames";

const cnButton = (disabled) => cn("border-solid", "border-2", "border-sky-800", "bg-sky-300", disabled ? undefined : "hover:bg-sky-500", "transition-all", "pt-1", "pb-1", "px-2");

export const Button = ({text, handler, disabled}) => {
  return <button disabled={disabled} onClick={handler} className={cnButton(disabled)}>
    {text}
  </button>
}