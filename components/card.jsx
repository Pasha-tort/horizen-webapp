import {api} from 'horizen-framework/frontend';

const cnCard = "flex flex-col border-solid border-2 rounded bg-slate-100";
const cnHeader = "flex border-solid border-2";
const cnDate = "p-1";
const cnStatus = "border-solid border-2";
const cnDesc = "min-w-16 p-2";
const borderStyle = {borderColor: "grey"};

export const Card = ({status, date, decs, taskId}) => {
  const handlerCompleteTask = async (taskId) => {
    await api.call("completeTask", {
      auth: false,
      params: {taskId},
    });
  };

  return <div className={cnCard} style={borderStyle}>
    <div className={cnHeader} style={borderStyle}>
      <div className={cnDate}>
        {date}
      </div>
      <div className={cnStatus} style={borderStyle} onClick={handlerCompleteTask}>
        {status}
      </div>
    </div>
    <div className={cnDesc}>
      {desc}
    </div>
  </div>
}