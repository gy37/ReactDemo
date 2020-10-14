import React from 'react';

function FancyBorder(props) {//props.children表示FancyBorder所有的子组件
	return (
		<div className={'FancyBorder FancyBorder-' + props.color}>
			{props.children}
		</div>
	);
}
export function WelcomeDialog() {
	return (//FancyBorder中的所有内容都会作为一个children prop传递给FancyBorder组件
		<FancyBorder color="blue">
			<h1 className="Dialog-title">
				Welcome
			</h1>
			<p className="Dialog-message">
				Thank you for visiting out spacecraft!
			</p>
		</FancyBorder>
	);
}

function Dialog(props) {
	return (
		<FancyBorder color="blue">
			<h1 className="Dialog-title">
				{props.title}
			</h1>
			<p className="Dialog-message">
				{props.message}
			</p>
			{props.children}
		</FancyBorder>
	);
}
export function WelcomeDialog1() {
	return (
		<Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
	);
}

export class SignUpDialog extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.state = {login: ''};
	}
	render() {
		return (
			<Dialog title="Mars Exploration Program" message="How should we refer to you?">
				<input value={this.state.login} onChange={this.handleChange} />
				<button onClick={this.handleSignUp}>
					Sign Me Up!
				</button>
			</Dialog>
		);
	}
	handleChange(e) {
		this.setState({login: e.target.value});
	}
	handleSignUp() {
		//`${}`，反引号用于连接字符串，${}中引用变量
		alert(`Welcome aboard, ${this.state.login}!`);
	}
}