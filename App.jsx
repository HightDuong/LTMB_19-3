import React, { createContext, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

// Context để quản lý trạng thái đăng nhập
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Màn hình Sign In (Giữ nguyên giao diện ban đầu)
const SignInScreen = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.label}>Email ID</Text>
      <TextInput style={styles.input} placeholder="Enter your email here!" />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password here!"
        secureTextEntry
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>For got password?</Text>
      </TouchableOpacity>

      <Button
        mode="contained"
        style={styles.signInButton}
        onPress={() => setIsLoggedIn(true)}
      >
        Sign In
      </Button>

      <Text style={styles.orSignInText}>Or sign in with</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={20} color="#DB4437" />
          <Text style={styles.socialText}> Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={20} color="#1877F2" />
          <Text style={styles.socialText}> Facebook</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUpText}>
          Not yet a member? <Text style={{ color: "blue" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Màn hình Explorer (Danh sách món ăn)
const ExplorerScreen = () => {
  const categories = [
    {
      id: "1",
      name: "Pizza",
      image:
        "https://th.bing.com/th/id/OIP.4xmaKtpHHA91m_-z_PtnyAHaE8?w=292&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: "2",
      name: "Burgers",
      image:
        "https://th.bing.com/th/id/OIP.bL0ONY_KiaonyqkIE8myZgHaER?w=300&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: "3",
      name: "Steak",
      image:
        "https://th.bing.com/th/id/OIP.n6ENeaYs6Oz_wdo8iZsJOwHaHa?rs=1&pid=ImgDetMain",
    },
  ];

  const popularItems1 = [
    {
      id: "1",
      name: "Food 1",
      price: 15,
      category: "By Viet Nam",
      image:
        "https://th.bing.com/th/id/OIP.n6ENeaYs6Oz_wdo8iZsJOwHaHa?rs=1&pid=ImgDetMain",
    },
    {
      id: "2",
      name: "Food 2",
      price: 35,
      category: "For You",
      image:
        "https://th.bing.com/th/id/OIP.n6ENeaYs6Oz_wdo8iZsJOwHaHa?rs=1&pid=ImgDetMain",
    },
  ];

  const popularItems2 = [
    {
      id: "3",
      name: "Food 3",
      price: 20,
      discount: "10% OFF",
      image:
        "https://th.bing.com/th/id/OIP.n6ENeaYs6Oz_wdo8iZsJOwHaHa?rs=1&pid=ImgDetMain",
    },
    {
      id: "4",
      name: "Food 4",
      price: 25,
      image:
        "https://th.bing.com/th/id/OIP.n6ENeaYs6Oz_wdo8iZsJOwHaHa?rs=1&pid=ImgDetMain",
    },
  ];

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );

  const renderPopularItem1 = ({ item }) => (
    <View style={styles.popularItem}>
      <Image source={{ uri: item.image }} style={styles.popularImage} />
      <View style={styles.popularDetails}>
        <Text style={styles.popularCategory}>{item.category}</Text>
        <Text style={styles.popularName}>{item.name}</Text>
        <Text style={styles.popularPrice}>${item.price}</Text>
      </View>
    </View>
  );

  // Render item cho Popular Items (Section 2)
  const renderPopularItem2 = ({ item }) => (
    <View style={styles.popularItem}>
      <Image source={{ uri: item.image }} style={styles.popularImage} />
      <View style={styles.popularDetails}>
        {item.discount && (
          <Text style={styles.discountText}>{item.discount}</Text>
        )}
        <Text style={styles.popularName}>{item.name}</Text>
        <Text style={styles.popularPrice}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.explorerContainer}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="map-marker" size={20} color="#000" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for meals or area"
        />
        <FontAwesome name="search" size={20} color="#000" />
        <TouchableOpacity>
          <FontAwesome name="sliders" size={20} color="#FFA500" />
        </TouchableOpacity>
      </View>

      {/* Top Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Popular Items (Section 1) */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={popularItems1}
          renderItem={renderPopularItem1}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Popular Items (Section 2) */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={popularItems2}
          renderItem={renderPopularItem2}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

// Màn hình Account
const AccountScreen = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <Text>Name: John Doe</Text>
      <Text>Email: johndoe@example.com</Text>
      <Button
        mode="contained"
        style={styles.signOutButton}
        onPress={() => setIsLoggedIn(false)}
      >
        Sign Out
      </Button>
    </View>
  );
};

// Navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Explorer") {
          iconName = "compass";
        } else if (route.name === "Account") {
          iconName = "user";
        }
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "orange",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: { paddingBottom: 5, height: 60 },
    })}
  >
    <Tab.Screen name="Explorer" component={ExplorerScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
);

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

// StyleSheet
const styles = StyleSheet.create({
  // Styles cho SignInScreen (Giữ nguyên như ban đầu)
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    color: "orange",
    textAlign: "right",
    marginBottom: 15,
  },
  signInButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    borderRadius: 5,
  },
  orSignInText: {
    textAlign: "center",
    marginVertical: 15,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  socialText: {
    fontSize: 16,
  },
  signUpText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },

  // Styles cho AccountScreen
  signOutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },

  // Styles cho ExplorerScreen
  explorerContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#FFA500",
    fontSize: 14,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 15,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
  },
  popularItem: {
    marginRight: 15,
    width: 150,
  },
  popularImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  popularDetails: {
    marginTop: 5,
  },
  popularCategory: {
    fontSize: 12,
    color: "#888",
  },
  popularName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  popularPrice: {
    fontSize: 14,
    color: "#000",
  },
  discountText: {
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
  },
});
