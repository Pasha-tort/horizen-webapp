import cn from "classnames";

const cnTa = (className) => cn("border-solid", "border-2", "min-h-20", "bg-slate-100", "p-1", className);

export const TextArea = ({
  value, 
  onChange, 
  className, 
  placeholder
}) => {
  return (
    <textarea 
      style={{borderColor: "grey"}}
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      className={cnTa(className)}
    />
  );
}