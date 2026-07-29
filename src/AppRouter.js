import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Notifications, {
  prepareNotifications,
  buildDateTrigger,
  buildTimeIntervalTrigger,
} from "./utils/notifications";

import { loadJson, saveJson } from "./utils/storage";
import { STORAGE_KEYS, NOTIFICATION_CHANNEL_ID } from "./constants/storage";
import { sampleCourses, sampleTasks, sampleStudyLogs } from "./constants/sampleData";

import {
  getTodayJalaliRaw,
  getTodayJalaliDisplay,
  parseJalaliDateTime,
  cleanJalaliDate,
  parseJalaliDate,
  displayDate,
  getDaysLeft,
  cleanTime,
  formatReminderDateTime,
} from "./utils/jalali";

import { toEnglishDigits, toPersianDigits } from "./utils/number";
import styles from "./styles/styles";
import SectionHeader from "./components/SectionHeader";
import ProgressBar from "./components/ProgressBar";
import CourseSelector from "./components/CourseSelector";
import CountdownItem from "./components/CountdownItem";

if (Platform.OS !== "web") {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export default function AppRouter() {
  const { width } = useWindowDimensions();

  const isVerySmall = width < 360;
  const isWide = width >= 700;
  const statCardWidth = isVerySmall ? "100%" : "48%";
  const navFontSize = isVerySmall ? 10 : 12;

  const [loaded, setLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  const [profile, setProfile] = useState(null);
  const [registerName, setRegisterName] = useState("");
  const [registerField, setRegisterField] = useState("");
  const [registerGoal, setRegisterGoal] = useState("2");

  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [studyLogs, setStudyLogs] = useState([]);
  const [reminders, setReminders] = useState([]);

  const [courseTitle, setCourseTitle] = useState("");
  const [courseExamDate, setCourseExamDate] = useState("");
  const [courseProgress, setCourseProgress] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [selectedStudyCourseId, setSelectedStudyCourseId] = useState("");
  const [studyHoursInput, setStudyHoursInput] = useState("");
  const [studyNote, setStudyNote] = useState("");

  const [reminderCourseId, setReminderCourseId] = useState("");
  const [reminderDate, setReminderDate] = useState(getTodayJalaliRaw());
  const [reminderTime, setReminderTime] = useState("18:00");
  const [reminderMinutes, setReminderMinutes] = useState("60");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function init() {
      const loadedProfile = await loadJson(STORAGE_KEYS.profile, null);
      const loadedCourses = await loadJson(STORAGE_KEYS.courses, []);
      const loadedTasks = await loadJson(STORAGE_KEYS.tasks, []);
      const loadedLogs = await loadJson(STORAGE_KEYS.studyLogs, []);
      const loadedReminders = await loadJson(STORAGE_KEYS.reminders, []);

      setProfile(loadedProfile);
      setCourses(loadedCourses);
      setTasks(loadedTasks);
      setStudyLogs(loadedLogs);
      setReminders(loadedReminders);
      setLoaded(true);
    }

    init();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveJson(STORAGE_KEYS.profile, profile);
  }, [profile, loaded]);

  useEffect(() => {
    if (!loaded) return;
    saveJson(STORAGE_KEYS.courses, courses);
  }, [courses, loaded]);

  useEffect(() => {
    if (!loaded) return;
    saveJson(STORAGE_KEYS.tasks, tasks);
  }, [tasks, loaded]);

  useEffect(() => {
    if (!loaded) return;
    saveJson(STORAGE_KEYS.studyLogs, studyLogs);
  }, [studyLogs, loaded]);

  useEffect(() => {
    if (!loaded) return;
    saveJson(STORAGE_KEYS.reminders, reminders);
  }, [reminders, loaded]);

  useEffect(() => {
    if (Platform.OS === "web") return;

    Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
      name: "Study Reminders",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#2563eb",
      sound: "default",
    });

    const listener = Notifications.addNotificationResponseReceivedListener(() => {
      setActiveTab("study");
    });

    return () => listener.remove();
  }, []);

  useEffect(() => {
    if (courses.length === 0) {
      setSelectedCourseId("");
      setSelectedStudyCourseId("");
      setReminderCourseId("");
      return;
    }

    if (!selectedCourseId || !courses.find((course) => course.id === selectedCourseId)) {
      setSelectedCourseId(courses[0].id);
    }

    if (
      !selectedStudyCourseId ||
      !courses.find((course) => course.id === selectedStudyCourseId)
    ) {
      setSelectedStudyCourseId(courses[0].id);
    }

    if (!reminderCourseId || !courses.find((course) => course.id === reminderCourseId)) {
      setReminderCourseId(courses[0].id);
    }
  }, [courses, selectedCourseId, selectedStudyCourseId, reminderCourseId]);

  const todayRaw = getTodayJalaliRaw();

  const undoneTasks = tasks.filter((task) => !task.done);
  const doneTasks = tasks.filter((task) => task.done);

  const totalStudyHours = useMemo(() => {
    return studyLogs.reduce((sum, log) => sum + Number(log.hours || 0), 0);
  }, [studyLogs]);

  const todayStudyHours = useMemo(() => {
    return studyLogs
      .filter((log) => cleanJalaliDate(log.date) === todayRaw)
      .reduce((sum, log) => sum + Number(log.hours || 0), 0);
  }, [studyLogs, todayRaw]);

  const averageProgress = useMemo(() => {
    if (courses.length === 0) return 0;
    const sum = courses.reduce((total, course) => total + Number(course.progress || 0), 0);
    return Math.round(sum / courses.length);
  }, [courses]);

  function getPriorityInfo(course) {
    const progress = Number(course.progress || 0);
    const days = getDaysLeft(course.examDate);

    const progressScore = 100 - progress;
    const dateScore = days === null ? 20 : Math.max(0, 40 - days) * 2;
    const score = progressScore + dateScore;

    if (days !== null && days < 0) {
      return {
        label: "گذشته",
        description: "تاریخ امتحان گذشته است",
        color: "#64748b",
        backgroundColor: "#f1f5f9",
        borderColor: "#cbd5e1",
        score,
      };
    }

    if (score >= 120 || progress < 35 || (days !== null && days <= 7)) {
      return {
        label: "اولویت بالا",
        description: "نیاز به مطالعه فوری",
        color: "#dc2626",
        backgroundColor: "#fee2e2",
        borderColor: "#fecaca",
        score,
      };
    }

    if (score >= 80 || progress < 65 || (days !== null && days <= 15)) {
      return {
        label: "اولویت متوسط",
        description: "نیاز به برنامه‌ریزی منظم",
        color: "#d97706",
        backgroundColor: "#fef3c7",
        borderColor: "#fde68a",
        score,
      };
    }

    return {
      label: "اولویت پایین",
      description: "وضعیت نسبتاً مناسب",
      color: "#16a34a",
      backgroundColor: "#dcfce7",
      borderColor: "#bbf7d0",
      score,
    };
  }

  const suggestedCourse = useMemo(() => {
    if (courses.length === 0) return null;
    return [...courses].sort((a, b) => {
      return getPriorityInfo(b).score - getPriorityInfo(a).score;
    })[0];
  }, [courses]);

  const nearestExams = useMemo(() => {
    return [...courses]
      .map((course) => ({
        ...course,
        daysLeft: getDaysLeft(course.examDate),
      }))
      .filter((course) => course.daysLeft !== null)
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, [courses]);

  const nextReminder = useMemo(() => {
    const now = new Date();

    return [...reminders]
      .map((reminder) => ({
        ...reminder,
        realDate: parseJalaliDateTime(reminder.date, reminder.time),
      }))
      .filter((reminder) => reminder.realDate && reminder.realDate >= now)
      .sort((a, b) => a.realDate.getTime() - b.realDate.getTime())[0];
  }, [reminders]);

  const nextTask = useMemo(() => {
    if (undoneTasks.length === 0) return null;

    return [...undoneTasks]
      .map((task) => ({
        ...task,
        daysLeft: getDaysLeft(task.dueDate),
      }))
      .sort((a, b) => {
        const da = a.daysLeft === null ? 9999 : a.daysLeft;
        const db = b.daysLeft === null ? 9999 : b.daysLeft;
        return da - db;
      })[0];
  }, [undoneTasks]);

  const achievements = useMemo(() => {
    const todayLogged = todayStudyHours > 0;
    const twoHourDay = todayStudyHours >= 2;
    const totalFive = totalStudyHours >= 5;
    const totalTen = totalStudyHours >= 10;
    const progressHero = averageProgress >= 70;
    const taskMaster = doneTasks.length >= 3;
    const allDone = tasks.length > 0 && undoneTasks.length === 0;
    const hasReminder = reminders.length > 0;

    const examReady = courses.some((course) => {
      const days = getDaysLeft(course.examDate);
      return days !== null && days >= 0 && days <= 7 && Number(course.progress) >= 80;
    });

    return [
      {
        id: "first-course",
        icon: "📚",
        title: "شروع هوشمند",
        description: "حداقل یک درس ثبت شده",
        unlocked: courses.length > 0,
      },
      {
        id: "reminder",
        icon: "🔔",
        title: "برنامه‌ریز حرفه‌ای",
        description: "حداقل یک یادآور مطالعه ثبت شده",
        unlocked: hasReminder,
      },
      {
        id: "today-study",
        icon: "🔥",
        title: "مطالعه امروز",
        description: "امروز مطالعه ثبت کردی",
        unlocked: todayLogged,
      },
      {
        id: "two-hour",
        icon: "⏱️",
        title: "تمرکز جدی",
        description: "امروز حداقل ۲ ساعت مطالعه",
        unlocked: twoHourDay,
      },
      {
        id: "total-five",
        icon: "⭐",
        title: "پنج ساعت مطالعه",
        description: "مجموع مطالعه به ۵ ساعت رسید",
        unlocked: totalFive,
      },
      {
        id: "total-ten",
        icon: "🏆",
        title: "ده ساعت مطالعه",
        description: "مجموع مطالعه به ۱۰ ساعت رسید",
        unlocked: totalTen,
      },
      {
        id: "task-master",
        icon: "✅",
        title: "تسک‌مستر",
        description: "حداقل ۳ وظیفه انجام شده",
        unlocked: taskMaster,
      },
      {
        id: "all-done",
        icon: "💎",
        title: "روز بدون عقب‌افتادگی",
        description: "همه وظایف انجام شده‌اند",
        unlocked: allDone,
      },
      {
        id: "progress-hero",
        icon: "🚀",
        title: "پیشرفت عالی",
        description: "میانگین پیشرفت بالای ۷۰٪",
        unlocked: progressHero,
      },
      {
        id: "exam-ready",
        icon: "🎓",
        title: "آماده امتحان",
        description: "درس نزدیک امتحان با پیشرفت بالای ۸۰٪",
        unlocked: examReady,
      },
    ];
  }, [
    courses,
    reminders.length,
    tasks.length,
    undoneTasks.length,
    doneTasks.length,
    totalStudyHours,
    todayStudyHours,
    averageProgress,
  ]);

  const unlockedAchievements = achievements.filter((item) => item.unlocked);

  const studyReport = useMemo(() => {
    const highPriorityCourses = courses.filter(
      (course) => getPriorityInfo(course).label === "اولویت بالا"
    );

    if (courses.length === 0) {
      return "هنوز درسی ثبت نشده است. برای شروع، چند درس و تاریخ امتحان آن‌ها را وارد کنید.";
    }

    if (highPriorityCourses.length > 0) {
      return `شما ${toPersianDigits(
        highPriorityCourses.length
      )} درس با اولویت بالا دارید. بهتر است امروز روی درس‌هایی با امتحان نزدیک‌تر و پیشرفت کمتر تمرکز کنید.`;
    }

    if (averageProgress >= 75 && undoneTasks.length <= 2) {
      return "وضعیت کلی مطالعه خوب است. بهتر است همین روند را حفظ کرده و درس‌های نزدیک به امتحان را مرور کنید.";
    }

    if (averageProgress < 50) {
      return "میانگین پیشرفت درس‌ها پایین است. پیشنهاد می‌شود برنامه مطالعه روزانه جدی‌تری تنظیم کنید.";
    }

    return "وضعیت کلی مطالعه متوسط است. با ثبت منظم ساعت مطالعه، یادآور مطالعه و انجام وظایف، وضعیت بهتر می‌شود.";
  }, [courses, averageProgress, undoneTasks.length]);

  function showMessage(title, message) {
    Alert.alert(title, message);
  }

  function confirmAction(message, onConfirm) {
    if (typeof window !== "undefined" && window.confirm) {
      if (window.confirm(message)) onConfirm();
      return;
    }

    Alert.alert("تأیید", message, [
      { text: "لغو", style: "cancel" },
      { text: "بله", onPress: onConfirm },
    ]);
  }

  function registerUser() {
    if (!registerName.trim()) {
      showMessage("خطا", "نام خود را وارد کنید.");
      return;
    }

    const dailyGoal = Number(toEnglishDigits(registerGoal || "2"));

    setProfile({
      name: registerName.trim(),
      field: registerField.trim() || "دانشجو",
      dailyGoal: isNaN(dailyGoal) || dailyGoal <= 0 ? 2 : dailyGoal,
      createdAt: Date.now(),
    });
  }

  async function scheduleStudyReminder() {
    if (courses.length === 0) {
      showMessage("خطا", "اول باید یک درس اضافه کنی.");
      return;
    }

    const course = courses.find((item) => item.id === reminderCourseId) || courses[0];
    const dateText = cleanJalaliDate(reminderDate);
    const timeText = cleanTime(reminderTime);
    const startDate = parseJalaliDateTime(dateText, timeText);
    const duration = Number(toEnglishDigits(reminderMinutes));

    if (!startDate) {
      showMessage(
        "تاریخ یا ساعت نامعتبر",
        "تاریخ را شمسی مثل 1405/04/10 و ساعت را مثل 18:30 وارد کن."
      );
      return;
    }

    if (startDate <= new Date()) {
      showMessage("زمان نامعتبر", "زمان یادآور باید برای آینده باشد.");
      return;
    }

    if (!duration || isNaN(duration) || duration <= 0) {
      showMessage("مدت نامعتبر", "مدت مطالعه را به دقیقه وارد کن. مثلا 60");
      return;
    }

    const ok = await prepareNotifications(showMessage);
    if (!ok) return;

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "وقت مطالعه رسید 📚",
          body: `زمان مطالعه «${course.title}» شروع شد. مدت پیشنهادی: ${toPersianDigits(
            duration
          )} دقیقه`,
          sound: "default",
          data: {
            courseId: course.id,
            courseTitle: course.title,
          },
        },
        trigger: buildDateTrigger(startDate),
      });

      const newReminder = {
        id: Date.now().toString(),
        courseId: course.id,
        courseTitle: course.title,
        date: dateText,
        time: timeText,
        duration,
        notificationId,
        createdAt: Date.now(),
      };

      setReminders([newReminder, ...reminders]);

      showMessage(
        "یادآور ثبت شد ✅",
        `برای درس «${course.title}» در ${displayDate(dateText)} ساعت ${toPersianDigits(
          timeText
        )} نوتیفیکیشن تنظیم شد.`
      );
    } catch {
      showMessage("خطا", "ثبت نوتیفیکیشن انجام نشد. دوباره امتحان کن.");
    }
  }

  async function scheduleTestNotification() {
    const ok = await prepareNotifications(showMessage);
    if (!ok) return;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "تست یادآور مطالعه 🔔",
          body: "اگر این پیام را دیدی، نوتیفیکیشن و صدای برنامه درست کار می‌کند.",
          sound: "default",
        },
        trigger: buildTimeIntervalTrigger(5),
      });

      showMessage("تست فعال شد", "تا ۵ ثانیه دیگر باید نوتیفیکیشن تست روی گوشی بیاید.");
    } catch {
      showMessage("خطا", "نوتیفیکیشن تست ارسال نشد.");
    }
  }

  async function deleteReminder(reminderId) {
    const reminder = reminders.find((item) => item.id === reminderId);

    if (reminder?.notificationId && Platform.OS !== "web") {
      try {
        await Notifications.cancelScheduledNotificationAsync(reminder.notificationId);
      } catch {}
    }

    setReminders(reminders.filter((item) => item.id !== reminderId));
  }

  function addCourse() {
    if (!courseTitle.trim()) {
      showMessage("خطا", "نام درس را وارد کن.");
      return;
    }

    const cleanedExamDate = cleanJalaliDate(courseExamDate);

    if (courseExamDate && !parseJalaliDate(cleanedExamDate)) {
      showMessage("تاریخ نامعتبر", "تاریخ امتحان را شمسی وارد کن. مثلا 1405/04/20");
      return;
    }

    const progressNumber = Number(toEnglishDigits(courseProgress || "0"));

    if (isNaN(progressNumber) || progressNumber < 0 || progressNumber > 100) {
      showMessage("خطا", "درصد پیشرفت باید بین ۰ تا ۱۰۰ باشد.");
      return;
    }

    const newCourse = {
      id: Date.now().toString(),
      title: courseTitle.trim(),
      examDate: cleanedExamDate,
      progress: progressNumber,
    };

    setCourses([newCourse, ...courses]);
    setCourseTitle("");
    setCourseExamDate("");
    setCourseProgress("");
  }

  function deleteCourse(courseId) {
    confirmAction("این درس و اطلاعات مربوط به آن حذف شود؟", () => {
      setCourses(courses.filter((course) => course.id !== courseId));
      setTasks(tasks.filter((task) => task.courseId !== courseId));
      setStudyLogs(studyLogs.filter((log) => log.courseId !== courseId));
      setReminders(reminders.filter((reminder) => reminder.courseId !== courseId));
    });
  }

  function updateCourseProgress(courseId, change) {
    setCourses(
      courses.map((course) => {
        if (course.id !== courseId) return course;

        const currentProgress = Number(course.progress || 0);
        const newProgress = Math.min(100, Math.max(0, currentProgress + change));

        return { ...course, progress: newProgress };
      })
    );
  }

  function addTask() {
    if (!taskTitle.trim()) {
      showMessage("خطا", "عنوان وظیفه را وارد کن.");
      return;
    }

    if (courses.length === 0) {
      showMessage("خطا", "اول باید یک درس اضافه کنی.");
      return;
    }

    const cleanedDueDate = cleanJalaliDate(taskDueDate);

    if (taskDueDate && !parseJalaliDate(cleanedDueDate)) {
      showMessage("تاریخ نامعتبر", "موعد را شمسی وارد کن. مثلا 1405/04/10");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      courseId: selectedCourseId || courses[0].id,
      dueDate: cleanedDueDate,
      done: false,
    };

    setTasks([newTask, ...tasks]);
    setTaskTitle("");
    setTaskDueDate("");
  }

  function toggleTask(taskId) {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task))
    );
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function addStudyLog() {
    if (courses.length === 0) {
      showMessage("خطا", "اول باید یک درس اضافه کنی.");
      return;
    }

    const hours = Number(toEnglishDigits(studyHoursInput));

    if (!studyHoursInput || isNaN(hours) || hours <= 0) {
      showMessage("خطا", "ساعت مطالعه را درست وارد کن. مثلا ۲ یا ۱.۵");
      return;
    }

    const newLog = {
      id: Date.now().toString(),
      courseId: selectedStudyCourseId || courses[0].id,
      hours,
      date: getTodayJalaliRaw(),
      note: studyNote.trim() || "بدون توضیح",
    };

    setStudyLogs([newLog, ...studyLogs]);
    setStudyHoursInput("");
    setStudyNote("");
  }

  function deleteStudyLog(logId) {
    setStudyLogs(studyLogs.filter((log) => log.id !== logId));
  }

  function getCourseName(courseId) {
    const course = courses.find((item) => item.id === courseId);
    return course ? course.title : "نامشخص";
  }

  function getCourseStudyHours(courseId) {
    return studyLogs
      .filter((log) => log.courseId === courseId)
      .reduce((sum, log) => sum + Number(log.hours || 0), 0);
  }

  function resetAllData() {
    confirmAction("آیا مطمئنی می‌خواهی داده‌ها به حالت نمونه برگردد؟", async () => {
      setCourses([...sampleCourses]);
      setTasks([...sampleTasks]);
      setStudyLogs([...sampleStudyLogs]);
      setReminders([]);

      setReminderDate(getTodayJalaliRaw());
      setReminderTime("18:00");
      setReminderMinutes("60");
    });
  }

  function resetProfile() {
    confirmAction(
      "اطلاعات کاربر پاک شود و صفحه ثبت‌ نام دوباره نمایش داده شود؟",
      async () => {
        await AsyncStorage.clear();

        setProfile(null);

        setCourses([]);
        setTasks([]);
        setStudyLogs([]);
        setReminders([]);

        setRegisterName("");
        setRegisterField("");
        setRegisterGoal("2");

        setReminderDate(getTodayJalaliRaw());
        setReminderTime("18:00");
        setReminderMinutes("60");
      }
    );
  }

  function renderPriorityBadge(course) {
    const priority = getPriorityInfo(course);

    return (
      <View
        style={[
          styles.priorityBadge,
          {
            backgroundColor: priority.backgroundColor,
            borderColor: priority.borderColor,
          },
        ]}
      >
        <Text style={[styles.priorityText, { color: priority.color }]}>
          {priority.label}
        </Text>
      </View>
    );
  }

  function renderAchievement(item) {
    return (
      <View
        key={item.id}
        style={[
          styles.achievementCard,
          { width: statCardWidth },
          item.unlocked ? styles.achievementUnlocked : styles.achievementLocked,
        ]}
      >
        <Text style={styles.achievementIcon}>{item.unlocked ? item.icon : "🔒"}</Text>
        <Text
          style={[
            styles.achievementTitle,
            !item.unlocked && styles.achievementTitleLocked,
          ]}
        >
          {item.title}
        </Text>
        <Text style={styles.achievementText}>{item.description}</Text>
      </View>
    );
  }

  function renderSplashScreen() {
    return (
      <SafeAreaView style={styles.splashScreen}>
        <StatusBar style="light" />
        <View style={styles.splashLogo}>
          <Text style={styles.splashLogoText}>✦</Text>
        </View>
        <Text style={styles.splashTitleTop}>SMART STUDY</Text>
        <Text style={styles.splashTitleBottom}>PLANNER</Text>
        <Text style={styles.splashSubtitle}>برنامه‌ریز هوشمند مطالعه</Text>
      </SafeAreaView>
    );
  }

  function renderRegisterScreen() {
    return (
      <SafeAreaView style={styles.registerScreen}>
        <StatusBar style="light" />

        <ScrollView
          contentContainerStyle={styles.registerContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.registerCard}>
            <View style={styles.splashLogo}>
              <Text style={styles.splashLogoText}>✦</Text>
            </View>

            <Text style={styles.registerBrandTop}>SMART STUDY</Text>
            <Text style={styles.registerBrandBottom}>PLANNER</Text>

            <Text style={styles.registerText}>
              برای شروع، اطلاعات اولیه خودت را وارد کن تا برنامه برای تو شخصی‌سازی شود.
            </Text>

            <TextInput
              style={styles.registerInput}
              placeholder="نام دانشجو"
              value={registerName}
              onChangeText={setRegisterName}
              textAlign="right"
              placeholderTextColor="#94a3b8"
            />

            <TextInput
              style={styles.registerInput}
              placeholder="رشته یا مقطع، مثلا مهندسی کامپیوتر"
              value={registerField}
              onChangeText={setRegisterField}
              textAlign="right"
              placeholderTextColor="#94a3b8"
            />

            <TextInput
              style={styles.registerInput}
              placeholder="هدف مطالعه روزانه، مثلا 2"
              value={registerGoal}
              onChangeText={setRegisterGoal}
              keyboardType="numeric"
              textAlign="right"
              placeholderTextColor="#94a3b8"
            />

            <TouchableOpacity style={styles.registerButton} onPress={registerUser}>
              <Text style={styles.registerButtonText}>شروع برنامه‌ریزی</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  function renderHomeBrand() {
    return (
      <View style={styles.brandCard}>
        <View style={styles.brandIconCircle}>
          <Text style={styles.brandIcon}>✦</Text>
        </View>

        <Text style={[styles.brandTop, isVerySmall && styles.brandTopSmall]}>
          SMART STUDY
        </Text>
        <Text style={[styles.brandBottom, isVerySmall && styles.brandBottomSmall]}>
          PLANNER
        </Text>

        <View style={styles.brandLine} />

        <Text style={styles.brandSubtitle}>برنامه‌ریز هوشمند مطالعه</Text>
        <Text style={styles.brandSlogan}>هوشمندتر درس بخوان، منظم‌تر پیشرفت کن</Text>

        <View style={styles.todayPill}>
          <Text style={styles.todayText}>امروز: {getTodayJalaliDisplay()}</Text>
        </View>
      </View>
    );
  }

  function renderHome() {
    const days = suggestedCourse ? getDaysLeft(suggestedCourse.examDate) : null;
    const suggestedPriority = suggestedCourse ? getPriorityInfo(suggestedCourse) : null;

    return (
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentPadding}
        showsVerticalScrollIndicator={false}
      >
        {renderHomeBrand()}

        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>سلام {profile?.name || "دانشجو"} 👋</Text>
          <Text style={styles.welcomeText}>رشته / وضعیت: {profile?.field || "ثبت نشده"}</Text>
          <Text style={styles.welcomeText}>
            هدف مطالعه روزانه: {toPersianDigits(profile?.dailyGoal || 2)} ساعت
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>{toPersianDigits(courses.length)}</Text>
            <Text style={styles.statLabel}>درس‌ها</Text>
          </View>

          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>{toPersianDigits(undoneTasks.length)}</Text>
            <Text style={styles.statLabel}>وظایف باقی‌مانده</Text>
          </View>

          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>{toPersianDigits(averageProgress)}٪</Text>
            <Text style={styles.statLabel}>میانگین پیشرفت</Text>
          </View>

          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>{toPersianDigits(reminders.length)}</Text>
            <Text style={styles.statLabel}>یادآور مطالعه</Text>
          </View>
        </View>

        <View style={styles.focusCard}>
          <View style={styles.focusHeader}>
            <Text style={styles.focusLabel}>پیشنهاد هوشمند امروز</Text>
            <Text style={styles.focusEmoji}>🎯</Text>
          </View>

          {suggestedCourse ? (
            <>
              <Text style={styles.focusCourse}>{suggestedCourse.title}</Text>

              <View style={styles.focusPriorityRow}>
                {renderPriorityBadge(suggestedCourse)}
                <Text style={styles.focusReason}>{suggestedPriority.description}</Text>
              </View>

              <View style={styles.focusDetails}>
                <Text style={styles.focusDetailText}>
                  پیشرفت فعلی: {toPersianDigits(suggestedCourse.progress)}٪
                </Text>
                <Text style={styles.focusDetailText}>
                  تاریخ امتحان: {displayDate(suggestedCourse.examDate)}
                </Text>
                <Text style={styles.focusDetailText}>
                  زمان باقی‌مانده: {" "}
                  {days === null
                    ? "نامشخص"
                    : days < 0
                    ? "امتحان گذشته است"
                    : `${toPersianDigits(days)} روز`}
                </Text>
              </View>

              <ProgressBar value={suggestedCourse.progress} />
            </>
          ) : (
            <Text style={styles.text}>
              هنوز درسی ثبت نشده است. از بخش درس‌ها، اولین درس را اضافه کن.
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.cardTitle}>یادآور بعدی مطالعه</Text>
            <Text style={styles.sectionIcon}>🔔</Text>
          </View>

          {nextReminder ? (
            <View style={styles.reminderPreview}>
              <Text style={styles.itemTitle}>{nextReminder.courseTitle}</Text>
              <Text style={styles.itemSubtitle}>
                زمان: {formatReminderDateTime(nextReminder)}
              </Text>
              <Text style={styles.itemSubtitle}>
                مدت مطالعه: {toPersianDigits(nextReminder.duration)} دقیقه
              </Text>
            </View>
          ) : (
            <Text style={styles.text}>
              هنوز یادآور آینده نداری. از بخش مطالعه یک تایم مشخص کن.
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>پلن پیشنهادی امروز</Text>

          <View style={styles.planItem}>
            <Text style={styles.planNumber}>۱</Text>
            <Text style={styles.planText}>
              {suggestedCourse
                ? `حداقل ${toPersianDigits(profile?.dailyGoal || 2)} ساعت روی «${suggestedCourse.title}» تمرکز کن.`
                : "اولین درس خودت را اضافه کن تا برنامه هوشمند فعال شود."}
            </Text>
          </View>

          <View style={styles.planItem}>
            <Text style={styles.planNumber}>۲</Text>
            <Text style={styles.planText}>
              {nextTask
                ? `وظیفه نزدیک‌تر: «${nextTask.title}» را انجام بده.`
                : "فعلاً وظیفه انجام‌نشده‌ای نداری؛ یک تسک جدید ثبت کن."}
            </Text>
          </View>

          <View style={styles.planItem}>
            <Text style={styles.planNumber}>۳</Text>
            <Text style={styles.planText}>
              یک یادآور مطالعه تنظیم کن تا گوشی در زمان مشخص نوتیفیکیشن بدهد.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.cardTitle}>شمارش معکوس امتحان‌ها</Text>
            <Text style={styles.sectionIcon}>⏳</Text>
          </View>

          {nearestExams.length === 0 ? (
            <Text style={styles.text}>هنوز تاریخ امتحانی ثبت نشده است.</Text>
          ) : (
            nearestExams.slice(0, 3).map((course) => (
              <CountdownItem
                key={course.id}
                course={course}
                compact
                isVerySmall={isVerySmall}
              />
            ))
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.cardTitle}>دستاوردهای فعال</Text>
            <Text style={styles.sectionIcon}>🏆</Text>
          </View>

          {unlockedAchievements.length === 0 ? (
            <Text style={styles.text}>هنوز نشانی فعال نشده.</Text>
          ) : (
            <View style={styles.achievementGrid}>
              {unlockedAchievements.slice(0, 4).map(renderAchievement)}
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>گزارش سریع</Text>
          <Text style={styles.text}>{studyReport}</Text>
        </View>
      </ScrollView>
    );
  }

  function renderCourses() {
    return (
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentPadding}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="درس‌ها" subtitle="افزودن درس، تاریخ امتحان شمسی، پیشرفت و اولویت" isSmall={isVerySmall} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>افزودن درس جدید</Text>

          <TextInput
            style={styles.input}
            placeholder="نام درس، مثلا ریاضی عمومی"
            value={courseTitle}
            onChangeText={setCourseTitle}
            textAlign="right"
            placeholderTextColor="#94a3b8"
          />

          <TextInput
            style={styles.input}
            placeholder="تاریخ امتحان شمسی، مثلا 1405/04/20"
            value={courseExamDate}
            onChangeText={setCourseExamDate}
            textAlign="right"
            placeholderTextColor="#94a3b8"
          />

          <TextInput
            style={styles.input}
            placeholder="درصد پیشرفت، مثلا 40"
            value={courseProgress}
            onChangeText={setCourseProgress}
            keyboardType="numeric"
            textAlign="right"
            placeholderTextColor="#94a3b8"
          />

          <TouchableOpacity style={styles.primaryButton} onPress={addCourse}>
            <Text style={styles.primaryButtonText}>افزودن درس</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>لیست درس‌ها</Text>

          {courses.length === 0 ? (
            <Text style={styles.text}>هنوز درسی ثبت نشده است.</Text>
          ) : (
            courses.map((course) => {
              const days = getDaysLeft(course.examDate);
              const priority = getPriorityInfo(course);

              return (
                <View key={course.id} style={styles.listItem}>
                  <View style={styles.itemTopRow}>
                    <Text style={styles.itemTitle}>{course.title}</Text>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteCourse(course.id)}
                    >
                      <Text style={styles.deleteButtonText}>حذف</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.priorityRow}>
                    {renderPriorityBadge(course)}
                    <Text style={styles.priorityDescription}>
                      {priority.description}
                    </Text>
                  </View>

                  <Text style={styles.itemSubtitle}>
                    تاریخ امتحان: {displayDate(course.examDate)}
                  </Text>

                  <Text style={styles.itemSubtitle}>
                    زمان باقی‌مانده: {" "}
                    {days === null
                      ? "نامشخص"
                      : days < 0
                      ? "امتحان گذشته است"
                      : `${toPersianDigits(days)} روز`}
                  </Text>

                  <Text style={styles.itemSubtitle}>
                    پیشرفت: {toPersianDigits(course.progress)}٪
                  </Text>

                  <ProgressBar value={course.progress} />

                  <View style={styles.progressActions}>
                    <TouchableOpacity
                      style={styles.progressButton}
                      onPress={() => updateCourseProgress(course.id, -10)}
                    >
                      <Text style={styles.progressButtonText}>-۱۰٪</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.progressButton, styles.progressButtonPositive]}
                      onPress={() => updateCourseProgress(course.id, 10)}
                    >
                      <Text style={styles.progressButtonText}>+۱۰٪</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.studyMiniBox}>
                    <Text style={styles.studyMiniText}>
                      مجموع مطالعه این درس: {toPersianDigits(getCourseStudyHours(course.id))} ساعت
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    );
  }

  function renderTasks() {
    return (
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentPadding}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="وظایف" subtitle="ثبت تکالیف و پیگیری کارهای درسی" isSmall={isVerySmall} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>افزودن وظیفه جدید</Text>

          <TextInput
            style={styles.input}
            placeholder="عنوان وظیفه، مثلا حل تمرین فصل ۲"
            value={taskTitle}
            onChangeText={setTaskTitle}
            textAlign="right"
            placeholderTextColor="#94a3b8"
          />

          <TextInput
            style={styles.input}
            placeholder="موعد انجام شمسی، مثلا 1405/04/10"
            value={taskDueDate}
            onChangeText={setTaskDueDate}
            textAlign="right"
            placeholderTextColor="#94a3b8"
          />

          <Text style={styles.label}>انتخاب درس</Text>
          <CourseSelector courses={courses} selectedId={selectedCourseId} onSelect={setSelectedCourseId} />

          <TouchableOpacity style={styles.primaryButton} onPress={addTask}>
            <Text style={styles.primaryButtonText}>افزودن وظیفه</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>لیست وظایف</Text>

          {tasks.length === 0 ? (
            <Text style={styles.text}>هنوز وظیفه‌ای ثبت نشده است.</Text>
          ) : (
            tasks.map((task) => (
              <View key={task.id} style={[styles.listItem, task.done && styles.doneItem]}>
                <View style={styles.itemTopRow}>
                  <TouchableOpacity
                    onPress={() => toggleTask(task.id)}
                    style={styles.taskTitleArea}
                  >
                    <Text style={[styles.itemTitle, task.done && styles.doneText]}>
                      {task.done ? "✅ " : "⬜ "}
                      {task.title}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteTask(task.id)}
                  >
                    <Text style={styles.deleteButtonText}>حذف</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemSubtitle}>درس: {getCourseName(task.courseId)}</Text>
                <Text style={styles.itemSubtitle}>موعد: {displayDate(task.dueDate)}</Text>
                <Text style={styles.itemSubtitle}>
                  وضعیت: {task.done ? "انجام شده" : "انجام نشده"}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    );
  }

  function renderStudy() {
    return (
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentPadding}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="مطالعه" subtitle="ثبت ساعت مطالعه و ساخت یادآور نوتیفیکیشن" isSmall={isVerySmall} />

        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.cardTitle}>برنامه مطالعه و نوتیفیکیشن</Text>
            <Text style={styles.sectionIcon}>🔔</Text>
          </View>

          <Text style={styles.text}>
            درس، تاریخ شمسی و ساعت را مشخص کن؛ گوشی همان زمان با صدا یادآوری می‌دهد.
          </Text>

          <Text style={styles.label}>انتخاب درس</Text>
          <CourseSelector courses={courses} selectedId={reminderCourseId} onSelect={setReminderCourseId} />

          <TextInput
            style={styles.input}
            placeholder="تاریخ مطالعه شمسی، مثلا 1405/04/10"
            value={reminderDate}
            onChangeText={setReminderDate}
            textAlign="right"
            placeholderTextColor="#94a3b8"
          />

          <TextInput
            style={styles.input}
            placeholder="ساعت شروع، مثلا 18:30"
            value={reminderTime}
            onChangeText={setReminderTime}
            textAlign="right"
            placeholderTextColor="#94a3b8"
          />

          <TextInput
            style={styles.input}
            placeholder="مدت مطالعه به دقیقه، مثلا 60"
            value={reminderMinutes}
            onChangeText={setReminderMinutes}
            keyboardType="numeric"
            textAlign="right"
            placeholderTextColor="#94a3b8"
          />

          <TouchableOpacity style={styles.primaryButton} onPress={scheduleStudyReminder}>
            <Text style={styles.primaryButtonText}>ثبت تایم مطالعه و نوتیفیکیشن</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={scheduleTestNotification}>
            <Text style={styles.secondaryButtonText}>تست نوتیفیکیشن ۵ ثانیه‌ای</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>یادآورهای مطالعه</Text>

          {reminders.length === 0 ? (
            <Text style={styles.text}>هنوز یادآوری ثبت نشده است.</Text>
          ) : (
            reminders.map((reminder) => (
              <View key={reminder.id} style={styles.listItem}>
                <View style={styles.itemTopRow}>
                  <Text style={styles.itemTitle}>🔔 {reminder.courseTitle}</Text>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteReminder(reminder.id)}
                  >
                    <Text style={styles.deleteButtonText}>حذف</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemSubtitle}>
                  زمان: {formatReminderDateTime(reminder)}
                </Text>
                <Text style={styles.itemSubtitle}>
                  مدت مطالعه: {toPersianDigits(reminder.duration)} دقیقه
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>ثبت مطالعه امروز</Text>

          <Text style={styles.label}>انتخاب درس</Text>
          <CourseSelector courses={courses} selectedId={selectedStudyCourseId} onSelect={setSelectedStudyCourseId} />

          <TextInput
            style={styles.input}
            placeholder="امروز چند ساعت مطالعه کردی؟ مثلا 2 یا 1.5"
            value={studyHoursInput}
            onChangeText={setStudyHoursInput}
            keyboardType="numeric"
            textAlign="right"
            placeholderTextColor="#94a3b8"
          />

          <TextInput
            style={styles.input}
            placeholder="توضیح کوتاه، مثلا مرور فصل اول"
            value={studyNote}
            onChangeText={setStudyNote}
            textAlign="right"
            placeholderTextColor="#94a3b8"
          />

          <TouchableOpacity style={styles.primaryButton} onPress={addStudyLog}>
            <Text style={styles.primaryButtonText}>ثبت ساعت مطالعه</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>{toPersianDigits(totalStudyHours)}</Text>
            <Text style={styles.statLabel}>کل ساعات مطالعه</Text>
          </View>

          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>{toPersianDigits(todayStudyHours)}</Text>
            <Text style={styles.statLabel}>مطالعه امروز</Text>
          </View>
        </View>

        {todayStudyHours >= 2 ? (
          <View style={styles.successCard}>
            <Text style={styles.successTitle}>🔥 عالی بود!</Text>
            <Text style={styles.successText}>
              امروز حداقل ۲ ساعت مطالعه ثبت کردی و نشان «تمرکز جدی» فعال شد.
            </Text>
          </View>
        ) : (
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>هدف امروز</Text>
            <Text style={styles.warningText}>
              اگر امروز به ۲ ساعت مطالعه برسی، یک دستاورد جدید می‌گیری.
            </Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>سوابق مطالعه</Text>

          {studyLogs.length === 0 ? (
            <Text style={styles.text}>هنوز مطالعه‌ای ثبت نشده است.</Text>
          ) : (
            studyLogs.map((log) => (
              <View key={log.id} style={styles.listItem}>
                <View style={styles.itemTopRow}>
                  <Text style={styles.itemTitle}>
                    {getCourseName(log.courseId)} - {toPersianDigits(log.hours)} ساعت
                  </Text>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteStudyLog(log.id)}
                  >
                    <Text style={styles.deleteButtonText}>حذف</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemSubtitle}>تاریخ: {displayDate(log.date)}</Text>
                <Text style={styles.itemSubtitle}>توضیح: {log.note}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    );
  }

  function renderStats() {
    return (
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentPadding}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="آمار" subtitle="گزارش وضعیت، دستاوردها و امتحان‌های نزدیک" isSmall={isVerySmall} />

        <View style={styles.statsGrid}>
          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>{toPersianDigits(courses.length)}</Text>
            <Text style={styles.statLabel}>کل درس‌ها</Text>
          </View>

          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>{toPersianDigits(tasks.length)}</Text>
            <Text style={styles.statLabel}>کل وظایف</Text>
          </View>

          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>{toPersianDigits(doneTasks.length)}</Text>
            <Text style={styles.statLabel}>انجام‌شده</Text>
          </View>

          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>{toPersianDigits(averageProgress)}٪</Text>
            <Text style={styles.statLabel}>میانگین پیشرفت</Text>
          </View>

          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>{toPersianDigits(totalStudyHours)}</Text>
            <Text style={styles.statLabel}>ساعت مطالعه</Text>
          </View>

          <View style={[styles.smallCard, { width: statCardWidth }]}>
            <Text style={styles.statNumber}>
              {toPersianDigits(unlockedAchievements.length)}
            </Text>
            <Text style={styles.statLabel}>دستاوردهای کسب‌شده</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>گزارش تحلیلی</Text>
          <Text style={styles.text}>{studyReport}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>همه دستاوردها</Text>
          <View style={styles.achievementGrid}>{achievements.map(renderAchievement)}</View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>شمارش معکوس همه امتحان‌ها</Text>

          {nearestExams.length === 0 ? (
            <Text style={styles.text}>هنوز امتحانی ثبت نشده است.</Text>
          ) : (
            nearestExams.map((course) => (
              <CountdownItem key={course.id} course={course} isVerySmall={isVerySmall} />
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>پیشرفت درس‌ها</Text>

          {courses.length === 0 ? (
            <Text style={styles.text}>هنوز درسی ثبت نشده است.</Text>
          ) : (
            courses.map((course) => (
              <View key={course.id} style={styles.chartRow}>
                <View style={styles.chartHeader}>
                  <Text style={styles.chartTitle}>{course.title}</Text>
                  <Text style={styles.chartValue}>
                    {toPersianDigits(course.progress)}٪
                  </Text>
                </View>
                <ProgressBar value={course.progress} />
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>ساعات مطالعه بر اساس درس</Text>

          {courses.length === 0 ? (
            <Text style={styles.text}>هنوز درسی ثبت نشده است.</Text>
          ) : (
            courses.map((course) => {
              const hours = getCourseStudyHours(course.id);
              const max = Math.max(totalStudyHours, 1);
              const percentage = Math.round((hours / max) * 100);

              return (
                <View key={course.id} style={styles.chartRow}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{course.title}</Text>
                    <Text style={styles.chartValue}>{toPersianDigits(hours)} ساعت</Text>
                  </View>
                  <ProgressBar value={percentage} />
                </View>
              );
            })
          )}
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={resetAllData}>
          <Text style={styles.resetButtonText}>بازگردانی داده‌های نمونه</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton} onPress={resetProfile}>
          <Text style={styles.profileButtonText}>نمایش دوباره ثبت‌نام</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }


  function renderCurrentTab() {
    if (activeTab === "home") return renderHome();
    if (activeTab === "courses") return renderCourses();
    if (activeTab === "tasks") return renderTasks();
    if (activeTab === "study") return renderStudy();
    return renderStats();
  }

  function renderNavItem(key, label, icon) {
    const active = activeTab === key;

    return (
      <TouchableOpacity
        style={[styles.navItem, active && styles.navItemActive]}
        onPress={() => setActiveTab(key)}
      >
        <Text style={[styles.navIcon, active && styles.navTextActive]}>{icon}</Text>
        <Text
          style={[
            styles.navText,
            { fontSize: navFontSize },
            active && styles.navTextActive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  if (showSplash) {
    return renderSplashScreen();
  }

  if (!loaded) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingBox}>
          <Text style={styles.loadingTitle}>Smart Study Planner</Text>
          <Text style={styles.loadingText}>در حال آماده‌سازی برنامه...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return renderRegisterScreen();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={[styles.appShell, isWide && styles.appShellWide]}>
        {renderCurrentTab()}

        <View style={styles.bottomNav}>
          {renderNavItem("home", "خانه", "🏠")}
          {renderNavItem("courses", "درس‌ها", "📚")}
          {renderNavItem("tasks", "وظایف", "✅")}
          {renderNavItem("study", "مطالعه", "⏱️")}
          {renderNavItem("stats", "آمار", "📊")}
        </View>
      </View>
    </SafeAreaView>
  );
}



