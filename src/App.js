import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      list:[
        {
          name: 'Ali',
          age: 20,
          active: true
        },
        {
          name: 'Ahmad',
          age: 20,
          active: true
        },
        {
          name: 'Usama',
          age: 20,
          active: false
        },
        {
          name: 'Sarmad',
          age: 21,
          active: false
        },
        {
          name: 'Ajmal',
          age: 28,
          active: true
        },
        {
          name: 'sameen',
          age: 26,
          active: true
        },
        {
          name: 'jamal',
          age: 51,
          active: false
        } 
      ],
      numlist : [1,2,3,7],    //,5,6,7,8,9]
      data : []
    }
  }
  
  async componentDidMount(){
    try{
      const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`);
      if(!response.ok){
        throw Error (response.statusText);
      }
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    }

  }


  composeFunctionsTest = (num = 2) => {
    const compose = (...fns) => x => fns.reduceRight((v,f) => f(v),x);

    const add1 = n => n+1;
    const double = n => n*2;

    const add1thenDouble = compose(
      double,
      add1
    );
    return add1thenDouble(num);
  }

  returningPromise = (num) =>{
    console.log("In returningPromise(), receiving num : " + num);
    return new Promise((resolve,reject)=>{
      num > 0 ? resolve(num*num) : reject(new Error ("Number is less than 1"));
    });
  }

  chainingPromisesTest = () => {
    this.state.numlist.reduce((promise, num) => {
    return promise.then(_ => this.returningPromise(num));
    }, Promise.resolve())
  }
  render() {
    return (
      <div className="App">
        <h1>Hi my name is Lorem</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
           Minima harum quis architecto aliquid deleniti enim ut asperiores cum voluptate soluta, 
           consequatur error iusto alias neque quasi perferendis? Reprehenderit, 
           ratione corrupti!
        </p>
        <h2>Practice from the <a href="https://medium.com/jsguru/javascript-functional-programming-map-filter-and-reduce-846ff9ba492d">Funtional Programming link 1</a></h2>
        <h2>Map</h2>
        <div>
          {
            this.state.list.map(item => <li>{item.name},{item.age}</li> ) 
          }
        </div>
        <h2>Filter</h2>
        <div>
          {
          this.state.list.filter(item => item.active === true )
          .map(item => <li>{item.name}, {item.age} </li>)
          }
        </div>
        <h2>Reduce</h2>
        <div>
          {
            this.state.numlist.reduce((sum,value) => sum + value,0)
          }
        </div>
        <h2>Compose Functions</h2>
        <div>
          {
            this.composeFunctionsTest()
          }
        </div>
        <h2>Chaining Promises</h2>
        <div>
          {
            console.log(this.chainingPromisesTest())
          }
          <p>Check the Console for Output.</p>
        </div>
        <h2>Async\Await</h2>
        <p>Following data is coming from <a href="https://api.coinmarketcap.com/v1/ticker/?limit=10">this</a> API </p>
        <div>
            {
              this.state.data.map(el => (
                <li>{el.name}: {el.price_usd}</li>
              ))
            }
        </div>


      </div>
    );
  }
}

export default App;
