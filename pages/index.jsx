import React from 'react';
import {api} from 'horizen-framework/frontend';
import { withRouter } from 'next/router'
import { Card, Button, TextArea } from '@/components';

class WrappApp extends React.Component {
    static getInitialProps({ query }){
      return { query }
    }

    constructor(props){
      super(props);

      this.state = {tasks: {}, tasksIds: [], text: "", load: false}
    }

    async componentDidMount(){
      await this.getTasks();
    }

    getTasks = async () => {
      this.setState({load: true});
      const {tasks, tasksIds} = await api.call("getTasks", {
        auth: false,
        params: {},
      });

      const tasksNormalize = tasks.reduce((obj, task) => {
        obj[task.taskId] = task;
        return obj;
      }, {});

      this.setState({tasks: tasksNormalize, tasksIds, load: false});
    }

    addTask = async () => {
      this.setState({load: true})
      const task = await api.call("addTask", {
        auth: false,
        params: {
          desc: this.state.text,
          date: new Date().toISOString(),
        }
      });
      this.setState(state => {
        state.tasks[task.taskId] = task;
        return {
          ...state,
          tasksIds: [...state.tasksIds, task.taskId],
          text: "",
          load: false,
        }
      });
    }

    handlerCompleteTask = async (taskId) => {
      const completeTask = await api.call("completeTask", {
        auth: false,
        params: {taskId},
      });
      this.setState(state => {
        state.tasks[taskId].status = completeTask.status;
        return {
          ...state,
          tasks: {
            ...state.tasks,
          },
        }
      })
    };

    changeTextArea = (e) => {
      this.setState({text: e.target.value});
    }

    render() {
      return (
        <div 
          className="
            flex 
            justify-center 
            items-center
            py-4"
        >
          <main 
            style={{width: "30dvw"}} 
            className="
              min-h-screen 
              flex 
              flex-col 
              justify-center 
              items-center 
              gap-2"
          >
            <ul className="list-none w-full flex flex-col gap-2">
              {
                this.state.tasksIds.length && this.state.load ? 
                "Загрузка..." 
                : 
                this.state.tasksIds.map(
                  taskId => (
                    <Card 
                      key={taskId} 
                      {...this.state.tasks[taskId]} 
                      handlerCompleteTask={this.handlerCompleteTask}
                    />
                  )
                )
              }
            </ul>
            <TextArea 
              className="w-full inline-block" 
              placeholder="Введи сюда текст таски" 
              value={this.state.text} 
              onChange={this.changeTextArea}
            />
            <Button 
              disabled={this.state.load}
              text={this.state.load ? "Добавялем..." : "Добавить задачу"} 
              handler={this.addTask}
            />
          </main>
        </div>
      )
    }
}

export default withRouter(WrappApp);