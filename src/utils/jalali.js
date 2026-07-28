import { toEnglishDigits, toPersianDigits } from "./number";

function div(a, b) {
  return ~~(a / b);
}

function jalaliToGregorian(jy, jm, jd) {
  jy = Number(jy);
  jm = Number(jm);
  jd = Number(jd);
  jy += 1595;

  let days =
    -355668 +
    365 * jy +
    div(jy, 33) * 8 +
    div((jy % 33) + 3, 4) +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);

  let gy = 400 * div(days, 146097);
  days %= 146097;

  if (days > 36524) {
    gy += 100 * div(--days, 36524);
    days %= 36524;
    if (days >= 365) days++;
  }

  gy += 4 * div(days, 1461);
  days %= 1461;

  if (days > 365) {
    gy += div(days - 1, 365);
    days = (days - 1) % 365;
  }

  let gd = days + 1;

  const salA = [
    0,
    31,
    (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let gm = 0;
  for (gm = 1; gm <= 12 && gd > salA[gm]; gm++) {
    gd -= salA[gm];
  }

  return { gy, gm, gd };
}

function gregorianToJalali(gy, gm, gd) {
  gy = Number(gy);
  gm = Number(gm);
  gd = Number(gd);

  const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  let gy2 = gy - 1600;
  let gm2 = gm - 1;
  let gd2 = gd - 1;

  let gDayNo =
    365 * gy2 +
    div(gy2 + 3, 4) -
    div(gy2 + 99, 100) +
    div(gy2 + 399, 400);

  for (let i = 0; i < gm2; i++) {
    gDayNo += gDaysInMonth[i];
  }

  if (gm2 > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)) {
    gDayNo++;
  }

  gDayNo += gd2;

  let jDayNo = gDayNo - 79;
  let jNp = div(jDayNo, 12053);
  jDayNo %= 12053;

  let jy = 979 + 33 * jNp + 4 * div(jDayNo, 1461);
  jDayNo %= 1461;

  if (jDayNo >= 366) {
    jy += div(jDayNo - 1, 365);
    jDayNo = (jDayNo - 1) % 365;
  }

  let jm2;
  for (jm2 = 0; jm2 < 11 && jDayNo >= jDaysInMonth[jm2]; jm2++) {
    jDayNo -= jDaysInMonth[jm2];
  }

  return { jy, jm: jm2 + 1, jd: jDayNo + 1 };
}

function normalizeJalaliDate(value) {
  return toEnglishDigits(value)
    .trim()
    .replace(/-/g, "/")
    .replace(/\./g, "/")
    .replace(/\s/g, "");
}

export function cleanJalaliDate(value) {
  const normalized = normalizeJalaliDate(value);
  const parts = normalized.split("/");

  if (parts.length !== 3) return normalized;

  const jy = Number(parts[0]);
  const jm = Number(parts[1]);
  const jd = Number(parts[2]);

  if (!jy || !jm || !jd) return normalized;

  return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
}

export function parseJalaliDate(value) {
  const cleaned = cleanJalaliDate(value);
  const parts = cleaned.split("/");

  if (parts.length !== 3) return null;

  const jy = Number(parts[0]);
  const jm = Number(parts[1]);
  const jd = Number(parts[2]);

  if (!jy || !jm || !jd) return null;
  if (jy < 1300 || jy > 1500) return null;
  if (jm < 1 || jm > 12) return null;
  if (jd < 1 || jd > 31) return null;

  const { gy, gm, gd } = jalaliToGregorian(jy, jm, jd);
  const date = new Date(gy, gm - 1, gd);
  date.setHours(0, 0, 0, 0);

  if (isNaN(date.getTime())) return null;

  return date;
}

export function formatJalaliFromDate(date) {
  const { jy, jm, jd } = gregorianToJalali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
}

export function getTodayJalaliRaw() {
  return formatJalaliFromDate(new Date());
}

export function getTodayJalaliDisplay() {
  return toPersianDigits(getTodayJalaliRaw());
}

export function displayDate(value) {
  if (!value) return "ثبت نشده";
  return toPersianDigits(cleanJalaliDate(value));
}

export function getDaysLeft(jalaliDate) {
  const date = parseJalaliDate(jalaliDate);
  if (!date) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function cleanTime(value) {
  const normalized = toEnglishDigits(value)
    .trim()
    .replace(".", ":")
    .replace("-", ":")
    .replace(/\s/g, "");

  const parts = normalized.split(":");

  if (parts.length !== 2) return normalized;

  const hour = Number(parts[0]);
  const minute = Number(parts[1]);

  if (isNaN(hour) || isNaN(minute)) return normalized;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function parseJalaliDateTime(jalaliDate, timeText) {
  const date = parseJalaliDate(jalaliDate);
  if (!date) return null;

  const time = cleanTime(timeText);
  const parts = time.split(":");

  if (parts.length !== 2) return null;

  const hour = Number(parts[0]);
  const minute = Number(parts[1]);

  if (isNaN(hour) || isNaN(minute)) return null;
  if (hour < 0 || hour > 23) return null;
  if (minute < 0 || minute > 59) return null;

  date.setHours(hour, minute, 0, 0);
  return date;
}

export function formatReminderDateTime(reminder) {
  return `${displayDate(reminder.date)} ساعت ${toPersianDigits(reminder.time)}`;
}
