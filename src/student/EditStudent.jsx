import React from 'react';
import {withRouter} from 'react-router';
import * as urlConst from'../constPath.jsx';


class CreateStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.studentId,
            data: [],
            groupList: [],
            groupId: null,
            groupIdsecond: null,
            selectGroup:null
        };
        this.buttonSave = this.buttonSave.bind(this);
        this.changeSurname = this.changeSurname.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeList = this.changeList.bind(this);

    }

    async componentDidMount() {
        try {
            let response = await fetch(urlConst.urlDatabase+urlConst.urlGetidStudent + `${this.state.id}` );

            if (response.ok){
                this.setState({data: await response.json()});
                this.setState({groupId: this.state.data.groupId});

            }
            else {
                console.log(response.status);
            }
        } catch (e) {
            console.log(e);
        }

        try {
            let response = await fetch(urlConst.urlDatabase+urlConst.urlGetAllGroup);
            if (response.ok){

                this.setState({groupList: await response.json()});
                let group = this.state.groupList.filter( (e,key) => { return e.id === this.state.data.groupId})[0];
                this.setState({groupIdsecond:group.groupId,groupId:group.id,selectGroup:group.groupName });

            }
            else {
                console.log(response.status);
            }
        } catch (e) {
            console.log(e);
        }
    }

    changeName(event){
        let t = event.target.value;
        this.state.data.name = t;
        this.setState({name:t});
    }

    changeSurname(event){
        let t = event.target.value;
        this.state.data.surname = t;
        this.setState({surname:t});
    }

    changeDate(event){
        let t = event.target.value;
        this.state.data.dateBirth = t;
        this.setState({dateBirth:t});
    }

    changeList(e){

        let groupName = document.getElementById("selectGroup").value;
        this.state.selectGroup = groupName;
        this.setState({selectGroup: groupName});

    }

    async buttonSave(){

        let group = this.state.groupList.filter( (e,key) => { return e.groupName === this.state.selectGroup})[0];
        this.setState({groupIdsecond:group.groupId,
                            groupId:group.id,
                            selectGroup:group.groupName });

        let newData = {
            id:this.state.id,
            groupId:group.id,
            name:this.state.data.name,
            surname:this.state.data.surname,
            dateBirth:this.state.data.dateBirth
        }
        console.log(newData);

        let path = urlConst.urlDatabase+urlConst.urlPutidStudent +`${newData.id}`;

        try {
            let response = await fetch(path,
                {method:"put",
                    headers:{
                        'Accept':'application/json,text/plain,*!/!*',
                        'Content-Type':'application/json' },
                    body: JSON.stringify(newData)});


            if (response.status === 200){
                alert("Данные пользователя успешно изменены");
                let path = `/student/${this.state.data.id}`;
                //let path = `/group/${this.state.groupId}`;
                this.props.history.push(path);

            }else if (response.status === 204){  //NO_CONTENT
                alert("Ошибка передачи данных пользователя");
            }
            else if (response.status === 304) { //HttpStatus.NOT_MODIFIED
                alert("Студент с такими ФИО уже существует");
            }
            else if (response.status === 400) {  
                alert("Ошибка при обработке данных студента");
            }else{
                alert("Ошибка, данные студента не сохранены");
            }
        } catch (e) {
            console.log(e);
            alert("Ошибка, данные студента не сохранены");
        }

    }

    render() {

        return (

            <div className="cardStudent">
                Изменить данные студента:

                <div className="createStudent">
                   <div className="infoParamCard2" > Имя           <input id = "nameSt"  className=""  value={this.state.data.name} type="text" onChange={this.changeName} /></div>
                   <div className="infoParamCard2" > Фамилия       <input id = "snameSt" className="" value={this.state.data.surname} type="text" onChange={this.changeSurname} /></div>
                   <div className="infoParamCard2" > Дата рождения <input id = "bSt"     className=""   value={this.state.data.dateBirth} type="text" onChange={this.changeDate} /></div>


                    <div className="infoParamCard2">Группа<label> </label>
                       <select id = "selectGroup" className="selectInfo" value={this.state.selectGroup} onChange={this.changeList}> {
                           this.state.groupList.map( (e,key) =>{
                               return <option key={key} value={e.groupdId}>{e.groupName}</option>
                           })
                       } >
                       </select>


                   </div>
                    <input className="buttonPanel" type="button"   value="Сохранить"  onClick={this.buttonSave}/>
                </div>

            </div>


        );
    }


}export default withRouter(CreateStudent)
