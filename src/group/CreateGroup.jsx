import React from 'react';
import {withRouter} from 'react-router';
import * as urlConst from'../constPath.jsx';


class CreateGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.studentIdw
        };

        this.buttonCreate = this.buttonCreate.bind(this);
    }


    async buttonCreate(){
        let nam = document.getElementById("GroupNameCreate").value;
        let num = document.getElementById("GroupNumberCreate").value;
        //{"id":525,"groupId":1070,"groupName":"groupF"}
        let data = {
            id:0,
            groupId:num,
            groupName:nam
        }

        let path = urlConst.urlDatabase+urlConst.urlAddGroup;
        console.log(data);
        try {
            let response = await fetch(path,
                {method:"post",
                    headers:{
                        'Accept':'application/json,text/plain,*!/!*',
                        'Content-Type':'application/json' },
                    body: JSON.stringify(data)});

            if (response.status === 201){

                let dataNew =  await response.json();
                console.log(dataNew);

                alert("Группа успешно создана");
                let path = "groupList/";
                this.props.history.push(path);

            }else if (response.status === 409) {
                alert("Группа с таким номером уже существует");
            }
            else if (response.status === 400) {
                alert("Ошибка при обработке данных группы");
            }else{
                alert("Ошибка, данные группы не сохранены");
            }
        } catch (e) {
            console.log(e);
            alert("Ошибка, данные группы не сохранены");
        }

    }


    render() {

        return (

            <div className="newGroupCard">
                Новая группа
                  <div className="infoParamCard2" > Название       <input id = "GroupNameCreate" className=""  type="text"  /></div>
                  <div className="infoParamCard2" > № группы       <input id = "GroupNumberCreate" className=""  type="text"  /></div>
                  <input className="infoParamCard2" type="button"   value="Создать"  onClick={this.buttonCreate}/>
            </div>

        );
    }

}export default withRouter(CreateGroup)
