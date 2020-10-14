import React from 'react';

export class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], text: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	render() {
		return (
			<div>
				<h3>TODO</h3>
				
			</div>
		);
	}
}