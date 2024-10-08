import './App.css';
import Bar from './components/Bar';
import React, { Component } from 'react';
import { PlayCircleOutline } from '@mui/icons-material';
import { SkipNextRounded } from '@mui/icons-material';
import { SkipPreviousRounded } from '@mui/icons-material';
import { RotateLeft } from '@mui/icons-material';
import BubbleSort from './algorithms/BubbleSort';
import SelectionSort from './algorithms/SelectionSort';
import InsertionSort from './algorithms/InsertionSort';

class App extends Component{
  state = { 
    array:[],
    arraySteps: [],
    colorKey:[],
    colorSteps: [],
    currentStep: 0,
    count: 10,
    delay: 300,
    algorithm: 'Bubble Sort',
    timeouts: [],
  };

  ALGORITHMS = {
    'Bubble Sort' : BubbleSort,
    'Selection Sort' : SelectionSort,
    'Insertion Sort': InsertionSort,
  }

  componentDidMount() {
    this.generateRandomArray();
  }

  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);

    this.setState({
      arraySteps: steps,
      colorSteps: colorSteps
    });
  }

  randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  } 

  //generate random array and set the state above
  generateRandomArray = () => {
    this.clearTimeouts();
    this.clearColorKey();
    const count = this.state.count;
    const temp = [];

    for (let i = 0; i < count; i++) {
      temp.push(this.randomNum(50, 200));
    }

    this.setState({
      array: temp,
      arraySteps: [temp],
      currentStep: 0,
    }, 
    () => {
      this.generateSteps();
    });
  };

  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);
    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey]
    })
  }

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: []
    });
  };

  changeArray = (index, value) => {
    let arr = this.state.array;
    arr[index] = value;
    this.setState({
      array: arr,
      arraySteps: [arr],
      currentStep: 0,
    }, () => {
      this.generateSteps();
    });
  };

  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) {
      return;
    }
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep]
    })
  }

  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.state.arraySteps.length - 1) {
      return;
    }
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep]
    })
  }

  start = () => {
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();

    let timeouts = [];
    let i = 0;
    console.log(`Using algorithm: ${this.state.algorithm}`);


    while(i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep  + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
    }
    this.setState({
      timeouts: timeouts,
    });
  }
  
  changeAlgorithm = (event) => {
    this.clearTimeouts();
		this.clearColorKey();
		this.setState(
			{
				algorithm: event.target.value,
				currentStep: 0,
				arraySteps: [
					this.state.arraySteps[
						this.state.currentStep === 0 ? 0 : this.state.currentStep - 1
					],
				],
			},
			() => this.generateSteps()
		);
  };

  render() {
    let bars = this.state.array.map((value, index) => (
      <Bar 
        key={index} 
        index={index} 
        length={value} 
        color={this.state.colorKey[index]}
        changeArray={this.changeArray}
      />
    ));

    let playButton;
    if (this.state.arraySteps.length === this.state.currentStep) {
      playButton = (
        <button className='controller' onClick={this.generateRandomArray}>
          <RotateLeft />
        </button> 
      )
    } else {
      playButton = (
        <button className='controller' onClick = {this.start}>
          <PlayCircleOutline />
        </button> 
      )
    }
    return <div className='app'>
      <div className="pannel">
      <div className="algorithm-selector">
          <label htmlFor="algorithm">Choose Algorithm:</label>
          <select id="algorithm" value={this.state.algorithm} onChange={this.changeAlgorithm}>
            {Object.keys(this.ALGORITHMS).map((alg) => (
              <option key={alg} value={alg}>{alg}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="frame">
        <div className="barsDive container card">{bars}</div>
      </div>
      <div className="control-pannel">
        <div className="control-buttons">
          <button className='controller' onClick={this.previousStep}>
            <SkipPreviousRounded />
          </button>
          {playButton}
          <button className='controller' onClick={this.nextStep}>
            <SkipNextRounded />
          </button>
        </div>
      </div>
     
    </div>;
  }
}

export default App;
