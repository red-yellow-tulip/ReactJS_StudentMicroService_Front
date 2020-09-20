import React from 'react';
import {withRouter} from 'react-router';
import * as urlConst from'../constPath.jsx';


class CreateStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.studentId,
            groupList: [],
            selectGroup:null,
            groupId: null,
            groupIdsecond: null
        };
        this.buttonCreate = this.buttonCreate.bind(this);
        this.changeList = this.changeList.bind(this);
    }

    async componentDidMount() {
        try {
            let response = await fetch(urlConst.urlDatabase+urlConst.urlGetAllGroup);
            if (response.ok){
                console.log(response);
                this.setState({groupList: await response.json(), isData: true});
                this.setState({selectGroup:this.state.groopList.get(0)});
            }
            else {
                console.log(response.status);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async buttonCreate(){

        let n = document.getElementById("nameSt").value;
        let sn = document.getElementById("snameSt").value;
        let bSt = document.getElementById("bSt").value;
        let gna = document.getElementById("selectGroup").value;

      /*  console.log(this.state.groupList);*/
        let group = this.state.groupList.filter( (e,key) => { return e.groupName === gna })[0];
        this.state.groupIdsecond =  group.groupId;
        this.state.groupId =  group.id;

        //{"id":1039,"groupId":524,"name":"nameJ5","surname":"surnameJ5","dateBirth":"2020-09-14"}
        let data = {
            id:0,
            groupId:this.state.groupIdsecond,
            name:n,
            surname:sn,
            dateBirth:bSt
        }

        let path =urlConst.urlDatabase+urlConst.urlAddStudent +`${this.state.groupIdsecond}`;

        try {
            let response = await fetch(path,
                {method:"post",
                    headers:{
                        'Accept':'application/json,text/plain,*!/!*',
                        'Content-Type':'application/json' },
                    body: JSON.stringify(data)});

            if (response.status === 201){
                alert("Пользователь успешно создан");
                let path = `group/${this.state.groupId}`;
                this.props.history.push(path);

            }else if (response.status === 404){
                alert("Не найден номер группы");
            }
            else if (response.status === 304) {
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

    changeList(e){

        let groupName = document.getElementById("selectGroup").value;
        this.state.selectGroup = groupName;
        this.setState({selectGroup: groupName});
        console.log(this.state.selectGroup);

    }

    render() {

        return (

            <div className="cardStudent">
                Добавить студента:

                <div className="createStudent">
                   <div className="infoParamCard2" > Имя           <input id = "nameSt" className=""   type="text"  /></div>
                   <div className="infoParamCard2" > Фамилия       <input id = "snameSt" className=""  type="text"  /></div>
                   <div className="infoParamCard2" > Дата рождения <input id = "bSt"  className=""   type="text"  /></div>
                    <div className="infoParamCard2">Группа<label> </label>
                       <select id = "selectGroup" className="selectInfo" value={this.state.selectGroup} onChange={this.changeList}> {
                           this.state.groupList.map( (e,key) =>{
                               return <option key={key} value={e.groupdId}>{e.groupName}</option>
                           })
                       } >
                       </select>


                   </div>
                    <input className="buttonPanel" type="button"   value="Создать"  onClick={this.buttonCreate}/>
                </div>



            </div>


        );
    }




}export default withRouter(CreateStudent)
