import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import styles from "../styles/styles";

export default function CourseSelector({ courses, selectedId, onSelect }) {
  if (courses.length === 0) {
    return <Text style={styles.text}>برای این بخش، اول یک درس اضافه کن.</Text>;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.courseSelector}
    >
      {courses.map((course) => (
        <TouchableOpacity
          key={course.id}
          style={[
            styles.courseChip,
            selectedId === course.id && styles.courseChipActive,
          ]}
          onPress={() => onSelect(course.id)}
        >
          <Text
            style={[
              styles.courseChipText,
              selectedId === course.id && styles.courseChipTextActive,
            ]}
          >
            {course.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
