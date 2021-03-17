import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';

const minutesToMs = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const [ms, setMs] = useState(null);

  const minute = Math.floor(ms / 1000 / 60) % 60;
  const seconds = Math.floor(ms / 1000) % 60;

  const countDown = () => {
    setMs((time) => {
      if (time === 0) {
        clearInterval(interval.current);

        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    onProgress(ms / minutesToMs(minutes));
    if (ms === 0) {
      onEnd();
    }
  }, [ms]);

  useEffect(() => {
    setMs(minutesToMs(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    margin: 10,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: spacing.xxxl,
    backgroundColor: 'rgba(94, 132,226, 0.3)',
  },
});
