import React from "react";
import { post } from 'axios';

class userAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: null, 
            userName: '', 
            userEmail: '', 
            userHomepage: '', 
            userSchool: '', 
            userBio: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) =>{
                console.log(response.data);
            })
        this.setState({
            id: null, 
            name: '', 
            email: '', 
            home: '', 
            school: '', 
            bio: ''
        })
        window.location.reload();
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
    }

    addUser = () => {
        const url = '/api/addUser';
        const formData = new FormData();
        formData.append('id', this.state.userId);
        formData.append('name', this.state.userName);
        formData.append('email', this.state.userEmail);
        formData.append('home', this.state.userHomepage);
        formData.append('school', this.state.userSchool);
        formData.append('bio', this.state.userBio);
        
        return post(url, formData, config);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                ID: <input type="number" name="id" value={this.state.userId} onChange={this.handleValueChange}/><br/>
                이름: <input type="text" name="name" value={this.state.userName} nChange={this.handleValueChange}/><br/>
                이메일: <input type="text" name="email" value={this.state.userEmail} nChange={this.handleValueChange}/><br/>
                홈페이지: <input type="text" name="home" value={this.state.userHomepage} nChange={this.handleValueChange}/><br/>
                학교: <input type="text" name="school" value={this.state.userSchool} nChange={this.handleValueChange}/><br/>
                bio: <input type="text" name="bio" value={this.state.userBio} nChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default userAdd;