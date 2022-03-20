import { Platform, SafeAreaView, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';

import InventoryFormModalContainer from '../../components/inventorymaster/InventoryFormModalContainer.component';
import ViewBestParts from '../../components/inventorymaster/ViewBestParts.component';
// import { adminInventoryGetAxios } from '../../axios/admin';

const Inventrymaster = () => {
	const [addFormVisible, setAddFormVisible] = useState(false);
	const [bestPartDetails, setBestPartDetails] = useState([]);

	// useEffect(async () => {
	// 	await adminInventoryGetAxios().then((res) => setBestPartDetails(res.data));
	// }, []);
	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingTop: Platform.OS !== 'ios' ? StatusBar.currentHeight : 0
			}}
		>
			<ViewBestParts
				bestPartDetails={bestPartDetails}
				setAddFormVisible={setAddFormVisible}
			/>
			<InventoryFormModalContainer
				addFormVisible={addFormVisible}
				setAddFormVisible={setAddFormVisible}
			/>
		</SafeAreaView>
	);
};

export default Inventrymaster;
