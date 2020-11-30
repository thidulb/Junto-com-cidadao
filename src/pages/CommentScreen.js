import * as React from 'react';
import { Component, useState, useEffect } from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView, ImageBackground} from 'react-native';

import api from '../services/api';

export default function CommentScreen() {
  const [ messages, setMessages ] = useState([]);

  useEffect(() => {
    api.get("/Mensagens").then(res => {
        setMessages(res.data)
        console.log(res.data)
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
      <ImageBackground
          source={require('../../assets/background.jpg')}
          style={styles.backgroundImage}
          blurRadius={2}>
        <ScrollView>
          <Text style={styles.title}>Mensagens</Text>
          
          
          {messages.map((message, index) => 
          <View style={styles.commentsCard}>
            <Text key={message.id} style={styles.messageText}>{message.texto}</Text>
            
            <if condition={message.sentimentScore < 0.33}>
              <Text style={styles.messageText}>1</Text>;
            </if>

              


          </View>
          )}
          
        </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </>
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
  commentsCard: {
    backgroundColor: "#ffc70f",
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10
  },
  title: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 24,
    marginVertical: 10,
  },
  messageText: {
    // marginTop: 10,
    color: "#000000",
    fontSize: 18,
  },
});
