import { Text, StyleSheet, TouchableOpacity } from "react-native";
import type { MonsterListItem } from "../../types/Monster";
import { styles } from "./styles";

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