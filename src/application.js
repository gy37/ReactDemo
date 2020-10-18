import React from 'react';

export class Clock2 extends React.Component {
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

export class Toggle extends React.Component {
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

function UserGreeting(props) {
  return <h1>Welcome back!</h1>
}
function GuestGreeting(props) {
  return <h1>Please sign up.</h1>
}
export function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

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
export class LoginControl extends React.Component {
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

export function NumberList(props) {//key用来标记元素，应该给数组中的每个元素赋值一个key
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

export function Blog(props) {
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
export function App2() {
	return (//<Contacts />等React元素本质就是对象，所以可以当做props传递
		<SplitPane left={<Contacts />} right={<Chat />} />
	);
}