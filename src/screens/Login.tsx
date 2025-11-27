import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ImageBackground, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from '../../src/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error: any) {
            console.log(error);
            Alert.alert('Falha ao entrar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            Alert.alert('Verifique seu email!');
        } catch (error: any) {
            console.log(error);
            Alert.alert('Falha ao registrar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : "padding"}
                style={styles.container}
            >
                <ImageBackground
                    source={require('../../assets/Background-Login.png')} // URL da imagem
                    style={styles.background}
                    resizeMode="cover" // cover, contain ou stretch
                >
                    <Image
                        source={require('../../assets/Logo-Uniao.png')}
                        style={styles.logo}
                    />
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#aaa" />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            placeholderTextColor="#b7b7b7"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#aaa" />
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor="#b7b7b7"
                            value={password}
                            onChangeText={setPass}
                            keyboardType='numeric'
                            secureTextEntry
                        />
                    </View>
                    {loading ? <ActivityIndicator size='large' color='#fc710dff' />
                        : <>
                            {/* Login */}
                            <TouchableOpacity style={styles.button} onPress={signIn}>
                                <Text style={styles.buttonText}>ENTRAR</Text>
                            </TouchableOpacity>

                            {/* Create Acount */}
                            <TouchableOpacity onPress={signUp}>
                                <Text style={styles.boldText}>
                                    Não tem conta? <Text style={styles.link}>Cadastre-se</Text>
                                </Text>
                            </TouchableOpacity>
                        </>
                    }
                </ImageBackground>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 250,
        height: 250
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#b7b7b7',
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 50,
        width: 290,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: "#666",
        fontSize: 16,
    },

    button: {
        backgroundColor: '#fc710dff',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        width: 160,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center',
        color: "#fff",
    },
});

export default Login;