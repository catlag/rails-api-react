import ReactDOM from 'react-dom'
import createReactClass from'create-react-class'
import './stylesheets/project.css';

import React, { Component } from 'react';

class ProjectImage extends React.Component{
  hoverOn = () => {
    this.props.onHoverFunction(this.props.project.replace(" ", "_"))
  }
  hoverOff = () => {
    console.log('mouse leave')
    this.props.onHoverOffFunction()
  }
  render(){
    return (
    <div className="project" onMouseEnter={this.hoverOn}
        onMouseLeave={this.hoverOff}>
      <a href={this.props.project.toLowerCase().replace(" ", "_")}>
        <img className="project-cover" src='http://via.placeholder.com/200x200'/>
        
      </a>
    </div>
  )}
}



class ProjectList extends React.Component {
  constructor(){
      super();
      this.handleHoverOn = this.handleHoverOn.bind(this);
      this.handleHoverOff = this.handleHoverOff.bind(this);
      this.state = {
        showIllustration: false,
        showGraphicDesign: false,
        showGameDesign: false,
        height: 0,
        width: 0
      };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  handleHoverOn = (type) =>{
    console.log(type)
    if (type === 'Illustration'){
      this.setState({showIllustration: true});
    
    }
    if (type === 'Graphic_Design'){
      this.setState({showGraphicDesign: true});
    
    }

      if (type === 'Game_Design'){
      this.setState({showGameDesign: true});
    
    }
      
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    if (window.innerWidth < 700){
      this.setState({  
        showIllustration  : true,
        showGraphicDesign : true,
        showGameDesign    : true
      });
    }else{
      this.setState({  
        showIllustration  : true,
        showGraphicDesign : true,
        showGameDesign    : true
      });
    }
    // this.setState({ width: window.innerWidth, height: window.innerHeight});
  }

  handleHoverOff = () => {
    console.log('off')
      this.setState({showIllustration: false});
      this.setState({showGameDesign: false})
      this.setState({showGraphicDesign: false})
      
  }


  render() {
    const projectsList = ['Illustration', 'Game Design', 'Graphic Design']
    return (

      <div className='projects'>
        <div className='project-wrapper'>
          <ProjectImage project={'Illustration'} onHoverFunction={this.handleHoverOn} onHoverOffFunction={this.handleHoverOff}/ >
          {this.state.showIllustration && <Illustration/>}
          {/*<Illustration/>*/}
        </div>
        <div className='project-wrapper'>
          <ProjectImage project={'Game Design'} onHoverFunction={this.handleHoverOn} onHoverOffFunction={this.handleHoverOff}/>
          {this.state.showGameDesign && <GameDesign/>}
        </div>
        <div className='project-wrapper'>
          <ProjectImage project={'Graphic Design'} onHoverFunction={this.handleHoverOn} onHoverOffFunction={this.handleHoverOff}/>
          {this.state.showGraphicDesign && <GraphicDesign/>}
        </div>
      </div>
    )
  }
}


{/*ReactDOM.render( <RobotBox/>, target );*/}


const Illustration = () => (
  <p className="project-title">Illustration</p>
)
const GameDesign = () => (
  <p className="project-title">Game Design</p>
)
const GraphicDesign = () => (
  <p className="project-title">Graphic Design</p>
)


export default ProjectList;