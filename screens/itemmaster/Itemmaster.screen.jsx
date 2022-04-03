import {Platform, SafeAreaView, StatusBar} from "react-native";
import React, {useState, useEffect} from "react";

import ItemFormModalContainer from "../../components/itemmaster/ItemFormModalContainer.component";
import ViewItemMaster from "../../components/itemmaster/ViewItemMaster.component";
// import { adminInventoryGetAxios } from '../../axios/admin';

const Itemmaster = () => {
    const [addFormVisible, setAddFormVisible] = useState(false);
    const [bestPartDetails, setBestPartDetails] = useState([]);

    // useEffect(async () => {
    // 	await adminInventoryGetAxios().then((res) => setBestPartDetails(res.data));
    // }, []);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: Platform.OS !== "ios" ? StatusBar.currentHeight : 0,
            }}
        >
            <ViewItemMaster
                bestPartDetails={bestPartDetails}
                setAddFormVisible={setAddFormVisible}
            />
            <ItemFormModalContainer
                addFormVisible={addFormVisible}
                setAddFormVisible={setAddFormVisible}
            />
        </SafeAreaView>
    );
};

export default Itemmaster;
