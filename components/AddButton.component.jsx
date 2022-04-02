import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';

const AddButton = ({ setAddFormVisible }) => {
	return (
		<TouchableOpacity
			onPress={() => setAddFormVisible(true)}
			style={styles.formOpenButton}
		>
			<Image
				source={{
					uri: 'https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/96/ffffff/external-plus-user-interface-tanah-basah-glyph-tanah-basah-2.png'
				}}
				style={{ width: 50, height: 50 }}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	formOpenButton: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		backgroundColor: '#609BEB',
		alignItems: 'center',
		justifyContent: 'center',
		width: 60,
		height: 60,
		borderRadius: 15,
		elevation: 5
	}
});

export default AddButton;
