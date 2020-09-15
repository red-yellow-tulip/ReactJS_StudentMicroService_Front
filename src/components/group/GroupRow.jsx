import React from 'react';
import './styleGroup.css';
import {withRouter} from 'react-router';

class GroupRow extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

        };
        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick(id,url){

        let path = `group/${id}`;
        this.props.history.push(path);

    }

    render() {

        const idGroup = this.props.idStudent;
        const urlDatabase = this.props.urlDatabase;

        return (

            <div className="lineEdit"  onClick={() => { this.buttonClick(idGroup, urlDatabase);}} >
                    <div className="glabelIndex">   {this.props.index}</div>
                    <div className="glabelIndex">   {this.props.prod.id}</div>
                    <div className="glabelName">    {this.props.prod.groupName}</div>
            </div>

        );
    }
}

export default withRouter(GroupRow)