import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, Alert} from "react-native"
import { saveFavorite } from "../storage/localStorage"
import { Monster } from "../types/Monster"

export default function CreateMonsterScreen({navigation}:any){
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [challenge, setChallenge] = useState("");

    const handleSave = async () => {
        if(!name){
            Alert.alert("erro, digite o nome")
            return;
        }

        const newMonster:Monster = {
            index:name.toLowerCase().replace(/\s/g,"-"),
            name,
            type,
            challenge_rating:challenge ? Number(challenge) : navigation.goBack();
        };

        return(
            <View style={styles.container}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName}/>

                <Text style={styles.label}>Tipo:</Text>
                <TextInput style={styles.input} value={type} onChangeText={setType}/>

                <Text style={styles.label}>Desafio (CR):</Text>
                <TextInput style={styles.input} value={challenge} onChangeText={setChallenge} keyboardType="numeric"/>

                <Button title="registrar monstro" onPress={handleSave}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:16,
        backgroundColor:"#111"
    },
    label:{
        color:"#fff",
        marginBottom: 4,
        marginTop: 12,
    },
    input: {
        backgroundColor: "#222",
        color: "#fff",
        padding: 8,
        borderRadius: 4
    }
})