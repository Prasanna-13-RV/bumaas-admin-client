import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';

const RegisterScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSighup = ({ navigation }) => {
		// const email1 = email .getText().toString().trim()
		console.log('email: ', typeof email);
		auth
			.createUserWithEmailAndPassword(email.trim(), password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log('user: ', user);
				navigation.push('ProfileScreen');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error);
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Register</Text>
			<TextInput
				placeholder='Enter your Email'
				style={styles.input}
				onChangeText={(text) => setEmail(text)}
				value={email}
			/>
			<TextInput
				placeholder='Enter your Password'
				style={styles.input}
				onChangeText={(text) => setPassword(text)}
				value={password}
			/>
			<TextInput
				placeholder='Enter your Confirm Password'
				style={styles.input}
				onChangeText={(text) => setConfirmPassword(text)}
				value={confirmPassword}
			/>
			<TouchableOpacity style={styles.button} onPress={handleSighup}>
				<Text>Register</Text>
			</TouchableOpacity>
			<Text
				onPress={() => {
					navigation.push('LoginScreen');
				}}
				style={styles.text}
			>
				Already have an Account - Login
			</Text>
			<TouchableOpacity
				onPress={() => navigation.push('ProfileScreen')}
				style={styles.text}
			>
				<Text>Profile</Text>
			</TouchableOpacity>
		</View>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		borderWidth: 1,
		borderColor: 'black',
		width: '80%',
		marginBottom: 10,
		padding: 10
	},
	title: {
		fontSize: 30,
		marginBottom: 10
	},
	button: {
		backgroundColor: 'blue',
		padding: 10,
		color: 'white'
	},
	text: {
		marginTop: 10,
		color: 'red'
	}
});
