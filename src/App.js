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
  Modal,
  Picker,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import api from './services/api';
import CommentScreen from './pages/CommentScreen';

function HomeScreen({navigation}) {
  const [value, onChangeText] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedTipo, setSelectedTipo] = React.useState();
  const [selectedLocal, setSelectedLocal] = React.useState();
  const [selectedTema, setSelectedTema] = React.useState();

  async function addMessage() {
    console.log("Entrou")
    const res = await api.post("/Mensagens", {
      texto: value,
      local: selectedLocal,
      tema: selectedTema,
      tipo: selectedTipo
    })
    
    console.log(res.data)
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="dodgerblue" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text style={styles.modalText}>Tipo</Text>
            <Picker
              selectedValue={selectedTipo}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) => setSelectedTipo(itemValue)}>
              <Picker.Item label="Sem tipo específico" value=""/>
              <Picker.Item label="Reclamação" value="2f07116b-0006-4b9b-b4f4-e0c702fd2f04" />
              <Picker.Item label="Sugestão" value="79f74eab-ae30-4304-ada4-c83308576a17" />
              <Picker.Item label="Elogio" value="3a915417-b955-48e7-8398-791076d4d258" />
            </Picker>
            <Text style={styles.modalText}>Local</Text>
            <Picker
              selectedValue={selectedLocal}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) => setSelectedLocal(itemValue)}
            > 
              <Picker.Item label="Sem local específico" value=""/>
              <Picker.Item label="Cidade de São Paulo" value="9cb29458-dd46-43df-8b4a-dc1421cc3f83" />
              <Picker.Item label="Centro" value="abc88e69-389c-48b5-bebb-82aa8561ea45" />
              <Picker.Item label="Zona Sul" value="247aa85d-731d-4c3e-9622-035097a85aaa" />
              <Picker.Item label="Zona Norte" value="5337ec2c-e435-4a0d-9885-d6d46cdb2ffd" />
              <Picker.Item label="Zona Oeste" value="f69b3f0d-bfe5-43af-8b9d-de7da39b91c1" />
              <Picker.Item label="Zona Leste" value="f7e13a2f-d107-4aad-9ccb-af93e8de9285" />
            </Picker>
            <Text style={styles.modalText}>Tema</Text>
            <Picker
              selectedValue={selectedTema}
              style={styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) => setSelectedTema(itemValue)}
            >
              <Picker.Item label="Sem tema específico" value=""/>
              <Picker.Item label="Educação" value="03c7afbe-ff77-4d44-8a3e-aea5e61f9f3c" />
              <Picker.Item label="Economia" value="202eb987-1c13-4114-b295-392cd4c7269a" />
              <Picker.Item label="Assistência Social" value="6b87cb26-a9f2-4940-85ed-57b2e89e0ce6" />
              <Picker.Item label="Transporte" value="9d40b6cd-9fd4-4ec9-b156-be20d2cc7bbe" />
              <Picker.Item label="Segurança" value="ab303d1e-1549-43d7-a04c-76dc496f39cc" />
              <Picker.Item label="Saúde" value="e94ae9c5-fae6-4495-a15b-1c59b9105c4e" />
            </Picker>
            <TouchableOpacity onPress={() => { addMessage(), setModalVisible(!modalVisible) }}>
              <Text style={styles.buttonText}>Enviar comentário</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
              <TouchableOpacity>
                <Text style={styles.buttonPlus} onPress={() => {setModalVisible(true);}}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => addMessage()}>
              <Text style={styles.buttonText}>Enviar comentário</Text>
            </TouchableOpacity>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {    
    fontSize: 16,
    color: '#000',
    textAlign: "center"
  },
  pickerStyle: {
    height: 50, 
    width: 250
  }

});
