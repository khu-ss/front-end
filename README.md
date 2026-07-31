<p align="left">
  <a href="README.md"><strong>🇮🇷 فارسی</strong></a> |
  <a href="README.en.md"><strong>🇬🇧 English</strong></a>
</p>

# 📚 Smart Study Planner

> یک اپلیکیشن برنامه‌ریزی هوشمند برای مدیریت دروس، وظایف و زمان مطالعه

[![Expo](https://img.shields.io/badge/Expo-54.0-blue.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB.svg)](https://reactnative.dev)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey.svg)](https://expo.dev)

---

## 📖 درباره پروژه

**Smart Study Planner**

یک اپلیکیشن موبایل و وب است که به دانشجویان کمک می‌کند فرآیند مطالعه خود را به‌صورت سیستماتیک مدیریت کنند. این برنامه با ارائه ابزارهای متنوع، امکان پیگیری پیشرفت دروس، ثبت زمان مطالعه، مدیریت وظایف و دریافت یادآوری‌های هوشمند را فراهم می‌کند.
 
### ✨ ویژگی‌های اصلی

- **مدیریت دروس**: افزودن، ویرایش و حذف دروس با تاریخ امتحان و درصد پیشرفت
- **وظایف (Task)**: تعریف وظایف مرتبط با هر درس و علامت‌گذاری انجام‌/انجام‌نشده
- **ثبت زمان مطالعه**: ثبت ساعات مطالعه برای هر درس به همراه یادداشت
- **شمارش معکوس**: نمایش تعداد روزهای باقی‌مانده تا امتحان هر درس
- **نوار پیشرفت**: نمایش درصد پیشرفت هر درس به‌صورت گرافیکی
- **یادآوری‌های هوشمند**: تنظیم یادآوری برای هر درس با اعلان‌های گوشی (Android/iOS)
- **پشتیبانی از تقویم شمسی (جلالی)**: تمام تاریخ‌ها به‌صورت شمسی نمایش داده می‌شوند
- **پشتیبانی از اعداد فارسی**: تبدیل خودکار اعداد به حروف فارسی
- **ذخیره‌سازی محلی**: استفاده از `AsyncStorage` برای ذخیره دائمی داده‌ها
- **پشتیبانی از چند پلتفرم**: اجرا روی Android، iOS و وب

---

## 🛠️ تکنولوژی‌های استفاده شده

| تکنولوژی | کاربرد |
|----------|--------|
| [React Native](https://reactnative.dev) | ساخت اپلیکیشن کراس‌پلتفرم |
| [Expo](https://expo.dev) | فریم‌ورک توسعه و ساخت |
| [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) | مدیریت اعلان‌های گوشی |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | ذخیره‌سازی محلی داده‌ها |
| [React Native Web](https://necolas.github.io/react-native-web/) | پشتیبانی از وب |

---

## 📁 ساختار پروژه
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

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها

- [Node.js](https://nodejs.org/) (نسخه 18 یا بالاتر)
- [npm](https://www.npmjs.com/) یا [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (اختیاری)

# مراحل نصب


 ۱. کلون کردن مخزن
```bash
git clone https://github.com/khu-ss/front-end.git
cd front-end
```

 ۲. نصب وابستگی‌ها
```bash
npm install
```

 ۳. اجرای اپلیکیشن
```bash
npm start
```

# اجرا روی پلتفرم‌های مختلف


اجرا روی وب
```bash
npm run web
```

اجرا روی Android (نیاز به شبیه‌ساز یا دستگاه متصل)
```bash
npm run android
```

اجرا روی iOS (فقط در macOS با Xcode)
```bash
npm run ios
```
## 📱 قابلیت‌ها در یک نگاه

### صفحه اصلی (Home)
- مشاهده خلاصه دروس، وظایف و وضعیت مطالعه
- نمایش تعداد روزهای باقی‌مانده تا امتحان هر درس
- نمایش درصد پیشرفت کلی

### مدیریت دروس
- افزودن درس جدید با عنوان، تاریخ امتحان و درصد پیشرفت اولیه
- ویرایش و حذف دروس موجود
- انتخاب درس برای ثبت زمان مطالعه یا افزودن وظیفه

### وظایف (Tasks)
- افزودن وظیفه برای هر درس با تاریخ سررسید
- علامت‌گذاری انجام/انجام‌نشده

### ثبت زمان مطالعه
- انتخاب درس و ثبت تعداد ساعت مطالعه
- افزودن یادداشت برای هر جلسه مطالعه

### یادآوری‌ها
- تنظیم یادآوری برای هر درس با تاریخ و ساعت دلخواه
- دریافت اعلان در زمان مقرر (Android/iOS)
