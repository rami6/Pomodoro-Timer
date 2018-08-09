import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  timer: {
    color: 'tomato',
    fontSize: 75,
    textAlign: 'center',
    margin: 10,
  },
});

const Timer = props => (
  <View>
    <Text style={styles.timer}>
      {props.min} : {props.sec}
    </Text>
  </View>
);

export default Timer;
