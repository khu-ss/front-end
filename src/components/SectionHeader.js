import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";

export default function SectionHeader({ title, subtitle, isSmall }) {
  return (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, isSmall && styles.headerTitleSmall]}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
