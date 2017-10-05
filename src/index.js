import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const jsondata = require('./outfin.json');
const paises = jsondata.paises;
const DIm = {};

for( var it in paises ){
    DIm[paises[it].pais] = paises[it].url;    
}

const res=["V","E","D"];
const puntaje={ "V":3, "E":1, "D": 0 };

let todores=[];

for(var e1 in res)for(var e2 in res){
  todores.push(res[e1]+res[e2])  ;
}

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
    <tr  key={props.obj.pais}  className={ props.obj.pos%2?"par" :"impar" } >
    <td>
      <div className="col-xs-2">
      <img src={DIm[props.obj.pais]} /></div>
      <div className="col-xs-9"> <span> { props.obj.pais}</span></div></td>
    <td>{ props.obj.punt} </td>
    <td> <div onClick={props.onClick} className="btn btn-primary">></div> </td>
    </tr> 
  );
}

function Probabilidad(props) {
  let cod = props.cod;
  let pos = props.pos;
  return (
    <tr onClick={props.onClick}  className={ todores[props.cod]%2?"par" :"impar" } >
    <td> {cod[0]} </td>
    <td> {cod[1]} </td>  
    <td> +{ puntaje[cod[0]] +  puntaje[cod[1]]  } </td>
    <td> { (props.data != null)? parseFloat( props.data.prob*1.00 ).toFixed(2): 0.00}% </td>
    </tr>
  );
}
/*
function Partido(props) {
  
  return (
      <div>
        <img src={DIm[props.obj.pa1]} style={ {"border": (props.obj.p1>props.obj.p2?"2px solid yellow":"") } }/> _ <img src={DIm[props.obj.pa2]} style={ {"border": (props.obj.p2>props.obj.p1?"2px solid yellow":"") } }/>
      </div>
  );
}


class ResFecha extends React.Component {
  constructor() {
    super();
    this.state = { "linkable": true };
  }

  render(){
      const resFecha = this.props.resFecha;

      let listapartidos = resFecha.map( (obj)=>{
        return (
          <Partido obj={obj} />
        );
      } 
      );

      return(
          {listapartidos}
      )
    }    
}

class ResMasTabla extends React.Component {
  constructor() {
    super();
    this.state = { "linkable": true };
  }

  render(){
      var cod = this.props.cod;
      var pos = this.props.pos;
      
      if( this.props.vistatabla ){
        let resFecha =  paises[pos]["probs"][cod].obj.Resultados
        let tablaAct =  paises[pos]["probs"][cod].obj.Tabla

      return(

        <div>
          <div className="col-md-6" >
            <ResFecha resFecha={resFecha} />
          </div>
          <div className="col-md-6" >
            <TablaPos tablaAct={tablaAct} />
          </div>
          </div>
      );
      }
      else
      return(

        <div>
          </div>
      );
    }    
}
*/

class TablaPos extends React.Component {
  constructor() {
    super();
    this.state = { "linkable": true };
  }

  render(){
      const tablaAct = this.props.tablaAct;

      let listapaises = tablaAct.map( (obj)=>{
        return (
          <CountryLine obj={obj}  onClick={ ()=> this.state.linkable? this.props.onClick(obj.pais): ( (it)=>(it) ) }/>
        );
      } 
      );

      return(

        <table className="tabla-res">
          <tr >
            <th className="col-xs-8"><center>Pais</center> </th>
            <th >Ptos</th>
            </tr>
          {listapaises}
        </table>
      )
    }    
}

class TablaPosibilidades extends React.Component {
  constructor() {
    super();
    this.state = { "vistatabla":false, "cod":"" };
  }

  click(cod){
    var pos = this.props.pos;
    var estado = this.state;
    
    if(  paises[pos]["probs"][cod].prob > 0.001 ){
        estado.vistatabla=true;
        estado.cod=cod;
    }
    else{
      estado.vistatabla =false;
      estado.cod="";
    }

    this.setState(estado);  
  }

  render(){
      var pos = this.props.pos;
      

      if( paises[pos].pais=="Brasil" )
      return(<div>Ya esta clasificado</div>);

      if( paises[pos].pais=="Bolivia" ||  paises[pos].pais=="Venezuela"  )
      return(<div>Ya esta eliminado</div>);

      
      let midata = paises[pos].probs;

      var listaprobs = todores.map( (cod)=>{
        return(
<Probabilidad cod={cod} pos={pos} data={midata[cod]} onClick={this.click( cod ) } />
        ) } );

      let lista=[0,1];
      let duelos = lista.map( (obj)=>{
        return (
          <th colspan="1">
            ({ paises[pos].localia[obj] })
            <img src={ DIm[paises[pos].proximos[obj]] } />
            </th>        );
      });
      
      return(

        <div>
        <table className="tabla-res">
          <tr >
            <th className="col-xs-6" colSpan="2" ><center>Duelos</center> </th>
            <th rowSpan="2">Puntos</th>
            <th rowSpan="2">Probabilidad</th>
          </tr>
          <tr>
            {duelos}
            </tr>
          
          {listaprobs}
        </table>        
        
        </div>
      )
    }    

}

class Table extends React.Component {
  constructor() {
    super();
    this.state = { "pais": ""
   };
  }

  render(){
    const llave = this.props.valor;

    let pos=0;
    for (; pos < jsondata.paises.length; pos++) {
      if(paises[pos].pais===llave) break;
    }
    
    if(pos===paises.length){
      return(
        <div className="todo1">
        <TablaPos tablaAct={jsondata.tabla} onClick={this.props.onClick}/>
        </div>
      );
    }
    else{
      // Estamos en algun pais
      let lista=[0,1];
      let duelos = lista.map( (obj)=>{
        return (
          <div>
            ({ paises[pos].localia[obj] })
            <img src={ DIm[paises[pos].proximos[obj]] } />
            </div>        );
      });

      return(
        <div className="todo1">
          <div className="probas">
          <div className="btn btn-primary" onClick={()=>this.props.onClick("")} > {"< Volver"} </div>
          <div><img src={paises[pos].url } /> {paises[pos].pais} </div>
          <div>Juega contra</div>
          <div>
            {duelos}
          </div>
          <TablaPosibilidades pos={pos}/>
          <div className="footer">
            *Para el calculo se ha considerado victoria, empate y derrota igual de probables
          
          </div>
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
          <Table  key={this.state.llave} valor={this.state.llave}  onClick={ (val)=> this.click(val) }/>
        </CSSTransitionGroup>
    );
  }


}

ReactDOM.render(
  
<Pagina />,
document.getElementById('root')
)




