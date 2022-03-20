import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  adminInventoryDeleteAxios,
  adminInventoryGetAxios,
} from "../../axios/admin";
import AddButton from "../../components/AddButton.component";

import {useNavigation} from "@react-navigation/native";

const ViewBestParts = ({ bestPartDetails, setAddFormVisible }) => {
	  const navigation = useNavigation();
  const [inventory, setInventory] = useState([]);
  const [delet, setDelet] = useState(false);
  useEffect(async () => {
    setDelet(false);
    await adminInventoryGetAxios().then((res) => setInventory(res.data));
  }, [delet]);
  const handleDelete = async (id) => {
    await adminInventoryDeleteAxios(id).then((res) => {
      console.log(res);
    });
    setDelet(true);
  };
  return (
    <>
      <ScrollView>
        <View style={{ flex: 1, padding: 10 }}>
			{inventory && console.log(inventory)}
          {inventory &&
            inventory.map((item, index) => {
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
                      <Text style={styles.miniCardText}>Best part number</Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>
                        {item.description}
                      </Text>
                      <Text style={styles.miniCardText}>Description</Text>
                    </View>
                  </View>
                  <View style={styles.cardRow}>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>{item.type}</Text>
                      <Text style={styles.miniCardText}>Type</Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>
                        {item.product_group}
                      </Text>
                      <Text style={styles.miniCardText}>Product Group</Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>{item.weight}</Text>
                      <Text style={styles.miniCardText}>Weight</Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>
                        {item.standard_box_quantity}
                      </Text>
                      <Text style={styles.miniCardText}>
                        Standard Box Quantity
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleDelete(item.inventory_id)}
                      style={{
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
                      }}
                    >
                      <Text style={{ color: "red" }}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
					 onPress={()=>navigation.push("InventoryUpdate", {inventoryid: item.inventory_id})}
                      style={{
                        width: Dimensions.get("window").width / 3 - 30,
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
                      <Text style={{ color: "black" }}>Update</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <AddButton setAddFormVisible={setAddFormVisible} />
    </>
  );
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
});

export default ViewBestParts;
