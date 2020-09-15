import React from 'react';
import './styleStudent.css';
import StudentRow from "./StudentRow";
import FiltrStudent from "./FiltrStudent";
import "regenerator-runtime/runtime";


class StudentList extends React.Component{

    constructor (props){
        super(props);

        this.state = {
            urlDatabase:"http://localhost:8090/",
            urlThis:"http://localhost:8080/",
            urlGetAll:"student/all",
            urlGetFiltr:"student/filtr?",
            isData: true,
            data: [],

        }
        this.printAllLines = this.printAllLines.bind(this);
        this.selectFiltrData = this.selectFiltrData.bind(this);


    }

    async componentDidMount() {

        try {
            let response = await fetch(this.state.urlDatabase+this.state.urlGetAll);
            if (response.ok){
                this.setState({data: await response.json(), isData: true});
            }
            else {
                console.log(response.status);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async selectFiltrData(name,surname) {
        let params = this.state.urlDatabase+this.state.urlGetFiltr+`name=${name}&sname=${surname}`;
        console.log(params);
        try {
            let response = await fetch(params);
            this.setState({data: await response.json()});
        } catch (e) {
            console.log(e);
        }

    }

    printAllLines(props) {

        const arr = this.state.data;
        const urlDatabase = this.state.urlThis;
        const f = this.buttonClick;
        return (
            arr.map( function(student, index) {

                return  <StudentRow key={index} index={index} prod={student} idStudent = {student.id} urlDatabase={urlDatabase} />})
            )
    }
    render(){

        return (
            <div className="contentProduct">
                <div className="listProduct">
                    <div className="lineEditHeader">
                        <span className="labelIndex">№</span>
                        <span className="labelIndex">ID</span>
                        <span className="labelName">Имя</span>
                        <span className="labelSurName">Фамилия</span>
                        <span className="labelIndex">№ группы</span>
                        <span className="labelCreateDate">Дата рождения</span>
                    </div>
                    <div className="scrolZone">
                        <this.printAllLines/>
                    </div>
                </div>
                <FiltrStudent selectFiltrData = {this.selectFiltrData}/>
            </div>


        );
    }
}

export default StudentList