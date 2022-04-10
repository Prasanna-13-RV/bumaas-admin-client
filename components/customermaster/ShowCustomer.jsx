import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import {
  adminCustomerGetAxios,
  adminCustomerDeleteAxios,
} from "../../axios/admin";
import AddButton from "../AddButton.component";
import { useNavigation } from "@react-navigation/native";

const ShowCustomer = ({ setAddFormVisible, setCustomerid, customerid }) => {
  const navigation = useNavigation();
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [delet, setDelet] = useState(false);

  useEffect(async () => {
    await adminCustomerGetAxios()
      .then((res) => {
        // setDelet(false);
        var arr = [];

        res.map((item) => {
          arr.push(item);
        });
        setCustomer(arr);
        setIsLoading(false);
      })
      .catch((err) => {});
  }, [delet]);

  const handleDelete = async (id) => {
    await adminCustomerDeleteAxios(id)
      .then((res) => {
        // setDelet(!delet);
        console.log("====================================");
        console.log("====================================");
        navigation.push("Customermaster");
      })
      .catch((err) => {});
    // console.log(delet,'lok');
    // setDelet(!delet);
  };
  const handleClick = (id) => {
    // setCustomerid(id);
    navigation.push("Projectmaster", { customerid: id });
  };
  return (
    <>
      {!isLoading ? (<>
        <ScrollView>
          <View
            style={{
              flex: 1,
              padding: 10,
              
            }}
          >
            {customer &&
              customer.map((item, index) => {
                return (
                  <View key={index} style={styles.maincard}>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>
                        {item["customer"].unique_id}
                      </Text>
                      <Text style={[styles.miniCardText, styles.textquestion]}>
                        Customer ID
                      </Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>
                        {item["customer"].customer_name}
                      </Text>

                      <Text style={[styles.miniCardText, styles.textquestion]}>
                        Customer Name
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          handleDelete(item["customer"].customer_id)
                        }
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
                        <Text
                          style={[
                            styles.text,
                            {
                              color: "red",
                            },
                          ]}
                        >
                          Delete
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.push("CustomerUpdate", {
                            customerid: item["customer"].customer_id,
                          })
                        }
                        style={{
                          marginTop: 15,
                          width: Dimensions.get("window").width / 3 - 30,
                          backgroundColor: "#fff",
                          margin: 5,
                          padding: 8,
                          borderRadius: 30,
                          borderWidth: 2,
                          borderColor: "black",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={[
                            styles.text,
                            {
                              color: "black",
                            },
                          ]}
                        >
                          Update
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.push("ShowAllCustomer", {
                            customerid: item["customer"].customer_id,
                          })
                        }
                        style={{
                          marginTop: 15,
                          width: Dimensions.get("window").width / 3 - 30,
                          backgroundColor: "#fff",
                          margin: 5,
                          padding: 8,
                          borderRadius: 30,
                          borderWidth: 2,
                          borderColor: "black",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={[
                            styles.text,
                            {
                              color: "black",
                            },
                          ]}
                        >
                          View
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          handleClick(item["customer"].customer_id)
                        }
                        style={{
                          marginTop: 15,
                          width: Dimensions.get("window").width / 3 - 30,
                          backgroundColor: "#fff",
                          margin: 5,
                          padding: 8,
                          borderRadius: 30,
                          borderWidth: 2,
                          borderColor: "#00a680",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={[
                            styles.text,
                            {
                              color: "#00a680",
                            },
                          ]}
                        >
                          Project
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

    // <SafeAreaView style={styles.container}>
    //     <ScrollView>
    //         <View style={styles.scroll}>
    //             {/* <View style={styles.box}><Text style={styles.title}>a</Text></View> */}

    //             {customer &&
    //                 customer.map((item, index) => (
    //                     <Fragment key={index}>
    //                         <TouchableOpacity
    //                             style={styles.box}
    //                             onPress={() =>
    //                                 handleClick(item.customer_id)
    //                             }
    //                         >
    //                             <View>
    //                                 <Text style={styles.title}>
    //                                     {item.customer_name}
    //                                 </Text>
    //                             </View>
    //                             {/* // <View style={styles.box}><Text style={styles.title}>{item.customer_name}</Text></View> */}
    //                         </TouchableOpacity>
    //                     </Fragment>
    //                 ))}
    //         </View>
    //     </ScrollView>
    //     <AddButton setAddFormVisible={setAddFormVisible} />
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maincard: {
    width: "99%",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
  },
  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  cardRow: {
    // flexDirection: "row",
    // justifyContent: "space-between",
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
  text: {
    // color: "#fff",
    fontSize: 16,
    // fontWeight: "bold",
  },
  textquestion: {
    // color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // formOpenButton: {
  //     position: "absolute",
  //     bottom: 30,
  //     right: 30,
  //     backgroundColor: "#609BEB",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     width: 60,
  //     height: 60,
  //     borderRadius: 15,
  //     elevation: 5,
  // },
  // container: {
  //     flex: 1,
  //     // backgroundColor: 'black',
  //     width: "100%",
  // },
  // scroll: {
  //     backgroundColor: "#fff",
  //     paddingTop: 20,
  //     flexDirection: "row",
  //     alignContent: "center",
  //     flexWrap: "wrap",
  //     justifyContent: "space-evenly",
  //     alignItems: "center",
  //     // flexWrap: 'wrap',

  //     width: "100%",
  //     // flexWrap: 'wrap',
  //     // flex: 1,
  //     position: "relative",
  //     // justifyContent: 'center'
  // },
  // box: {
  //     width: "45%",
  //     marginVertical: 6,
  //     // position: 'absolute',
  //     // zIndex: 100,
  //     height: 150,
  //     // backgroundColor: '#609BEB',
  //     elevation: 1,
  //     borderRadius: 10,
  //     // shadowColor: '#000',
  //     // shadowOffset: { width: 0, height: 2 },
  //     // shadowOpacity: 0.8,
  //     // shadowRadius: 2,
  //     backgroundColor: "#EFFFFD",
  //     borderColor: "#609BEB",
  //     borderWidth: 2,
  //     justifyContent: "center",
  //     alignItems: "center",
  // },
  // title: {
  //     fontSize: 17,
  //     fontWeight: "bold",
  //     color: "#609BEB",
  // },
});
export default ShowCustomer;
