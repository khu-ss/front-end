# 📚 Smart Study Planner

> A smart planning application for managing courses, tasks, and study time.

[![Expo](https://img.shields.io/badge/Expo-54.0-blue.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB.svg)](https://reactnative.dev)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey.svg)](https://expo.dev)

---

## 📖 About The Project

**Smart Study Planner** is a mobile and web application that helps students systematically manage their study process. By providing various tools, it enables tracking course progress, logging study time, managing tasks, and receiving intelligent reminders.

### ✨ Key Features

- **Course Management**: Add, edit, and delete courses with exam dates and progress percentages.
- **Tasks**: Define tasks for each course and mark them as done/undone.
- **Study Time Logging**: Record study hours for each course along with notes.
- **Countdown**: Display the number of days remaining until each course's exam.
- **Progress Bar**: Show the progress percentage of each course graphically.
- **Smart Reminders**: Set reminders for each course with push notifications (Android/iOS).
- **Jalali (Solar Hijri) Calendar Support**: All dates are displayed in the Persian calendar format.
- **Persian Numerals Support**: Automatically convert numbers to Persian/Arabic numerals.
- **Local Storage**: Uses `AsyncStorage` for persistent local data storage.
- **Cross-Platform**: Runs on Android, iOS, and Web.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| [React Native](https://reactnative.dev) | Cross-platform app development |
| [Expo](https://expo.dev) | Development and build framework |
| [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) | Push notification management |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Local data persistence |
| [React Native Web](https://necolas.github.io/react-native-web/) | Web platform support |

---

## 📁 Project Structure

```plaintext
front-end/
├── App.js
├── app.json
├── index.js
├── package.json
├── package-lock.json
├── assets/
│   ├── icon.png
│   └── splash.png
└── src/
    ├── AppRouter.js
    ├── components/
    │   ├── CountdownItem.js
    │   ├── CourseSelector.js
    │   ├── ProgressBar.js
    │   └── SectionHeader.js
    ├── constants/
    │   ├── sampleData.js
    │   └── storage.js
    ├── styles/
    │   └── styles.js
    └── utils/
        ├── jalali.js
        ├── notifications.js
        ├── number.js
        └── storage.js
```

---

## 🚀 Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional)

### Steps

1. Clone the repository:
```bash
git clone https://github.com/khu-ss/front-end.git
cd front-end
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

### Run on Different Platforms

Run on Web:
```bash
npm run web
```

Run on Android (requires emulator or connected device):
```bash
npm run android
```

Run on iOS (macOS with Xcode only):
```bash
npm run ios
```

---

## 📱 Features at a Glance

### Home Screen
- View a summary of courses, tasks, and study status
- Display days remaining until each course exam
- Show overall progress percentage

### Course Management
- Add new courses with title, exam date, and initial progress percentage
- Edit and delete existing courses
- Select a course to log study time or add a task

### Tasks
- Add tasks for each course with a due date
- Mark tasks as done/undone

### Study Time Logging
- Select a course and log the number of study hours
- Add notes for each study session

### Reminders
- Set reminders for each course with a custom date and time
- Receive notifications at the scheduled time (Android/iOS)
