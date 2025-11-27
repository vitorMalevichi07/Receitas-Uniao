import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from "react-native-dropdown-picker";
import { FIRESTORE_DB } from '../../src/Firebase';
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from "../routes/tab.routes";
import { useNavigation } from "@react-navigation/native";

const Homepage = () => {
    const [dados, setDados] = useState<any[]>([]);
    type NavigationProp = StackNavigationProp<RootStackParamList, 'Recipe'>;
    const navigation = useNavigation<NavigationProp>();

    //Variáveis para o picker
    const [open, setOpen] = useState(false);
    const [categoria, setSelectedCategoria] = useState('undefined');
    const [items, setItems] = useState([
        { label: "Todas", value: "undefined" },
        { label: "Salgado", value: "Salgado" },
        { label: "Sobremesa", value: "Sobremesa" },
    ]);

    useEffect(() => {
        const receitasRef = collection(FIRESTORE_DB, 'Receitas');
        let q;

        if (categoria === 'undefined') {
            q = receitasRef;
        } else {
            q = query(receitasRef, where('categoria', '==', categoria));
        }

        const receita = onSnapshot(q, (snapShot) => {
            const lista = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setDados(lista);
        });

        return () => receita();
    }, [categoria]); //assim ele roda toda a vez que alterar a categoria

    return (
        <LinearGradient colors={["#D32F2F", "#E64A19", "#F57C00"]} style={styles.gradient}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Listagem</Text>
                    <View style={{ paddingRight: '3%' }}>
                        <DropDownPicker
                            open={open}
                            value={categoria}
                            items={items}
                            setOpen={setOpen}
                            setValue={setSelectedCategoria}
                            setItems={setItems}
                            placeholder="Categoria"
                            style={styles.dropDown}
                            placeholderStyle={styles.dropPlaceholder}
                            dropDownContainerStyle={styles.dropContainner}
                            listItemLabelStyle={styles.dropList}
                            selectedItemLabelStyle={styles.dropSelectedItem}
                        />
                    </View>
                </View>
                <View style={{ paddingTop: '5%' }}>
                    <FlatList
                        data={dados}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={styles.cardReceita} onPress={() => {
                                navigation.navigate('Recipe', {
                                    receita: item.receita,
                                    categoria: item.categoria,
                                    ingredientes: item.ingredientes,
                                    link_image: item.link_image,
                                    modo_preparo: item.modo_preparo,
                                });
                            }}>
                                <View style={styles.headerCard}>
                                    <Image source={{ uri: item.link_image }} style={styles.imageCard} />

                                    <Text style={styles.textHeaderCard}>{item.receita} - {item.categoria}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: '10%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        paddingTop: '15%',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000ff",
        padding: '3%'
    },
    cardReceita: {
        backgroundColor: "#fff",
        width: 350,
        borderRadius: 12,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        alignContent: "center",
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerCard: {
        flexDirection: 'row'
    },
    imageCard: {
        height: 100,
        width: 100,
        marginRight: 10,
        borderRadius: 12,
        borderColor: '#b7b7b7',
        borderWidth: 2
    },
    textHeaderCard: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
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
        height: 30,
        width: 150,
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
        width: 150,
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

export default Homepage;