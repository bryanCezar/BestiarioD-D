import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { saveFavorite } from "../../storage/localStorage";
import { Monster } from "../../types/Monster";
import { styles } from "./styles";

export default function CreateMonsterScreen({ navigation }: any) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [challenge, setChallenge] = useState("");

    const handleSave = async () => {
        if (!name) {
            Alert.alert("Erro", "Digite o nome do monstro");
            return;
        }

        const newMonster: Monster = {
            index: name.toLowerCase().replace(/\s/g, "-"),
            name,
            type,
            challenge_rating: challenge ? Number(challenge) : undefined,
        };

        await saveFavorite(newMonster);
        Alert.alert("Sucesso", "Monstro salvo!");
        navigation.goBack(); // volta pra HomeScreen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Tipo:</Text>
            <TextInput style={styles.input} value={type} onChangeText={setType} />

            <Text style={styles.label}>Desafio (CR):</Text>
            <TextInput
                style={styles.input}
                value={challenge}
                onChangeText={setChallenge}
                keyboardType="numeric"
            />

            <Button title="Salvar Monstro" onPress={handleSave} />
        </View>
    );
}
