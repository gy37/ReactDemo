import React from 'react';

export class NameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		console.log(event.target.value);
		this.setState({value: event.target.value});
	}
	handleSubmit(event) {
		alert('提交的名字：' + this.state.value);
		event.preventDefault();
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					名字：
					<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="提交" />
			</form>	
		);
	}
}

export class EssayForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '请撰写一篇关于你喜欢的 DOM 元素的文章。'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	handleSubmit(event) {
		alert('提交的文章：' + this.state.value);
		event.preventDefault();
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					文章：
					<textarea value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="提交" />
			</form>
		);
	}
}

export class FlavorForm extends React.Component  {
	constructor(props) {
		super(props);
		this.state = {value: 'coconut'};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	handleSubmit(event) {
		alert('你喜欢的风味是：' + this.state.value);
		event.preventDefault();
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
				选择你喜欢的风味：
					<select vlaue={this.state.value} onChange={this.handleChange}>
						<option value="grapfruit">葡萄柚</option>
						<option vlaue="lime">酸橙</option>
						<option value="coconut">椰子</option>
						<option value="mango">芒果</option>
					</select>
				</label>
				<input type="submit" value="提交" />
			</form>
		);
	}
}

export class Reservation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isGoing: true,
			numberOfGuests: 2
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	render() {
		return (
			<form>
				<label>
					参与：
					<input name="isGoing" 
						type="checkbox"
						checked={this.state.isGoing} 
 						onChange={this.handleInputChange} />
				</label>
				<br />
				<label>
				来宾人数：
				<input name="numberOfGuests"
					tpye="number"
					value={this.state.numberOfGuests}
					onChange={this.handleInputChange} />
				</label>
			</form>
		);
	}
}