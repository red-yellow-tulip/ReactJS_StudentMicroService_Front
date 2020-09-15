import React from 'react';
import './styleGroup.css';
import StudentRow from "../student/StudentRow";
import {withRouter} from 'react-router';

class GropupCard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.groupId,
            urlDatabase:"http://localhost:8090/",
            urlThis:"http://localhost:8080/",
            urlGetid:"group?id=",
            urlGetStudent:"student/group?id=",
            data: [],
            list: [],
            isExists : false,
            isExists1 : false,

        };

        this.printAllLines = this.printAllLines.bind(this);
        this.buttonCreate = this.buttonCreate.bind(this);

    }
    async componentDidMount() {
        try {
            let response = await fetch(this.state.urlDatabase+this.state.urlGetid + `${this.state.id}` );

            if (response.ok){
                this.setState({data: await response.json(), isData: true});
                this.state.isExists = true;
            }
            else {this.state.isExists = false; }

            let response2 = await fetch(this.state.urlDatabase+this.state.urlGetStudent + `${this.state.data.groupId}` );
            if (response2.ok){
                this.setState({list: await response2.json(), isData: true});
                this.state.isExists1 = true;
            }
            else {this.state.isExists1 = false; }
            console.log(response);
            console.log(response2);


        } catch (e) {
            console.log(e);
        }
        console.log(this.state.isExists);
        console.log(this.state.isExists1);
    }
    buttonCreate(){
        this.props.history.push("/CreateStudent");
    }


    printAllLines(props) {

        const arr = this.state.list;
        const urlDatabase = this.state.urlThis;

        if (this.state.isExists === false)
            return  ( <div className="cardStudent">
                Ошибка загрузки студентов группы
            </div>)

     /*   return (
            arr.map( function(group, index) {
                return  <GroupRow key={index} index={index} prod={group} idStudent = {group.id} urlDatabase={urlDatabase}/>})
        )*/

        console.log(arr);
        return (
            arr.map( function(student, index) {

                return  <StudentRow key={index} index={index} prod={student} idStudent = {student.id} urlDatabase={urlDatabase}/>})
        )
    }

    render() {

        if (this.state.isExists === false)
            return ( <div className="cardStudent">
                Ошибка загрузки данных группы
            </div>)

        else
            return (

                <div className="cardStudent">
                    Карта группы

                    {/*<div className="infoParamCard">Id:{this.state.data.id}</div>*/}
                    <div className="infoParamCard">№ группы:{this.state.data.groupId}</div>
                    <div className="infoParamCard">Название:{this.state.data.groupName}</div>

                    <div className="addStudentButtonGroup">
                        <input  type="button"   value="Добавить студента"  onClick={this.buttonCreate}/>
                    </div>

                    <div className="infoParamCard" >Студенты группы:
                    </div>

                    <div className="lineEditHeader">
                        <span className="labelIndex">№</span>
                        <span className="labelIndex">ID</span>
                        <span className="labelName">Имя</span>
                        <span className="labelSurName">Фамилия</span>
                        <span className="labelIndex">№ группы</span>
                        <span className="labelCreateDate">Дата рождения</span>
                    </div>



                    <div >
                        <this.printAllLines/>
                    </div>

                </div>

            );
    }
}

export default withRouter(GropupCard)