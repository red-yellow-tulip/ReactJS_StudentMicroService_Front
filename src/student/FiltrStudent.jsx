import React from 'react';
import './styleStudent.css';
import {withRouter} from 'react-router';

class FiltrStudent extends React.Component{

    constructor (props){
        super(props);

        this.state = {
            findEvent : props.selectFiltrData,
            name: "",
            surname: "",
        }

        this.buttonEventClear = this.buttonEventClear.bind(this);
        this.onSubmitFiltr = this.onSubmitFiltr.bind(this);

        this.changeName = this.changeName.bind(this);
        this.changeSurname = this.changeSurname.bind(this);
        this.buttonCreate = this.buttonCreate.bind(this);

    }

    buttonEventClear(){

        this.setState({name: ""});
        this.setState({surname: ""});
        this.state.findEvent(this.state.name,this.state.surname);
    }

    onSubmitFiltr() {

        this.state.findEvent(this.state.name,this.state.surname);
    }

    changeName(event){
        let t = event.target.value;
        console.log("t==="+t);
        this.setState({ name: t });
        this.state.findEvent(t,this.state.surname);
    }

    changeSurname(event){
        let t = event.target.value;
        this.setState({ surname: t});
        this.state.findEvent(this.state.name,t);
    }

    buttonCreate(){
        this.props.history.push("/CreateStudent");
    }


    render(){

        return (

            <form className="findRowEdit" onSubmit={this.onSubmitFiltr}>
                <div className="findEdit"> Имя:
                    <input id = "filtrName" type="text" value={this.state.name}  onChange={this.changeName}/>
                </div>

                <div className="findEdit"> Фамилия:
                    <input id = "filtrSurname" type="text" value={this.state.surname} onChange={this.changeSurname}/>
                </div>

                <div className="findEditButton">
                    <button className="buttonFind" onClick={this.onSubmitFiltr} type="submit"> Найти </button>
                    <button className="buttonFind" onClick={this.buttonEventClear} type="submit"> Очистить </button>
                </div>

                <div className="addStudentButton">
                    <input  type="button"   value="Добавить студента"  onClick={this.buttonCreate}/>

                </div>
            </form>

        );
    }
}

export default withRouter(FiltrStudent)