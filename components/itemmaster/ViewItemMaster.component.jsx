import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import React, {useState, useEffect} from "react";
import {adminItemDeleteAxios, adminItemGetAxios} from "../../axios/admin";
import AddButton from "../AddButton.component";

import {useNavigation} from "@react-navigation/native";

const ViewItemMaster = ({bestPartDetails, setAddFormVisible}) => {
    const navigation = useNavigation();
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [delet, setDelet] = useState(false);
    useEffect(async () => {
        setDelet(false);
        await adminItemGetAxios().then((res) =>{ 
            setIsLoading(false);
            setItem(res.data)});
    }, [delet]);
    const handleDelete = async (id) => {
        await adminItemDeleteAxios(id).then((res) => {
            console.log(res);
        });
        setDelet(true);
    };
    return (
        <>
        {!isLoading ? ( 
        <>
            <ScrollView>
                <View style={{flex: 1, padding: 10}}>
                    {item && console.log(item)}
                    {item &&
                        item.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        width: "99%",
                                        // justifyContent: "center",
                                        // alignItems: "center",
                                        backgroundColor: "#fff",
                                        padding: 10,
                                        borderRadius: 10,
                                        borderColor: "black",
                                        borderWidth: 1,
                                        marginBottom: 20,
                                    }}
                                >
                                    <View style={styles.cardRow}>
                                        <View style={styles.miniCard}>
                                            <Text style={styles.miniCardText}>
                                                {item.part_no}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.miniCardText,
                                                    styles.miniCardQuestion,
                                                ]}
                                            >
                                                Best part number
                                            </Text>
                                        </View>
                                        {/* <View style={styles.miniCard}>
                                            <Text style={styles.miniCardText}>
                                                {item.safety_stock}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.miniCardText,
                                                    styles.miniCardQuestion,
                                                ]}
                                            >
                                                Safety Stock
                                            </Text>
                                        </View>
                                        <View style={styles.miniCard}>
                                            <Text style={styles.miniCardText}>
                                                {item.rol}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.miniCardText,
                                                    styles.miniCardQuestion,
                                                ]}
                                            >
                                                ROL
                                            </Text>
                                        </View>
                                        <View style={styles.miniCard}>
                                            <Text style={styles.miniCardText}>
                                                {item.standard_lead_time}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.miniCardText,
                                                    styles.miniCardQuestion,
                                                ]}
                                            >
                                                Standard Lead Time
                                            </Text>
                                        </View>
                                        <View style={styles.miniCard}>
                                            <Text style={styles.miniCardText}>
                                                {item.hsn_code}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.miniCardText,
                                                    styles.miniCardQuestion,
                                                ]}
                                            >
                                                HSN Code
                                            </Text>
                                        </View>
                                        <View style={styles.miniCard}>
                                            <Text style={styles.miniCardText}>
                                                {item.local_imported}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.miniCardText,
                                                    styles.miniCardQuestion,
                                                ]}
                                            >
                                                Local Imported
                                            </Text>
                                        </View>
                                        <View style={styles.miniCard}>
                                            <Text style={styles.miniCardText}>
                                                {item.drawing}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.miniCardText,
                                                    styles.miniCardQuestion,
                                                ]}
                                            >
                                                Drawing
                                            </Text>
                                        </View> */}
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleDelete(item.item_id)
                                            }
                                            style={{
                                                width:
                                                    Dimensions.get("window")
                                                        .width /
                                                        3 -
                                                    30,
                                                backgroundColor: "#fff",
                                                margin: 5,
                                                marginTop: 15,
                                                padding: 8,
                                                borderRadius: 30,
                                                borderWidth: 2,
                                                borderColor: "red",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Text style={{color: "red"}}>
                                                Delete
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.push(
                                                    "ItemMasterUpdate",
                                                    {
                                                        itemid: item.item_id,
                                                    }
                                                )
                                            }
                                            style={{
                                                width:
                                                    Dimensions.get("window")
                                                        .width /
                                                        3 -
                                                    30,
                                                backgroundColor: "#fff",
                                                margin: 5,
                                                marginTop: 15,
                                                padding: 8,
                                                borderRadius: 30,
                                                borderWidth: 2,
                                                borderColor: "black",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Text style={{color: "black"}}>
                                                Update
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.push(
                                                    "IndViewItemMaster",
                                                    {
                                                        itemid: item.item_id,
                                                    }
                                                )
                                            }
                                            style={{
                                                width:
                                                    Dimensions.get("window")
                                                        .width /
                                                        3 -
                                                    30,
                                                backgroundColor: "#fff",
                                                margin: 5,
                                                marginTop: 15,
                                                padding: 8,
                                                borderRadius: 30,
                                                borderWidth: 2,
                                                borderColor: "black",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Text style={{color: "black"}}>
                                                View
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                </View>
            </ScrollView>
            <AddButton setAddFormVisible={setAddFormVisible} /></>
            ) : (
            <View style={{ flex: 1 }}>
          <ActivityIndicator
            style={{ flex: 1, alignSelf: "center" }}
            size="large"
            color="#0000ff"
          />
        </View>
        )}
        </>
    )
};

const styles = StyleSheet.create({
    cardRow: {
        // flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    miniCard: {
        width: "97%",
        backgroundColor: "#fff",
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#609BEB",
        marginLeft: "auto",
        marginRight: "auto",
        padding: 10,
        paddingVertical: 5,
        // alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    miniCardText: {
        marginVertical: 5,
    },
    button: {
        width: Dimensions.get("window").width / 3 - 30,
        backgroundColor: "#fff",
        margin: 5,
        marginTop: 15,
        padding: 8,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    miniCardQuestion: {
        fontWeight: "bold",
        color: "#000",
    },
});

export default ViewItemMaster;
