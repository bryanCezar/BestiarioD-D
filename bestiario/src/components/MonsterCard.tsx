import { Text, StyleSheet, TouchableOpacity } from "react-native";
import type { MonsterListItem } from "../types/Monster";

interface Props {
  monster: MonsterListItem;
  onPress?: () => void;
}

export default function MonsterCard({ monster, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{monster.name}</Text>
      <Text style={styles.index}>{monster.index}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#222",
    marginBottom: 4,
    borderRadius: 4,
  },
  name: { color: "fff", fontSize: 16, fontWeight: "700" },
  index: { color: "#aaa", fontSize: 12 },
});
