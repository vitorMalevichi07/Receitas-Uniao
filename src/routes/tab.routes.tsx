import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const { Screen, Navigator } = createBottomTabNavigator();

//props
import Homepage from '../screens/Homepage';
import InsertRecipe from '../screens/InsertRecipe';
import Profile from '../screens/Profile';

export type RootStackParamList = {
    Recipe: {
        receita: string;
        categoria: string;
        ingredientes: string;
        link_image: string;
        modo_preparo: string;
    };
};

export function TabRoutes() {
    return (
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: '#fc710dff', // cor quando ativo
                tabBarInactiveTintColor: '#888',  // cor quando inativo
            }}
        >
            <Screen
                name="Home"
                component={Homepage}
                options={{
                    headerShown: false, title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    )
                }}
            />
            <Screen
                name='InsertRecipe'
                component={InsertRecipe}
                options={{
                    headerShown: false, title: 'Inserir Receita',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='add-circle-outline' color={color} size={size} />
                    )
                }}
            />
            <Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false, title: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='person-circle-outline' color={color} size={size} />
                    )
                }}
            />
        </Navigator>
    )
}