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
// import ShowCustomer from '../../components/customermaster/showCustomer';
import ProjectFormModalContainer from '../../components/projectmaster/ProjectFormModalContainer.component';
import ShowProject from '../../components/projectmaster/ShowProject';
const Projectmaster = ({route}) => {
	
	const [addFormVisible, setAddFormVisible] = useState(false);
	// Console.log(addFormVisible);
	console.log(route.params.customerid);
	// const [customerid, setCustomerid] = useState();

	return (
		<SafeAreaView style={styles.container}>
			
			<ShowProject
			customerid={route.params.customerid}
			setAddFormVisible={setAddFormVisible}
			
			// setCustomerid={setCustomerid}
			/>
			<ProjectFormModalContainer 
			customerid={route.params.customerid}
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
export default Projectmaster;
