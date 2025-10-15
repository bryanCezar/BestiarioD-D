import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, ActivityIndicator, Button } from "react-native";
import api from "../../api/dndApi";
import { MonsterListResponse, MonsterListItem } from "../../types/Monster";
import MonsterCard from "../../components/MonsterCard";
import { getFavorites } from "../../storage/localStorage";
import { styles } from "./styles";

export default function HomeScreen({ navigation }: any) {
  const [monsters, setMonsters] = useState<MonsterListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMonsters = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get<MonsterListResponse>("/monsters");
      const apiMonsters = response.data.results;

      const savedMonsters = await getFavorites();
      const localMonsters = savedMonsters.map((m) => ({
        index: m.index,
        name: m.name,
        type: m.type ?? "desconhecido",
        url: "",
      }));

      setMonsters([...localMonsters, ...apiMonsters]);
    } catch (error) {
      console.error("Erro ao carregar monstros:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMonsters();

    const unsubscribe = navigation.addListener("focus", loadMonsters);
    return unsubscribe;
  }, [navigation, loadMonsters]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Button
        title="Registrar"
        onPress={() => navigation.navigate("Create")}
        color={"blue"}
      />
      <FlatList
        data={monsters}
        keyExtractor={(item) => item.index}
        renderItem={({ item }) => (
          <MonsterCard
            monster={item}
            onDelete={loadMonsters}
            onUpdate={loadMonsters}
          />
        )}
        style={{ marginTop: 8 }}
      />
    </View>
  );
}
