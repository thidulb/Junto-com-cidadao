import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import api from './services/api';
import CommentScreen from './pages/CommentScreen';

function HomeScreen({navigation}) {
  const [value, onChangeText] = React.useState('');

  async function addMessage() {
    console.log("Entrou")
    const res = await api.post("/Mensagens", {
      texto: value,
    })
    
    console.log(res.data)
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="dodgerblue" />

      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/background.jpg')}
          style={styles.backgroundImage}
          blurRadius={2}>
          <View style={styles.centralizar}>
            <Image
              style={styles.logo}
              source={require('../assets/logoJuntoCidadao.webp')}
            />
            <View style={styles.commentView}>
              <TextInput
                style={styles.inputText}
                onChangeText={(text) => onChangeText(text)}
                placeholder={"Insira um comentário"}
              />
              <TouchableOpacity onPress={() => addMessage()}>
                <Text style={styles.buttonPlus}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Comment')}>
              <Text style={styles.buttonText}>Ver comentários existentes</Text>
            </TouchableOpacity>
            <Text style={styles.textBy}>Hackathon Prodam - Grupo 03</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }}/>
        <Stack.Screen name="Comment" component={CommentScreen} options={{ headerShown: false, }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  centralizar: {
    marginHorizontal: 20,
  },
  logo: {
    height: '40%',
    width: '100%',
    alignSelf: 'center',
  },
  commentView: {
    // backgroundColor: 'gray',
    flexDirection: 'row',
  },
  inputText: {
    paddingStart: 10,
    fontSize: 16,
    marginStart: 25,
    marginEnd: 10,
    height: 40,
    width: '77%',
    borderColor: '#ffc70f',
    borderRadius: 5,
    borderWidth: 2,
  },
  buttonPlus: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    backgroundColor: '#ffc70f',
    borderRadius: 5,
    padding: 8,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    marginHorizontal: 25,
    color: '#000',
    textAlign: 'center',
    backgroundColor: '#ffc70f',
    padding: 10,
  },
  textBy: {
    textAlign: 'center',
    marginTop: 5,
  },
});
