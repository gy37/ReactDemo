import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import FilterableProductTable from './product';

import { WelcomeDialog } from './dialog';
import { WelcomeDialog1 } from './dialog';
import { SignUpDialog } from './dialog';

import { Calculator } from './calculator';
import { Calculator1 } from './calculator';
import { Calculator2 } from './calculator';

import { NameForm } from './form';
import { EssayForm } from './form';
import { FlavorForm } from './form';
import { Reservation } from './form';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
	<h1>Hello, world!!!</h1>,
	document.getElementById('root')
);


const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>
ReactDOM.render(
  element,
  document.getElementById('root')
);

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};
const element1 = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
ReactDOM.render(
  element1,
  document.getElementById('root')
);

function tick() {
  const element2 = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element2, document.getElementById('root'));
}
//setInterval(tick, 1000);

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
const element3 = <Welcome name="Sara" />;//组件名称必须以大写字母开头
ReactDOM.render(
  element3,
  document.getElementById('root')
);

function App1() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
ReactDOM.render(
  <App1 />,
  document.getElementById('root')
);

function formatDate(date) {
  return date.toLocaleDateString();
}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar" src={props.author.avatarUrl} alt={props.author.name} />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}

function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
function Comment1(props) {//React组件必须像纯函数一样保护它们的props不被改变
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
function tick1() {
  ReactDOM.render(
    <Clock date={new Date()} />, document.getElementById('root')
  );
}
//setInterval(tick1, 1000);

class Clock1 extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

class Clock2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {//不能直接修改this.state;要调用setState方法来改变state的值
    this.setState({
      date: new Date()
    });
  }
  render() {
    return(
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <Clock2 />,
  document.getElementById('root')
);

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);//class中的方法默认不会绑定this，需要手动绑定
  }
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

function UserGreeting(props) {
  return <h1>Welcome back!</h1>
}
function GuestGreeting(props) {
  return <h1>Please sign up.</h1>
}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
ReactDOM.render(
  <Greeting isLoggedIn={true} />,
  document.getElementById('root')
);

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);

const listItems = numbers.map((number) => 
  <li>{number}</li>
);
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);

function NumberList(props) {//key用来标记元素，应该给数组中的每个元素赋值一个key
	const numbers = props.numbers;
	const listItems = numbers.map((number) => 
		<li key={number.toString()}>
			{number}
		</li>
	);
	return (
		<ul>{listItems}</ul>
	);
}
ReactDOM.render(
	<NumberList numbers={numbers} />,
	document.getElementById('root')
);

function Blog(props) {
	const sidebar = (
		<ul>
			{props.posts.map((post) => 
				<li key={post.id}>
					{post.title}
				</li>
			)}
		</ul>
	);
	const content = props.posts.map((post) =>
		<div key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.content}</p>
		</div>
	);
	return (
		<div>
			{sidebar}
			<hr />
			{content}
		</div>
	);
}
const posts = [
	{id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
	{id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
	<Blog posts={posts} />,
	document.getElementById('root')
);


ReactDOM.render(
	<NameForm />,
	document.getElementById('root')
);


ReactDOM.render(
	<EssayForm />,
	document.getElementById('root')
);


ReactDOM.render(
	<FlavorForm />,
	document.getElementById('root')
);


ReactDOM.render(
	<Reservation />,
	document.getElementById('root')
);


ReactDOM.render(
	<Calculator />,
	document.getElementById('root')
);


ReactDOM.render(
	<Calculator1 />,
	document.getElementById('root')
);


ReactDOM.render(
	<Calculator2 />,
	document.getElementById('root')
);


ReactDOM.render(
	<WelcomeDialog />,
	document.getElementById('root')
);

function Contacts() {
	return <div className="Contacts" />;
}
function Chat() {
	return <div className="Chat" />;
}
function SplitPane(props) {
	return (
		<div className="SplitPane">
			<div className="SplitPane-left">
				{props.left}
			</div>
			<div className="SplitPane-right">
				{props.right}
			</div>
		</div>
	);
}
function App2() {
	return (//<Contacts />等React元素本质就是对象，所以可以当做props传递
		<SplitPane left={<Contacts />} right={<Chat />} />
	);
}
ReactDOM.render(
	<App2 />,
	document.getElementById('root')
);


ReactDOM.render(
	<WelcomeDialog1 />,
	document.getElementById('root')
);


ReactDOM.render(//组件可以接受任意props，包括基本数据类型，React元素以及函数
	<SignUpDialog />,
	document.getElementById('root')
);

const PRODUCTS = [
	{category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
	{category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
	{category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
	{category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
	{category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
	{category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
	<FilterableProductTable products={PRODUCTS} />,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
