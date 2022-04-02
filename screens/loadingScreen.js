import { View, Text,	StyleSheet,Image } from 'react-native'
import React from 'react'

const loadingScreen = () => {

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo2.webp')} style={styles.logo} />
      <Text style={styles.title}>AIMS</Text>
      <Text style={styles.title}>BUMAAS</Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 300,
        resizeMode: 'contain',
        height: 200,
    }
    ,
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      fontStyle: 'italic',  
      marginBottom: 20,
      color: '#609BEB'
    }
})
export default loadingScreen