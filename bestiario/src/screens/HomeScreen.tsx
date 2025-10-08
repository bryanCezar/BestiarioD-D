import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import api from "../api/dndApi";
import type { MonsterListResponse, MonsterListItem } from "../types/Monster";
import MonsterCard from "../components/MonsterCard";

export default function HomeScreen() {
  const [monsters, setMonsters] = useState<MonsterListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMonsters() {
      try {
        setLoading(true);
        const response = await api.get<MonsterListResponse>("/monsters");
        setMonsters(response.data.results);
      } catch (error) {
        console.log(
          "erro em carregar monstro, função HomeScreen em screens/homescreen. erro: ",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadMonsters();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={monsters}
        keyExtractor={(item) => item.index}
        renderItem={({ item }) => <MonsterCard monster={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#111" },
});
