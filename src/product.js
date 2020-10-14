import React from 'react';

class ProductCategoryRow extends React.Component {
	render() {
		const category = this.props.category;
		return (//colSpan表示单元格可横跨的列数
			<tr>
				<th colSpan="2">
					{category}
				</th>
			</tr>
		);
	}
}

class ProductRow extends React.Component {
	render() {
		const product = this.props.product;
		const name = product.stocked ? product.name : 
			<span style={{color: 'gray'}}>
				{product.name}
			</span>
		const price = product.stocked ? product.price : 
			<span style={{color: 'gray'}}>
				{product.price}
			</span>
		return (
			<tr>
				<td>{name}</td>
				<td>{price}</td>
			</tr>
		);
	}
}

class ProductTable extends React.Component {
	render() {
		const filterText = this.props.filterText;
		const inStockOnly = this.props.inStockOnly;

		const rows = [];
		let lastCategory = null;
		this.props.products.forEach((product) => {
			if (product.name.indexOf(filterText) === -1) {
				return;
			}
			if (inStockOnly && !product.stocked) {
				return;
			}
			if (product.category !== lastCategory) {
				rows.push(
					<ProductCategoryRow category={product.category} key={product.category} />
				);
			}
			rows.push(
				<ProductRow product={product} key={product.name} />
			);
			lastCategory = product.category;
		})
		return (//react中设置样式用style={{xxx:xxx}}；collapse合并边框
			<table border="1" style={{borderCollapse: 'collapse'}}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
	}
	handleFilterTextChange(e) {
		this.props.onFilterTextChange(e.target.value);
	}
	handleInStockChange(e) {
		this.props.onInStockChange(e.target.checked);
	}
	render() {
		const filterText = this.props.filterText;
		const inStockOnly = this.props.inStockOnly;
		return (
			<form>
				<input 
					type="text" 
					placeholder="Search..." 
					value={filterText}
					onChange={this.handleFilterTextChange} 
				/>
				<p>
					<input 
						type="checkbox" 
						checked={inStockOnly} 
						onChange={this.handleInStockChange}
					/>
					{' '}
					Only show products in stock
				</p>
			</form>
		);
	}
}

class FilterableProductTable extends React.Component {
	//确定state的位置时，需要放在使用state的共同所有者组件里，如果没有就新建一个父组件包含所有用到state的组件
	constructor(props) {
		super(props);
		this.state = {
			filterText: '',
			inStockOnly: false
		};
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
		this.handleInStockChange = this.handleInStockChange.bind(this);
	}
	handleFilterTextChange(filterText) {
		this.setState({
			filterText: filterText
		});
	}
	handleInStockChange(inStockOnly) {
		this.setState({
			inStockOnly: inStockOnly
		});
	}
	render() {
		//在父组件中把数据处理完成，然后传递到子组件去，还是把原始数据传到子组件在处理？
		// const filterText = this.state.filterText;
		// const inStockOnly = this.state.inStockOnly;
		// let filteredProducts = this.props.products.filter((product) => {
		// 	return (product.name.indexOf(filterText) !== -1) && (!inStockOnly || (inStockOnly && product.stocked));
		// });
		return (//只设置state，未设置onchange方法，form表单元素只读
			<div>
				<SearchBar 
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
					onFilterTextChange={this.handleFilterTextChange}
					onInStockChange={this.handleInStockChange}
				/>
				<ProductTable 
					products={this.props.products} 
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
				/>
			</div>
		);
	}
}

//一个模块就是一个独立的文件，文件内的所有变量外部无法获取，如果想要外部能够读取模块内的变量，需要使用export关键字输出该变量
//export输出变量使用时需要知道输出的变量名
//export default输出一个叫做default的变量，不需要知道输出的变量名
export default FilterableProductTable;


//单页面应用，加载单个页面，以及运行程序所需的必要资源（如js和css），之后页面的交互都不需要往返server加载资源，即页面不会重新加载，通过js和路由控制页面组件加载

//JSX中编写注释，要用大括号括起来{/* */}

