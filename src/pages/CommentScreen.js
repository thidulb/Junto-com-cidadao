import * as React from 'react';
import { Component, useState, useEffect } from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView, ImageBackground} from 'react-native';

import moment from 'moment';
import('moment/locale/pt-br');
// console.log(moment.locale());

import api from '../services/api';



export default function CommentScreen() {
  const [ messages, setMessages, local ] = useState([]);

  useEffect(() => {
    api.get("/Mensagens").then(res => {
        setMessages(res.data)
        // console.log(res.data)
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
            <View style={styles.headerCard}>
              { message.sentimentScore === "" &&
                <Text key={message.id, "sentimentoScore"} style={styles.messageText}></Text>
              }
              <Text key={message.id, "curtida"} style={styles.localName}>👍{message.curtidas}</Text>
            </View>
            <Text key={message.id} style={styles.messageText}>{message.texto}</Text>
            <View style={styles.footerCard}>
              { message.sentimentScore <= 0.33 &&
                <Text key={message.id, "sentimentoScore"} style={styles.messageText}>🤬</Text>
              }
              { message.sentimentScore > 0.33 && message.sentimentScore < 1 &&
                <Text key={message.id, "sentimentoScore"} style={styles.messageText}>🤔</Text>
              }
              { message.sentimentScore === 1 &&
                <Text key={message.id, "sentimentoScore"} style={styles.messageText}>🥰</Text>
              }
              <Text key={message.id, "time"} style={styles.localName}>{moment(message.data).add(-3, 'hours').fromNow()}</Text>
            </View>

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
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 5
  },
  headerCard:{
    flexDirection: 'row',
  },

  footerCard: {
    flexDirection: 'row',
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
    paddingHorizontal: 5
  },
  localName: {
    // marginTop: 10,
    color: "#000000",
    fontSize: 18,
    marginLeft: 'auto',
    paddingHorizontal: 5
  },
});
