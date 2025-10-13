import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Button } from "react-native";
import api from "../../api/dndApi";
import { MonsterListResponse, MonsterListItem } from "../../types/Monster";
import MonsterCard from "../../components/MonsterCard";
import { getFavorites } from "../../storage/localStorage";
import { styles } from "./styles";

export default function HomeScreen({ navigation }: any) {
  const [monsters, setMonsters] = useState<MonsterListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMonsters() {
      try {
        setLoading(true);

        const response = await api.get<MonsterListResponse>("/monsters");
        let apiMonsters = response.data.results;

        const savedMonsters = await getFavorites();
        const localMonsters = savedMonsters.map((m) => ({
          index: m.index,
          name: m.name,
          url: "",
        }));

        setMonsters([...localMonsters, ...apiMonsters]);
      } catch (error) {
        console.error("Erro ao carregar monstros:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMonsters();

    const unsubscribe = navigation.addListener("focus", loadMonsters);
    return unsubscribe;
  }, [navigation]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Button title="Adicionar Monstro" onPress={() => navigation.navigate("Create")} />
      <FlatList
        data={monsters}
        keyExtractor={(item) => item.index}
        renderItem={({ item }) => <MonsterCard monster={item} />}
        style={{ marginTop: 8 }}
      />
    </View>
  );
}

