import React from 'react';
import './styleGroup.css';
import {withRouter} from 'react-router';

class FiltrGroup extends React.Component{

    constructor (props){
        super(props);

        this.state = {
            findEvent : props.selectFiltrData,
            name: "",
        }

        this.buttonEventClear = this.buttonEventClear.bind(this);
        this.onSubmitFiltr = this.onSubmitFiltr.bind(this);
        this.changeName = this.changeName.bind(this);
        this.buttonCreate = this.buttonCreate.bind(this);

    }

    buttonEventClear(){

        this.setState({name: ""});
        this.state.findEvent(this.state.name);
    }

    onSubmitFiltr() {

        this.state.findEvent(this.state.name);
    }

    changeName(event){
        let t = event.target.value;
        console.log("t==="+t);
        this.setState({ name: t });
        this.state.findEvent(t);
    }

    buttonCreate(){
        this.props.history.push("/CreateGroup");
    }

    render(){

        return (

            <form className="findRowEdit" onSubmit={this.onSubmitFiltr}>
                <div className="findEdit"> Наименование:
                    <input id = "filtrName" type="text" value={this.state.name}  onChange={this.changeName}/>
                </div>

                <div className="findEditButton">
                    <button className="buttonFind" onClick={this.buttonEventClear} type="submit"> Очистить </button>
                </div>

                <div className="addStudentButton">
                    <input  type="button"   value="Добавить группу"  onClick={this.buttonCreate}/>

                </div>
            </form>

        );
    }
}

export default withRouter(FiltrGroup)