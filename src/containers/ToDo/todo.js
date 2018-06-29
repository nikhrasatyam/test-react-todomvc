import React, { Component } from 'react';
import { Button, Select, Input, Icon, List, Checkbox } from 'semantic-ui-react';

class ToDo extends Component {

    state = {
        list : [],
        task : '',
        id : 1,
        itemsLeft : null
    }

    addTask = () => {
        const {task, id, list, itemsLeft} = this.state;
        if (task.trim() != '')
        {
        var data = task.trim();
        list.push({id , task:data , completed : false});
        this.setState({id : id + 1});
        this.setState({task : ''});
        itemsLeft === null ? this.setState({itemsLeft : 1}) : this.setState({itemsLeft : itemsLeft + 1});
        }   
    }

    mouseLeave = () => {
        this.setState({showButton:null});
    }
    
    destroy = (index) => {
        this.state.list[index].completed === false ? this.setState({itemsLeft : this.state.itemsLeft - 1}) : null;
        this.state.list.splice(index,1);
        this.setState({showButton:null});   
    }
    
    handleCheckboxChange = (index) => {
        if (this.state.list[index].completed === true)
        {
            this.state.list[index].completed = false;
            this.setState({itemsLeft : this.state.itemsLeft + 1});
        }
        else
        {
            this.state.list[index].completed = true;
            this.setState({itemsLeft : this.state.itemsLeft - 1});
        }
    }
    mouseHover = (id, e) => {
        this.setState({showButton : id});
    }
    render() {
        const {list, task} = this.state;
        let viewList = null;
        if (list.length > 0){
            viewList = list.map((data,index) =>
      
                <li className="list-group-item list-group-item-action list-hover" key={data.id} onMouseEnter={() => this.mouseHover(data.id)} onMouseLeave={() => this.mouseLeave()}>
                    <div className="row">
                        <div className="col-sm-1">
                            <Checkbox onChange={() => this.handleCheckboxChange(index)} />
                        </div>
                        <div className="col-sm-9 viewlist">
                            <span className="list-text">{data.completed === true ? <strike>{data.task}</strike> : data.task}</span>
                        </div>
                        <div className="col-sm-2 close-button" >
                            {(this.state.showButton === data.id) ? <Button onClick={() => this.destroy(index)}><Icon name='close' /></Button> : null}
                        </div>
                    </div>
                </li>
            );
        }
        return (
            <div>
                <div className ="add-todo">
                    <h2>To Do's</h2>
                <Input className = "add-input" type='text' placeholder='Add Task..' >
                            <input value ={ task } onKeyPress={(event)=> event.charCode == 13 ? this.addTask(): null  } onChange={(event)=>this.setState({task : event.target.value})}/>
                            <Button className="add-button"  onClick={() => this.addTask()}><Icon  name='add'/></Button>
                </Input>
                </div>
                <hr />
                {
                    list.length > 0 ? 
                    <div>
                    <h2>Items Left {this.state.itemsLeft}</h2>
                    {viewList}
                    </div> 
                    : null
                }    
            </div>
        );
    }
}

export default ToDo;