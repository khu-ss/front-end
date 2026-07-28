import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadJson(key, fallback) {
  try {
    const saved = await AsyncStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export async function saveJson(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
