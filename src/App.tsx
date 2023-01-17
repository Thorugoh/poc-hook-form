/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Provider as PaperProvider, Text} from 'react-native-paper';
import {ControlledForm} from './ControlledForm';
import {UncontrolledForm} from './UncontrolledForm';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const timesRendered = useRef(1);

  console.log('rendered', timesRendered.current);
  timesRendered.current = timesRendered.current + 1;

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.title}>React Hook Forms</Text>
      <View style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" />
        {/* <ControlledForm /> */}
        <UncontrolledForm />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 8,
  },
  container: {
    padding: 16,
    alignContent: 'space-between',
  },
});

export default App;
