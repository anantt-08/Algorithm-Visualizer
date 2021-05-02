import React, { Suspense, lazy } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import VisualizerController from './VisualizerController.js';
import SortingVisualizer from './SortingVisualizer.js'
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Path from './Path';
import Spinner from "./spinner";
const Home = lazy(() => import("./Home"));

const Homee = () => (
  <Suspense fallback={<Spinner />}>
    <Home />
  </Suspense>
);

class App extends React.Component  
{
constructor()
{
super();
this.state={
default:{
sortingAlgorithm:'Bubble Sort',
size:'15',
speed:'Fast',
barColor:'Blue',
pointerColor:'Red',
sortedColor:'Green',
sort:false,
randomize:true
},
sorted:false
};
}
controllerDataHandler = (e) => {
this.setState(
{
default:{
sortingAlgorithm:e['sortingAlgorithm'],
size:e['size'],
speed:e['speed'],
barColor:e['barColor'],
pointerColor:e['pointerColor'],
sortedColor:e['sortedColor'],
sort:e['sort'],
randomize:e['randomize']
},
sorted:false
},
function()
{
if(e['sort']===true) 
{
var element = document.getElementById('sortingVisualizer');
element.scrollIntoView({behavior:'smooth' , block : 'start'});
}
}
);
}
visualizerDataHandler = (e) => {
this.setState({sorted:e});
}




render()
{
return(
    <Router>
        <Switch>
          <Route path="/sort">
            
         
<div className="App">
<Container fluid> 
<Row><Col><p style={{color:'white'}}></p></Col></Row>
<Row  xl={2} lg={2} md={2} sm={1} xs={1}>
<Col  xl={4} lg={4} md={4}><VisualizerController controllerDataHandler={this.controllerDataHandler} visualizerData={this.state.sorted}>{this.state.sorted}</VisualizerController></Col>
<Col id='sortingVisualizer'><SortingVisualizer visualizerDataHandler={this.visualizerDataHandler} controllerData={this.state.default}></SortingVisualizer></Col>
</Row>
<Row xl={1} lg={1} md={1} sm={1} xs={1}>
<Col><h6>Author : Jayant Gangwani</h6></Col>
</Row>
</Container>
</div>
</Route>
          <Route path="/path">
            <Path />
          </Route>
          <Route path="/" component={ Homee  } />
        </Switch>
</Router>
)
}
}
export default App;