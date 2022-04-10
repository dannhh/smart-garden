import React, { Suspense } from "react";
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Menu } from 'antd';
//import icons from react icons
import '../styles/Login.css'

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

function Login() {
	return (
		<div>
			<div id="padding"></div>
			<div id="loginform">
				<FormHeader title="Login" />
				<Form />
			</div>
		</div>
	);
}

const FormHeader = props => (
	<h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
	<div>
		<FormInput description="Username" placeholder="Enter your username" type="text" />
		<FormInput description="Password" placeholder="Enter your password" type="password" />
		<ForgetPass />
		<FormButton title="Log in" />
	</div>
);

const ForgetPass = props => (
	<div className="forgetpass">
		<a href="#">Quên mật khẩu?</a>
	</div>
);

const FormButton = props => (
	<div id="button" class="row">
		<button>{props.title}</button>
	</div>
);

const FormInput = props => (
	<div class="row">
		<label>{props.description}</label>
		<input type={props.type} placeholder={props.placeholder} />
	</div>
);


export default Login;
