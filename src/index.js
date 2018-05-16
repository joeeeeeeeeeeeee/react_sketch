import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Container extends React.Component{
  constructor(){
    super();
    this.state = {
       colorValue: `red`,
       size: 30,
    }
    this.colorChange = this.colorChange.bind(this);
    this.sizeChange  = this.sizeChange.bind(this);
  }
  colorChange(event) {
    this.setState({colorValue: event.target.value});
  }

  sizeChange(event) {
    let size = event.target.value;
    if (size > 120 || size< 0){
      alert("number but be in the range 0 - 120");
    }
    else{
      this.setState({size: size});
    }
  }  
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
      return color;
    }
  
  renderSquare() {
    return React.createElement('div', {
      onMouseEnter: (e)=>{
        let color = this.state.colorValue
        if(this.state.colorValue === "random"){
          color = this.getRandomColor();
        }
        e.currentTarget.style.backgroundColor = `${color}`;
      },
    })
  }
  
  renderGrid() {
    let squares = [];
    for(let i = 0; i <Math.pow(this.state.size,2); i++){
      squares.push(this.renderSquare())    
    }
    return React.createElement('div',{
      id: "grid",
      style: {
        gridTemplateRows: `repeat(${this.state.size}, ${400/this.state.size}px)`,
        gridTemplateColumns: `repeat(${this.state.size}, ${400/this.state.size}px)`,
      }
    },
    squares
    )}

  render(){
    return(
      <div>
        <h1>React Sketch</h1>
        <h2>A Version of Etch-a-Sketch built with React.JS</h2>
        <div id="controlls">
        <label>Color: </label>
          <select value={this.state.colorValue} onChange={this.colorChange}>
            <option value="red">Red</option>
            <option value="black">Black</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="random">Random</option>
          </select>
          <label>Grid Size</label>
          <input type="number" value={this.state.size} onChange={this.sizeChange}/>
          <button value="0" onClick={this.sizeChange}>Reset</button>
        </div>
        {this.renderGrid()}
      </div>
    )
  }
}

ReactDOM.render(
  <Container />,
  document.getElementById('app')
)


