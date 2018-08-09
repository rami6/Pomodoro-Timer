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
// import {vibrate} from './utils';

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingText: true,
    };

    setInterval(() => {
      this.setState(previousState => {
        return { isShowingText: !previousState.isShowingText };
      });
    }, 1000);
  }

  render() {
    let display = this.state.isShowingText ? this.props.text : ' ';
    return <Text>{display}</Text>;
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      workingTime: 20,
      breakTime: 5,
      isStarted: false,
      isWorking: true,
      countdownSec: null,
      min: '00',
      sec: '00',
    };
    this.setWorkingTime = this.setWorkingTime.bind(this);
  }

  // vibrate();

  componentDidMount() {
    this.setStartMin();
  }

  handleClick(event) {
    if (this.state.isStarted == true) {
      this.stopCountdown();
    } else {
      this.startCountdown();
    }
  }

  handleReset() {
    this.setStartMin();
  }

  setStartMin() {
    if (this.state.isWorking) {
      this.setState({
        countdownSec: this.state.workingTime * 60,
        min: this.getTwoDigitsStr(this.state.workingTime),
        sec: '00',
      });
    } else {
      this.setState({
        countdownSec: this.state.breakTime * 60,
        min: this.getTwoDigitsStr(this.state.breakTime),
        sec: '00',
      });
    }
  }

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

  setWorkingTime(newWorkingTime) {
    this.setState({
      workingTime: newWorkingTime,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 50 }}>AMA Timer</Text>
        <Text style={{ fontSize: 20 }}>Working time (min): </Text>
        <TextInput
          id="w"
          style={styles.input}
          type="number"
          placeholder="Enter time in minutes"
          onChangeText={this.setWorkingTime}
          value={this.state.workingTime}
        />

        <Text style={{ fontSize: 20 }}>Break time (min): </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter time in minutes"
          onChangeText={breakTime =>
            this.setState({
              breakTime,
            })
          }
          value={this.state.breakTime}
        />

        <Blink
          style={styles.blink}
          text={this.state.isWorking ? 'Working Time' : 'Break Time'}
        />

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
  input: {
    height: 40,
    width: 200,
    fontSize: 25,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  blink: {},
});
