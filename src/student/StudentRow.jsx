import React from 'react';
import {withRouter} from 'react-router';
import './styleStudent.css';

class StudentRow extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

        };
        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick(id,url){
        console.log(this.props.history.location)
        let path = `/student/${id}`;
        console.log(path)

        this.props.history.push(path);
    }


    render() {

        let d = new Date(this.props.prod.dateBirth);
        const idStudent = this.props.idStudent;
        const urlDatabase = this.props.urlDatabase;

        return (

            <div className="lineEdit"  onClick={() => { this.buttonClick(idStudent, urlDatabase);}} >
                    <div className="labelIndex">   {this.props.index}</div>
                    <div className="labelIndex">   {this.props.prod.id}</div>
                    <div className="labelName">    {this.props.prod.name}</div>
                    <div className="labelSurName"> {this.props.prod.surname}</div>
                    <div className="labelIndex">  {this.props.prod.groupId}</div>
                    <div className="labelCreateDate">{this.props.prod.dateBirth}</div>

            </div>

        );
    }
}

export default withRouter(StudentRow)
