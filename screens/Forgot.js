import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { auth } from '../firebase/firebase';

const Forgot = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const handleClick = () => {
    auth.sendPasswordResetEmail(email.trim())
      .then(() => {
        // Password reset email sent!
        setMsg("Password reset email sent!");
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setMsg(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.msg}>Send Password Reset Email</Text>
      <TextInput
        placeholder="Enter your Password"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text style={styles.msg}>{msg}</Text>
      <TouchableOpacity onPress={handleClick} style={styles.button}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.button}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      
    </View>
  );
};
const styles = StyleSheet.create({
    input: {
		borderWidth: 2,
		borderColor: '#609BEB',
		width: '85%',
		marginBottom: 20,
		borderRadius: 30,
        marginVertical: 15,
		padding: 15
	},
    button: {
		// backgroundColor: 'blue',
		borderWidth: 3,
		borderColor: '#609BEB',
		padding: 15,
		width: '30%',
		// textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
        marginVertical: 15,

		color: 'white'
	},
    msg: {
        // color: "red",
        fontSize: 16,
        marginVertical: 5,
        fontWeight: "bold",
    },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Forgot;
