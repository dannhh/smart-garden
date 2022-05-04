import React, { useState, useEffect } from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Menu } from 'antd';
import '../styles/Login.css'

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

function Login(props) {
	const [username, setUserName] = useState("")
	const [password, setPassword] = useState("")


	const handleChangeUserName = (e) => {
		setUserName(e.target.value)
	}

	const handleChangePassword = (e) => {
		setPassword(e.target.value)
	}

	const onSubmit = (values) => {
		axios.post('/login', {
			username: username,
			password: password,
		})
			.then(function (response) {
				console.log(response)
				sessionStorage.setItem('token', response.data.access_token)
				sessionStorage.setItem('user_id', response.data.ID)
				sessionStorage.setItem('is_admin', response.data.is_admin)

				if (response.data.success == false) {
					alert("Incorrect username or password");
				}
				else {
					if (response.data.is_admin){
						window.location.href = "../dashboard";
					}
					else {
						window.location.href = "../general";
					}
					
				}
			})
			.catch((err) => {
				alert("Incorrect username or password");
			});
	};
	

	return (
		<div className="login" style={{ background: "rgb(198, 235, 203)", height: "100vh" }}>
			<div id="padding"></div>
			<div id="loginform">
				<FormHeader title="Login" />
				<Form handleChangePassword={handleChangePassword} handleChangeUserName={handleChangeUserName} username={username} password={password} onSubmit={onSubmit}/>
			</div>
		</div>
	);
}

const FormHeader = props => (
	<h2 id="headerTitle">{props.title}</h2>
);

const Form = props => (
	<div>
		<FormInput name="username" description="Username" placeholder="Enter your username" type="text" value={props.username} handleChange={props.handleChangeUserName} />
		<FormInput name="password" description="Password" placeholder="Enter your password" type="password" value={props.password} handleChange={props.handleChangePassword} />
		<ForgetPass />
		<FormButton title="Log in" onSubmit={props.onSubmit}/>
	</div>
);

const ForgetPass = props => (
	<div className="forgetpass">
		<a href="#">Quên mật khẩu?</a>
	</div>
);

const FormButton = props => (
	<div id="button" class="row">
		<button onClick={props.onSubmit}>{props.title}</button>
	</div>
);

const FormInput = props => (
	<div class="row">
		<label>{props.description}</label>
		<input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.handleChange} />
	</div>
);


export default Login;
