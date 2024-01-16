import React from 'react';
import Head from 'next/head';
import Error from 'next/error';
import {api} from 'horizen-framework/frontend';
import { withRouter } from 'next/router'
import { Card, Button, TextArea } from '@/components';

class WrappApp extends React.Component {
    static getInitialProps({ query }){
      return { query }
    }

    constructor(props){
      super(props);

      this.state = {tasks: [], text: ""}
    }

    async componentDidMount(){
      await this.getTasks();
    }

    getTasks = async ()=> {
      const result = await api.call("getTasks", {
        auth: false,
        params: {},
      });

      this.setState({tasks: result.tasks});
    }

    addTask = async () => {
      const task = await api.call("addTask", {
        auth: false,
        params: {
          desc: this.text,
          date: new Date().toISOString(),
        }
      });
      this.setState(state => ([...state, task]));
    }

    changeTextArea = (e) => {
      this.setState({text: e.target.value});
    }

    render(){
      return (
        <div 
          className="
            flex 
            justify-center 
            items-center"
        >
          <main 
            style={{width: "30dvw"}} 
            className="
              min-h-screen 
              flex 
              flex-col 
              justify-center 
              items-center gap-2"
          >
            {
              this.state.tasks.map(
                task => <Card key={task.taskId} {...task}/>
              )
            }
            <TextArea 
              className="w-full inline-block" 
              placeholder="Введи сюда текст таски" 
              value={this.state.text} 
              onChange={this.changeTextArea}
            />
            <Button 
              text="Добавить задачу" 
              handler={this.addTask}
            />
          </main>
        </div>
      )
    }
}

export default withRouter(WrappApp);