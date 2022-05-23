import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
} from 'react-native';
import React from 'react';

const Formheader = ({
  leftHeading,
  rightHeading,
  subHeading,
  leftHeaderTranslateX = 40,
  rightHeaderTranslateY = -20,
  rightHeaderOpacity = 0,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.heading,
            {transform: [{translateX: leftHeaderTranslateX}]},
          ]}>
          {leftHeading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity: rightHeaderOpacity,
              transform: [{translateY: rightHeaderTranslateY}],
            },
          ]}>
          {rightHeading}
        </Animated.Text>
      </View>
      <View>
        <Animated.Text style={styles.subheading}>{subHeading}</Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1b1b33',
  },
  subheading: {
    fontSize: 18,
    color: '#1b1b33',
    textAlign: 'center',
  },
});

export default Formheader;
