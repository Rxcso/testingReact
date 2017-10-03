import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const json = require('./j1.json');

/*
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}



class Board extends React.Component {

  renderSquare(i) {
    return (
    <Square 
    value={this.props.squares[i]} 
    onClick={() => this.props.onClick(i)}
    />);
  }
  
  

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber:0,
      xIsNext: true 
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ 
      history: history.concat([
        {
        squares:squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    
  }



  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner ;
    } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        for(var elem in json){
            status = status +" "+json[elem];
        }
       ;
    }
  
  
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={i=> this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

*/

function CountryLine(props) {
  return (
    <tr onClick={props.onClick} key={props.obj.pais}  className={ props.obj.pos%2?"par" :"impar" } >
    <td>
      <div className="col-xs-2">
      <img src={props.obj.url} /></div>
      <div className="col-xs-9"> <span> { props.obj.pais}</span></div></td>
    <td>{props.obj.pj}</td>
    <td>{props.obj.ptos}</td>

    </tr>
  );
}



class Table extends React.Component {
  constructor() {
    super();
    this.state = { "pais": ""
   };
  }

  render(){
    const paises = json.paises;
    const llave = this.props.valor;

    let pos=0;
    for (; pos < paises.length; pos++) {
      if(paises[pos].pais===llave) break;
    }

    
    if(pos===paises.length){

      let listapaises = paises.map( (obj)=>{
        return (
          <CountryLine obj={obj}  onClick={ ()=> this.props.onClick(obj.pais) }/>
        );
      } 
      );

      return(
        <div className="todo1">
        <table className="tabla-res">
          <tr >
            <th className="col-xs-6"><center>Pais</center> </th>
            <th >PJ </th>
            <th >Ptos</th>
            </tr>
          {listapaises}
        </table>
        </div>
      )
    }
    else{
      // Estamos en algun pais

      const lista = [1,2,3,4,6,7,8,9,1];
      
      return(
        <div className="todo1">
          <div onClick={()=>this.props.onClick("")} > {"< Volver"} </div>
          <div><img src={paises[pos].url } /> {paises[pos].pais} </div>
          <div>Sus probabilidads de clasificar son 50%</div>
          <div className="footer">
            *Para el calculo se ha considerado victoria, empate y derrota igual de probables
          </div>
        </div>


      ); 
    }

  }

}



class Pagina extends React.Component {
  constructor() {
    super();
    this.state={"llave":""};
    //console.log("creando");
  }

  click(val){
    this.setState({"llave":val})
    //console.log("click");
    //console.log(val);
  }

  render(){
    //console.log("llave en pag "+this.state.llave);
    return(
        
        <CSSTransitionGroup
          transitionName= {  this.state.llave!==""?"background":"example"}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          <Table  key={this.state.llave} valor={this.state.llave} onClick={ (val)=> this.click(val) }/>
        </CSSTransitionGroup>
    );
  }


}

ReactDOM.render(
  
<Pagina />,
document.getElementById('root')
)




