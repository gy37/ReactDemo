import React from 'react';
import './Game.css';


function Square(props) {//如果组件中只包含一个render方法，并且不包含state，那么使用函数组件就会更简单
  return (//点击按钮时，调用父组件的onClick方法
    <button className={props.isLine ? "square one-line" : "square"} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {//再回调方法中通过setState更新state后，与state相关的组件都会被更新
    return (//事件监听on[Event]，事件处理handle[Event]
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isLine={this.props.line && this.props.line.indexOf(i) !== -1}
      />
    );
  }
  renderBoard(count) {//3.使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
    let board = [];
    for (let i = 0; i < count; i++) {
      let row = [];
      for (let j = 0; j < count; j++) {
        row.push(this.renderSquare(i * count + j));
      }
      board.push(<div key={i}>{row}</div>);//不要先创建父组件在插入子组件，而是等组织好子组件后一起放到父组件里
    }
    return board;
  }

  render() {
    return (
      <div>
        {this.renderBoard(3)}
      </div>
    );
  }
}

export class Game extends React.Component {
  constructor(props) {//class的构造函数中都必须先调用super
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: -1//1.在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。
      }],//记录每一步squares的值
      xIsNext: true,//下一步是不是X
      stepNumber: 0,//当前步数，用于回溯历史,
      isAsc: true//是否是升序
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);//设置history为0到stepNumber
    const current = history[history.length - 1];//history中的最新值
    const squares = current.squares.slice();//slice不会修改原数组，而是返回一个子数组，防止修改history中的值
    if (this.calculateWinner(squares) || squares[i]) {//如果胜利，或者方格内有值
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';//点击的值记录在squares中
    this.setState({//点击之后，把修改后的squares保存到history中
      history: history.concat([{//concat拼接数组，不会改变现有数组
        squares: squares,
        position: i
      }]),
      xIsNext: !this.state.xIsNext,//修改下一步的值
      stepNumber: history.length,//修改step为history长度
    });
  }

  calculateWinner(squares) {//计算是否胜利
    const lines = [//胜利所有可能的情况
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {//遍历每一种情况
      const [a, b, c] = lines[i];//某一种情况相同点的位置
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {//squares中指定位置[a,b,c]的值相等
        return {
          winner: squares[a],
          line: [a, b, c]
        };
      }
    }
    return null;
  }

  jumpTo(step) {//跳转历史位置
    this.setState({
      stepNumber: step,//设置step为点击的历史记录编号
      xIsNext: (step % 2) === 0//设置是否是X标记
    });
  }

  changeOrder() {//不要直接修改history的值，用一个标记来控制升序降序
    this.setState({isAsc: !this.state.isAsc});
  }

  render() {
    const history = this.state.history;//历史记录
    const current = history[this.state.stepNumber];//当前记录
    const winner = this.calculateWinner(current.squares);//胜者

    let moves = history.map((step, move) => {//array.map(function(currentValue,index,arr), thisValue)，当前值，索引值，数组对象
      const position = '(' + step.position%3 + ', ' + Math.floor(step.position/3) + ')';
      const desc = move ?
        'Go to move #' + move + ' ' + position:
        'Go to game start';
      return (//动态构建列表时，要制定一个合适的key
          <li key={move} className={move === this.state.stepNumber ? 'select-text' : ''}>
            <button className={move === this.state.stepNumber ? 'select-text' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });
    //根据标记来排元素，不要直接更改数据，更改完后影响比较大（和iOS的相反，类似MVVM中的VM，把VM看做一个整体处理）
    if (!this.state.isAsc) {//4.添加一个可以升序或降序显示历史记录的按钮。
      moves.reverse();//reverse数组翻转
    }

    let status;
    if (winner) {
      status = 'Winner: ' + winner.winner;
    } else if (history.length < 9) {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    } else {
      status = 'No Winner';
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            line={winner ? winner.line : null}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
        <div className="history-info">
          <button onClick={() => this.changeOrder()}>{this.state.isAsc ? "降序查看" : "升序查看"}</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
