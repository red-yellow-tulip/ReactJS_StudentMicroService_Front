import React from 'react';
import './styleGroup.css';
import GroupRow from "./GroupRow";
import FiltrGroup from "./FiltrGroup";
import "regenerator-runtime/runtime";
import * as urlConst from'../constPath.jsx';


class GroupList extends React.Component{

    constructor (props){
        super(props);

        this.state = {
            isData: true,
            data: []
        }
        this.printAllLines = this.printAllLines.bind(this);
        this.selectFiltrData = this.selectFiltrData.bind(this);
    }

    async componentDidMount() {
        try {
            let response = await fetch(urlConst.urlDatabase+urlConst.urlGetAllGroup);
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
        let params = urlConst.urlDatabase+urlConst.urlGetFiltr+`${name}`;
        console.log(params);
        try {
            let response = await fetch(params,
                {method:"get",
                            headers:{
                            'Accept':'application/json,text/plain,*!/!*',
                                'Content-Type':'application/json' }
                                }
            );
            this.setState({data: await response.json()});
        } catch (e) {
            console.log(e);
        }
    }

    printAllLines(props) {

        const arr = this.state.data;
        return (
            arr.map( function(group, index) {
                return  <GroupRow key={index} index={index} prod={group} idStudent = {group.id} urlDatabase={urlConst.urlThis}/>})
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