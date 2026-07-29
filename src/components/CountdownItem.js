import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/styles";
import ProgressBar from "./ProgressBar";
import { getDaysLeft, displayDate } from "../utils/jalali";
import { toPersianDigits } from "../utils/number";

export default function CountdownItem({ course, compact = false, isVerySmall = false }) {
  const days = course.daysLeft ?? getDaysLeft(course.examDate);
  const isPast = days !== null && days < 0;
  const isUrgent = days !== null && days >= 0 && days <= 7;

  return (
    <View
      key={course.id}
      style={[
        styles.countdownItem,
        isUrgent && styles.countdownUrgent,
        isPast && styles.countdownPast,
      ]}
    >
      <View style={[styles.countdownBadge, isVerySmall && styles.countdownBadgeSmall]}>
        <Text style={[styles.countdownNumber, isVerySmall && styles.countdownNumberSmall]}>
          {days === null ? "؟" : days < 0 ? "گذشته" : toPersianDigits(days)}
        </Text>
        <Text style={styles.countdownUnit}>{days === null || days < 0 ? "" : "روز"}</Text>
      </View>

      <View style={styles.countdownInfo}>
        <Text style={styles.itemTitle}>{course.title}</Text>
        <Text style={styles.itemSubtitle}>امتحان: {displayDate(course.examDate)}</Text>
        {!compact ? (
          <>
            <Text style={styles.itemSubtitle}>پیشرفت: {toPersianDigits(course.progress)}٪</Text>
            <ProgressBar value={course.progress} />
          </>
        ) : null}
      </View>
    </View>
  );
}
