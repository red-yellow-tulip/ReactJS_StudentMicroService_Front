
import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import StudentList from "../student/StudentList";
import GroupList from "../group/GroupList";
import StudentCard from "../student/StudentCard";
import GropupCard from "../group/GroupCard";
import CreateStudent from "../student/CreateStudent";
import EditStudent from "../student/EditStudent";
import CreateGroup from "../group/CreateGroup";
CreateGroup
import './menuContainerStyle.css';




class MenuContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    render() {

        return (
            <div className="body">
                <div className="topLine">
                   Best University
                </div>

                <HashRouter className="hashRouter">

                          <div className="menuContainer">

                                <ul  className="header">
                                    <li><NavLink className = "li" to = "/studentList"> Студенты </NavLink></li>
                                    <li><NavLink className = "li" to = "/groupList"> Группы </NavLink></li>
                                </ul>

                                <div  className="content">
                                    <Route exact path="/"component={StudentList}/>
                                    <Route path="/studentList"component={StudentList}/>
                                    <Route path="/groupList"component={GroupList}/>
                                    <Route path="/student/:studentId" component={StudentCard}/>
                                    <Route path="/group/:groupId" component={GropupCard}/>
                                    <Route path="/createStudent"component={CreateStudent}/>
                                    <Route path="/editStudent/:studentId" component={EditStudent}/>
                                    <Route path="/createGroup" component={CreateGroup}/>

                                </div>
                          </div>
                          {/*<div className="downLine">....</div>*/}

                 </HashRouter>
            </div>
        );
    }
}

export default MenuContainer