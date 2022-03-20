import { Modal } from 'react-native';
import React from 'react';

const FormModal = ({ children, addFormVisible, setAddFormVisible }) => {
	return (
		<Modal
			animationType='slide'
			visible={addFormVisible}
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				position: 'absolute',
				width: '100%',
				height: '100%'
			}}
			onRequestClose={() => setAddFormVisible(false)}
		>
			{children}
		</Modal>
	);
};

export default FormModal;
