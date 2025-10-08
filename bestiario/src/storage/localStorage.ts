import AsyncStorage from "@react-native-async-storage/async-storage";
import { Monster } from "../types/Monster";

const KEY = "@bestiario:favorites";

export async function getFavorites(): Promise<Monster[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveFavorite(monster: Monster): Promise<void> {
  const list = await getFavorites();
  if (!list.find((m) => m.index === monster.index)) {
    list.push(monster);
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  }
}

export async function removeFavorite(index: string): Promise<void> {
  const list = await getFavorites();
  const filtered = list.filter((m) => m.index !== index);
  await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
}
