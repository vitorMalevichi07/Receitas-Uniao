import React from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH } from "../../src/Firebase";

const Profile = () => {
    return (
        <LinearGradient colors={["#D32F2F", "#E64A19", "#F57C00"]} style={styles.gradient}>
            <View style={styles.container}>
                <Image source={require('../../assets/Logo-Uniao.png')} style={{ width: 200, height: 200, marginBottom: 20, borderRadius: 10, }} />
                <TouchableOpacity style={styles.button} onPress={() => FIREBASE_AUTH.signOut()}>
                    <Text style={styles.buttonText}>LogOut</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    button: {
        backgroundColor: "#fc710dff",
        paddingVertical: 15,
        borderRadius: 10,
        width: 200,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
});

export default Profile;