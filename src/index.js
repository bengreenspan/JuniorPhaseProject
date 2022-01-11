import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class App extends Component{
  constructor(){
    super();
    this.state = {
      students: [],
      campuses: [],
      loading: true
    };
  }
  async componentDidMount(){
    this.setState({
        students: (await axios.get('/api/student')).data,
        campuses: (await axios.get('/api/campus')).data,
      loading: false
    });

  }
  render(){
    const { students, campuses, loading } = this.state;
    if(loading){
      return '....loading';
    }
    return (
        <>
        <ul>
        {
          students.map( student => { 
            return (
              <li key={ student.id }>
                { student.name }
              </li>
            );
          })
        }
      </ul>
      <ul>
        {
          campuses.map( campus => { 
            return (
              <li key={ campus.id }>
                { campus.name }
              </li>
            );
          })
        }
      </ul>
      </>
    );
  }
}

render(<App />, document.querySelector('#root'));