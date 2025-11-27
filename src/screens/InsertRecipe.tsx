import React, { useState, useRef } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '../Firebase';
import { LinearGradient } from 'expo-linear-gradient';

const InsertRecipe = () => {
    //pega os dados das entradas
    const inputReceitaRef = useRef<TextInput>(null);
    const [image, setImage] = useState('');
    const [receita, setReceita] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [preparo, setPreparo] = useState('');
    //Variáveis para o picker
    const [open, setOpen] = useState(false);
    const [categoria, setSelectedCategoria] = useState('');
    const [items, setItems] = useState([
        { label: "Salgado", value: "Salgado" },
        { label: "Sobremesa", value: "Sobremesa" },
    ]);
    //Váriavel para setar o loading
    const [loading, setLoading] = useState(false);


    //Funçãao que salva a receita no bd
    const adicionarReceita = async () => {
        setLoading(true);
        try {
            await addDoc(collection(FIRESTORE_DB, "Receitas"), {
                categoria: categoria,
                ingredientes: ingredientes,
                link_image: image,
                modo_preparo: preparo,
                receita: receita
            });
            Alert.alert("Dados adicionados com sucesso!");
        } catch (error) {
            Alert.alert('Erro ao add' + error);
        } finally {
            setSelectedCategoria('');
            setIngredientes('');
            setImage('');
            setPreparo('');
            inputReceitaRef.current?.focus();
            setReceita('');
            setLoading(false);
        }
    };
    return (
        <LinearGradient colors={["#D32F2F", "#E64A19", "#F57C00"]} style={styles.gradient}>
            <View style={styles.view}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "height" : "padding"}
                    style={styles.container}
                >
                    <View style={styles.whiteContent}>
                        <Text style={styles.title}>Cadastro de Receitas</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="restaurant-outline" size={20} color="#aaa" />
                            <TextInput
                                style={styles.input}
                                ref={inputReceitaRef}
                                placeholder="Nome da Receita"
                                placeholderTextColor="#b7b7b7"
                                value={receita}
                                onChangeText={setReceita}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="link-outline" size={20} color="#aaa" />
                            <TextInput
                                style={styles.input}
                                placeholder="Link da Imagem"
                                placeholderTextColor="#b7b7b7"
                                value={image}
                                onChangeText={setImage}
                            />
                        </View>

                        <View>
                            <DropDownPicker
                                open={open}
                                value={categoria}
                                items={items}
                                setOpen={setOpen}
                                setValue={setSelectedCategoria}
                                setItems={setItems}
                                placeholder="Selecione uma opção"
                                style={styles.dropDown}
                                placeholderStyle={styles.dropPlaceholder}
                                dropDownContainerStyle={styles.dropContainner}
                                listItemLabelStyle={styles.dropList}
                                selectedItemLabelStyle={styles.dropSelectedItem}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="restaurant-outline" size={20} color="#aaa" />
                            <TextInput
                                style={styles.input}
                                placeholder="Ingredientes"
                                placeholderTextColor="#b7b7b7"
                                value={ingredientes}
                                onChangeText={setIngredientes}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="hand-left-outline" size={20} color="#aaa" />
                            <TextInput
                                style={styles.input}
                                placeholder="Modo de Preparo"
                                placeholderTextColor="#b7b7b7"
                                value={preparo}
                                onChangeText={setPreparo}
                            />
                        </View>

                        {loading ? <ActivityIndicator size='large' color='#ff6b00' />
                            : <>
                                {/* Cadastro */}
                                <TouchableOpacity style={styles.button} onPress={adicionarReceita}>
                                    <Text style={styles.buttonText}>Cadastrar</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </View>
                </KeyboardAvoidingView>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    view: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30
    },
    whiteContent: {
        width: '90%',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    title: {
        paddingTop: '5%',
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000ff",
        marginBottom: '5%'
    },
    button: {
        backgroundColor: '#fc710dff',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: '5%',
        width: 250,
        height: 50,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
        width: 250,
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
    dropDown: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#b7b7b7',
        color: '#b7b7b7',
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 50,
        width: 250,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    dropPlaceholder: {
        color: '#b7b7b7',
        fontSize: 16
    },
    dropContainner: {
        backgroundColor: "#fff",
        borderColor: "#b7b7b7",
        borderWidth: 1,
        width: 250,
    },
    dropList: {
        color: "#b7b7b7",
        fontSize: 16,
    },
    dropSelectedItem: {
        color: "#666", // cor do texto selecionado
        fontWeight: "bold",
    },
});

export default InsertRecipe;