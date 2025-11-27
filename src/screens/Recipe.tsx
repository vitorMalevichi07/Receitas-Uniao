import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from "../routes/tab.routes";

const Recipe = () => {
    type NavigationProp = StackNavigationProp<RootStackParamList, 'Recipe'>;
    const navigation = useNavigation<NavigationProp>();

    const route = useRoute();
    const { receita, categoria, ingredientes, link_image, modo_preparo } = route.params as {
        receita: string;
        categoria: string;
        ingredientes: string;
        link_image: string;
        modo_preparo: string;
    };

    return (
        <View style={styles.container}>
            {/* Header fixo */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>{receita}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Imagem destaque */}
                <Image source={{ uri: link_image }} style={styles.image} />

                {/* Categoria */}
                <Text style={styles.category}>{categoria}</Text>

                {/* Ingredientes */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Ingredientes</Text>
                    <Text style={styles.text}>{ingredientes}</Text>
                </View>

                {/* Preparo */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Modo de Preparo</Text>
                    <Text style={styles.text}>{modo_preparo}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#efeeeeff",
    },
    header: {
        paddingTop: "10%", // respeita notch
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: "#fc710dff",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    backButton: {
        padding: 8,
    },
    headerText: {
        flex: 1,
        fontSize: 20,
        fontWeight: "700",
        color: "#FFF",
        textAlign: "center",
        marginRight: 40, // compensa o espaço do botão
        letterSpacing: 0.5,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    image: {
        width: "100%",
        height: 260,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
    },
    category: {
        alignSelf: "center",
        backgroundColor: "#FFF3E0",
        color: "#E65100",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 20,
        textTransform: "uppercase",
        letterSpacing: 1,
        overflow: "hidden",
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fc710dff",
        marginBottom: 12,
    },
    text: {
        fontSize: 15,
        color: "#333",
        lineHeight: 24,
        textAlign: "left",
    },
});

export default Recipe;