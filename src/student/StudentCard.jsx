import React from 'react';
import './styleStudent.css';
import {withRouter} from 'react-router';
import * as urlConst from'../constPath.jsx';

class StudentCard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.studentId,
            data: []
        };
        this.buttonEdit = this.buttonEdit.bind(this);
        this.buttonDel = this.buttonDel.bind(this);
        this.buttonGroup = this.buttonGroup.bind(this);

    }

    async componentDidMount() {
        try {
            let response = await fetch(urlConst.urlDatabase+urlConst.urlGetidStudent + `${this.state.id}` );
            if (response.ok){
                this.setState({data: await response.json(), isData: true});
                this.state.isExists = true;
            }
            else {
                console.log(response.status);

                this.state.isExists = false;
            }
        } catch (e) {
            console.log(e);
            this.state.isExists = false;
        }




    }

    buttonEdit(){

        this.props.history.push("/editStudent/"+`${this.state.id}`);
    }

    buttonGroup(){

        this.props.history.push("/group/"+`${this.state.data.groupId}`);
    }


    async buttonDel(){

        console.log(this.state.id);
        let isDelete = false;
        try {
            let path = urlConst.urlDatabase+urlConst.urlDel +
                `name=${this.state.data.name}`+
                `&sname=${this.state.data.surname}`;
            console.log(path);

            let response = await fetch(path, {method:"delete"});

            if (response.ok){
                isDelete = true;
                alert("Данные студента успешно удалены");
                this.props.history.push("/StudentList");

            }
            else {
                isDelete = false;
                alert("Ошибка, удаление не произведено");
            }
        } catch (e) {
            console.log(e);
            isDelete = false;
        }
    }


    render() {


        if (this.state.isExists)
            return ( <div className="cardStudent">
                    Ошибка загрузки карты студента
                </div>)
        else
            return (

            <div className="cardStudent">
                Карта студента
                <div className="infoParamCard">Id: {this.state.data.id}</div>
                <div className="infoParamCard">Имя: {this.state.data.name}</div>
                <div className="infoParamCard">Фамилия: {this.state.data.surname}</div>
                <div className="infoParamCard">№ группы:{this.state.data.groupId}</div>
                <div className="infoParamCard">Дата рождения:{this.state.data.dateBirth}</div>

                <form >
                    <input className="buttonPanel" type="button"   value="Изменить"  onClick={this.buttonEdit}/>
                    <input className="buttonPanel" type="button"   value="Удалить"  onClick={this.buttonDel}/>
                    <input className="buttonPanel" type="button"   value="К группе"  onClick={this.buttonGroup}/>
                </form>
            </div>





        );
    }
}

export default withRouter(StudentCard)