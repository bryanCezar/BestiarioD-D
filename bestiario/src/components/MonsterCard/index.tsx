import { Text, TouchableOpacity, Alert, View, Button } from "react-native";
import type { Monster } from "../../types/Monster";
import { styles } from "./styles";
import { removeFavorite } from "../../storage/localStorage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Update">;

interface Props {
  monster: Monster;
  onPress?: () => void;
  onDelete?: () => void;
  onUpdate?: () => void;
}

export default function MonsterCard({
  monster,
  onPress,
  onDelete,
  onUpdate,
}: Props) {
  const navigation = useNavigation<NavigationProp>();
  const handleDelete = () => {
    Alert.alert(
      "Requisição para apagar registro",
      `Vossa senhoria verdadeiramente deseja apagar o registro da fera ${monster.name}?`,
      [
        { text: "Cancelar" },
        {
          text: "Apagar",
          onPress: () => {
            (async () => {
              await removeFavorite(monster.index);
              if (onDelete) onDelete();
            })();
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.name}>{monster.name}</Text>
        <Text style={styles.index}>{monster.type ?? "desconhecido"}</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          title="Apagar registro"
          onPress={handleDelete}
          color="#a24fd9ff"
        />
      </View>
    </TouchableOpacity>
  );
}
