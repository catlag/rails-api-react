import ReactDOM from 'react-dom'
import createReactClass from'create-react-class';
import './stylesheets/main.css';

import React, { Component } from 'react';

class AddForm extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        mulitple  : false,
        type      : 'single',
        urls      : []
      };
    }

  onClickHandler = () => {
    this.props.onClickFunction()
  }

  handleChange = (event) => {
    this.setState({urls: event.target.value});
  }
  handlTypeChange = (event) =>  {
    this.setState({type: event.target.value});
  }

  handleSubmit = (event) =>  {
    this.props.onClickFunction(this.state.type, this.state.urls)
    event.preventDefault();
  }

  render() {
    return (
      <div className="">
        <div className=''>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <select value={this.state.type} onChange={this.handleTypeChange}>
                <option value="single">Single</option>
                <option value="multiple">Multiple</option>
                <option value="pdf">Pdf</option>
              </select>
              {
                this.state.mulitple && (
                  <input className="form-control" className='name' placeholder="name"  ></input>
                  )
              }
              <input className="form-control" class='url' placeholder="url" value={this.state.urls} onChange={this.handleChange}></input>
              <input type="submit" value='Add'/>
            </div>
          </form>
        </div>


      </div>
    );
  }
}

export default AddForm;