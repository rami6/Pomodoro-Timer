import React, { Component } from 'react';
import Timer from './Timer';
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

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      statusOngoing: true,
      workingTime: 25,
      breakTime: 5,
      isStarted: false,
      isWorking: true,
      countdownSec: null,
      min: '00',
      sec: '00',
    };
  }

  componentDidMount() {
    if (this.state.isWorking) {
      this.setState({
        countdownSec: this.state.workingTime * 60,
        min: this.getTwoDigitsStr(this.state.workingTime),
      });
    } else {
      this.setState({
        countdownSec: this.state.breakTime * 60,
        min: this.getTwoDigitsStr(this.state.breakTime),
      });
    }
  }

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
      isStarted: false,
    });
    clearInterval(this.interval);
  }

  startCountdown() {
    this.setState({
      isStarted: true,
    });
    this.interval = setInterval(this.count, 1000);
  }

  getTwoDigitsStr = num => {
    numStr = num.toString();
    if (Math.floor(num / 10) == 0) {
      return '0' + numStr;
    }
    return numStr;
  };

  setTimerView = () => {
    let minNum = Math.floor(this.state.countdownSec / 60);
    let secNum = this.state.countdownSec % 60;
    let minStr = this.getTwoDigitsStr(minNum);
    let secStr = this.getTwoDigitsStr(secNum);

    this.setState({
      min: minStr,
      sec: secStr,
    });
  };

  count = () => {
    this.setState(prevState => ({
      countdownSec: prevState.countdownSec - 1,
    }));

    this.setTimerView();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 50 }}>AMA Timer</Text>
        <Text style={{ fontSize: 20 }}>Working time (min): </Text>
        <TextInput
          style={styles.input}
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
          onchangText={breakTime =>
            this.setState({
              breakTime,
            })
          }
          value={this.state.breakTime}
        />

        <Text style={{ fontSize: 30 }}>
          {this.state.statusOngoing ? 'Working Time' : 'Break Time'}
        </Text>

        <Timer min={this.state.min} sec={this.state.sec} />

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    fontSize: 40,
    padding: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 200,
    fontSize: 25,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
});
