import React from "react";
import { View } from "react-native";
import styles from "../styles/styles";

export default function ProgressBar({ value }) {
  const safeValue = Math.min(100, Math.max(0, Number(value || 0)));

  return (
    <View style={styles.progressOuter}>
      <View style={[styles.progressInner, { width: `${safeValue}%` }]} />
    </View>
  );
}
