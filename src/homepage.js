import React from 'react';
import { Remarkable } from 'remarkable';

class TodoList extends React.Component {
	render() {
		return (
			<ul>
				{this.props.items.map(item => (
					<li key={item.id}>{item.text}</li>
				))}
			</ul>
		);
	}
}
export class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], text: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		this.setState({text: e.target.value});
	}
	handleSubmit(e) {
		e.preventDefault();//阻止submit默认的表单提交事件
		if (this.state.text.length === 0) {
			return;
		}
		const newItem = {
			text: this.state.text,
			id: Date.now()
		}
		this.setState(state => ({
			items: state.items.concat(newItem),
			text: ''
		}));
	}
	//button默认type为submit，点击会触发表单提交事件
	render() {//onSubmit触发表单提交事件
		return (//htmlFor即html中的for属性，规定label与那个表单元素绑定
			<div>
				<h3>TODO</h3>
				<TodoList items={this.state.items} />
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="new-todo">
						What needs to be done?
					</label>
					<input 
						id="new-todo"
						onChange={this.handleChange}
						value={this.state.text}
					/>
					<button>
						Add #{this.state.items.length + 1}
					</button>
				</form>
			</div>
		);
	}
}


export class MarkdownEditor extends React.Component {
	constructor(props) {
		super(props);
		this.md = new Remarkable();//md转换器
		this.handleChange = this.handleChange.bind(this);//绑定处理事件
		this.state = {//使用state记录输入框的值
			value: "Hello, **world**!\n```js\nlet a = 0;\n```\n***\n*\n*\n*\n# 1\n## 2\n### 3\n#### 4\n##### 5\n*哈哈哈*\n~~删掉~~\n![测试](http://jianshu.com)\n[简书](http://jianshu.com)\n1.\n2.\n3.\n"
		}; 
	}
	handleChange(e) {//输入时，更新state
		this.setState({ value: e.target.value });
	}
	getRawMarkup() {//获取渲染后的html源代码
		console.log(this.state.value);
		console.log(this.md.render(this.state.value));
		return { __html: this.md.render(this.state.value) };
	}
	render() {
		//textarea的defaultValue属性，设置textarea的默认值
		//dangerouslySetInnerHTML设置innerHTML内容，格式{{__html:xxx}}
		//style行内样式，格式{{height: xxx}}
		return (
			<div className="MarkdownEditor">	
				
				<h1>Input</h1>
				<label htmlFor="markdown-content">
					Enter some markdown
				</label>
				<textarea 
					id="markdown-content"
					onChange={this.handleChange}
					defaultValue={this.state.value}
					style={{height: 20 * 15}}
				/>
				<h1>Output</h1>
				<div
					className="content"
					dangerouslySetInnerHTML={this.getRawMarkup()}
				/>
			</div>
		);
	}
}
