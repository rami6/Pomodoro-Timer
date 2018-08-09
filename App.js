import React, { Component } from 'react';
import TimerCountdown from 'react-native-timer-countdown';
// import TimerCountdown from "./TimerCountdown";
import {
  View,
  Button,
  Text,
  TextInput,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';
import { Constants } from 'expo';

let timeLeft;
let timeDuration;
let startTime;
let w;

class Blink extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShowingText: true
    };

    setInterval(() => {
      this.setState(
        previousState => {
          return { isShowingText: !previousState.isShowingText };
        }
      )
    }, 1000);
  }

  render() {
    let display = this.state.isShowingText? this.props.text : " ";
    return (
      <Text>{display}</Text>
    )
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      statusOngoing: true,
      workingTime: 0,
      breakTime: 0,
      isStarted: false,
    };
  }

  // timer() {
  //   timeLeft = timeDuration - (((Date.now() - startTime)/1000 | 0);
  //   initialSecondsRemaining={timeLeft * 1000 * 60};
  // }

  handleClick(event) {
    if (this.state.isStarted == true) {
      this.stopCountdown();
    } else {
      this.startCountdown();
    }
  }

  handleReset() {}

  stopCountdown() {
    this.setState({
      workingTime: 0,
      breakTime: 0,
      isStarted: false,
    });
  }

  startCountdown() {
    // startTime = Date.now();
    // timeDuration = this.state.workingTime.value;
    // w = this.state.workingTime;
    this.setState({
      workingTime: this.state.workingTime,
      breakTime: this.state.breakTime,
      isStarted: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
      
        <Text style={{ fontSize: 50 }}>AMA Timer</Text>
        <Text style={{ fontSize: 20 }}>Working time (min): </Text>
        <TextInput
          style={styles.input}
          placeholder='Type here'
          onchangText={workingTime =>
            this.setState({
              workingTime,
            })
          }
          value={this.state.workingTime}
        />

        <Text style={{ fontSize: 20 }}>Break time (min): </Text>
        <TextInput
          style={styles.input}
          placeholder='Type here'
          onchangText={breakTime =>
            this.setState({
              breakTime,
            })
          }
          value={this.state.breakTime}
        />

        <Blink 
          style={styles.blink}
          text={this.state.statusOngoing ? 'Working Time' : 'Break Time'}
        />

        <TimerCountdown
          initialSecondsRemaining={this.state.workingTime * 1000 * 60}
          onTick={secondsRemaining => console.log('tick', secondsRemaining)}
          onTimeElapsed={() => console.log('complete')}
          allowFontScaling={true}
          style={styles.timer}
        />

        <Button
          title={this.state.isStarted ? 'Stop' : 'Start'}
          style={styles.button}
          onPress={() => this.handleClick()}
        />
        <Button
          style={styles.button}
          onPress={() => this.handleReset()}
          title="Reset"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    fontSize: 40,
    padding: 10,
    textAlign: 'center',
  },
  timer: {
    color: 'tomato',
    fontSize: 75,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    width: 200,
    fontSize: 25,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  blink: {
    
  }
});
