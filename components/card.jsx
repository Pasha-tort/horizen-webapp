import cn from "classnames";
import { getTime } from '@/helpers/getTime';

const cnCard = (status) => cn(
  "w-full", 
  "flex", 
  "flex-col", 
  "border-solid", 
  "border-2", 
  "rounded", 
  status === "archived" ? "bg-slate-100" : undefined
);
const cnHeader = "flex justify-between border-solid border-b-2";
const cnDate = "p-1";
const cnStatus = (status) => cn(
  "flex", 
  "justify-center", 
  "items-center", 
  "border-solid", 
  "border-l-2", 
  "p-1", 
  "min-w-20",
  status === "processing" ? ["bg-orange-300", "hover:bg-orange-500", "transition-all"] : undefined
);
const cnDesc = "overflow-hidden text-ellipsis min-w-16 p-2";
const borderStyle = (status) => ({borderColor: status === "archived" ? "grey" : "black"});

export const Card = ({status, date, desc, taskId, handlerCompleteTask}) => {
  return <li className={cnCard(status)} style={borderStyle(status)}>
    <div className={cnHeader} style={borderStyle(status)}>
      <div className={cnDate}>
        {getTime(date)}
      </div>
      {
        status === "archived" ?
          (<div className={cnStatus(status)} style={borderStyle(status)}>
            В архиве
          </div>)
          :
          (
            <button
              className={cnStatus(status)} 
              style={borderStyle(status)} 
              onClick={() => handlerCompleteTask(taskId)}
            >
              Готово
            </button>
          )
      }
    </div>
    <div className={cnDesc}>
      {desc}
    </div>
  </li>
}