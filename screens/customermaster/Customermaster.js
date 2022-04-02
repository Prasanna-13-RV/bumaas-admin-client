import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
	StatusBar,
	SafeAreaView
} from 'react-native';
// import AddCustomer from '../../components/customermaster/addCustomer';
import ShowCustomer from '../../components/customermaster/ShowCustomer';
import CustomerFormModalContainer from '../../components/customermaster/CustomerFormModalContainer.component';
const Customermaster = () => {
	
	const [addFormVisible, setAddFormVisible] = useState(false);
	
	return (
		<SafeAreaView style={styles.container}>
			
			<ShowCustomer
			setAddFormVisible={setAddFormVisible}
			/>
			<CustomerFormModalContainer 
			addFormVisible={addFormVisible}
			setAddFormVisible={setAddFormVisible}
			/>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		// padding: 20,
		width: '100%'
	},
	nav: {
		// alignItems: "flex-start",
		flexDirection: 'row',
		justifyContent: 'center'
	},
	btn: {
		height: 50,

		// backgroundColor: "#609BEB",

		width: '50%',
		color: '#609BEB',
		// height: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	active: {
		borderBottomColor: '#609BEB',
		borderBottomWidth: 3
	}
});
export default Customermaster;
