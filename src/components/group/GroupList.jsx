import React from 'react';
import './styleGroup.css';
import GroupRow from "./GroupRow";
import FiltrGroup from "./FiltrGroup";
import "regenerator-runtime/runtime";


class GroupList extends React.Component{

    constructor (props){
        super(props);

        this.state = {
            urlDatabase:"http://localhost:8090/",
            urlThis:"http://localhost:8080/",
            urlGetAll:"group/all",
            urlGetFiltr:"group/filtr?name=",
            isData: true,
            data: []
        }
        this.printAllLines = this.printAllLines.bind(this);
        this.selectFiltrData = this.selectFiltrData.bind(this);
    }

    async componentDidMount() {
        try {
            let response = await fetch(this.state.urlDatabase+this.state.urlGetAll);
            if (response.ok){
                console.log(response);
                this.setState({data: await response.json(), isData: true});
            }
            else {
                console.log(response.status);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async selectFiltrData(name) {
        let params = this.state.urlDatabase+this.state.urlGetFiltr+`${name}`;
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
        console.log(urlDatabase);
        return (
            arr.map( function(group, index) {
                return  <GroupRow key={index} index={index} prod={group} idStudent = {group.id} urlDatabase={urlDatabase}/>})
            )
    }

    render(){

        return (
            <div className="contentProduct">
                <div className="listProduct">
                    <div className="lineEditHeader">
                        <span className="glabelIndex">№</span>
                        <span className="glabelIndex">ID</span>
                        <span className="glabelName">Наименование</span>
                    </div>
                    <div className="scrolZone">
                        <this.printAllLines/>
                    </div>
                </div>
                <FiltrGroup selectFiltrData = {this.selectFiltrData}/>
            </div>


        );
    }
}

export default GroupList