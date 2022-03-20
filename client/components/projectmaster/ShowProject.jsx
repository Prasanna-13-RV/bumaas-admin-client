import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import {
  adminProjectGetAxios,
  adminProjectDeleteAxios,
} from "../../axios/admin";
import AddButton from "../AddButton.component";
import { useNavigation } from "@react-navigation/native";

const ShowProject = ({ setAddFormVisible, setCustomerid, customerid }) => {
  console.log("customsss", customerid);
  const navigation = useNavigation();
  const [project, setProject] = useState([]);
  const [delet, setDelet] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(async () => {
    await adminProjectGetAxios(customerid)
      .then((res) => {
        setDelet(false);
        setProject(res.result);
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "errProject");
      });
  }, [delet]);
  const handleDelete = async (customerid, projectid) => {
    console.log(customerid, projectid, "he");
    await adminProjectDeleteAxios(customerid, projectid).then((res) => {
      setDelet(true);
      console.log(res);
    });
  };
  const handleClick = (id) => {
    // console.log(id);
    // setCustomerid(id);
    navigation.push("Projectmaster", { customerid: id });
    // console.log('hi');
  };
  return (
    <>
      <ScrollView>
        <View style={{ flex: 1, padding: 10 }}>
          {project && console.log(project)}
          {project &&
            project.map((item, index) => {
              // console.log('====================================');
              // console.log(item,'item');
              // console.log('====================================');
              // {console.log(item.customer_id,'asd')}
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
                        {item.project_name}
                      </Text>
                      {/* {console.log(item.customer_id,'asd')} */}
                      <Text style={styles.miniCardText}>Project Name</Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>
                        {item.customer_name}
                      </Text>
                      <Text style={styles.miniCardText}>Customer Name</Text>
                    </View>
                  </View>
                  <View style={styles.cardRow}>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>
                        {item.customer_part_no}
                      </Text>
                      {/* {console.log(item.customer_id,'asd')} */}
                      <Text style={styles.miniCardText}>Customer Part No</Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>{item.part_no}</Text>
                      <Text style={styles.miniCardText}>Part No</Text>
                    </View>
                  </View>
                  <View style={styles.cardRow}>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>
                        {item.description}
                      </Text>
                      {/* {console.log(item.customer_id,'asd')} */}
                      <Text style={styles.miniCardText}>Description</Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>{item.type}</Text>
                      <Text style={styles.miniCardText}>Type</Text>
                    </View>
                  </View>
                  <View style={styles.cardRow}>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>
                        {item.product_group}
                      </Text>
                      {/* {console.log(item.customer_id,'asd')} */}
                      <Text style={styles.miniCardText}>Product Group</Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>{item.weight}</Text>
                      <Text style={styles.miniCardText}>Weight</Text>
                    </View>
                  </View>
                  <View style={styles.cardRow}>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>
                        {item.norms_per_project}
                      </Text>
                      {/* {console.log(item.customer_id,'asd')} */}
                      <Text style={styles.miniCardText}>Norms Per Project</Text>
                    </View>
                    <View style={styles.miniCard}>
                      <Text style={styles.miniCardText}>
                        {item.consumption_tracking}
                      </Text>
                      <Text style={styles.miniCardText}>
                        Consumption Tracking
                      </Text>
                    </View>
                  </View>
                  <View style={styles.miniCard}>
                    <Text style={styles.miniCardText}>
                      {item.weekly_consumption}
                    </Text>
                    <Text style={styles.miniCardText}>Weekly Consumption</Text>
                  </View>
                  <View style={styles.miniCard}>
                    <Text style={styles.miniCardText}>
                      {item.standard_box_quantity}
                    </Text>
                    <Text style={styles.miniCardText}>
                      Standard Box Quantity
                    </Text>
                  </View>
                  <View style={styles.miniCard}>
                    <Text style={styles.miniCardText}>{item.lead_time}</Text>
                    <Text style={styles.miniCardText}>Lead Time</Text>
                  </View>
                  <View style={styles.miniCard}>
                    <Text style={styles.miniCardText}>{item.safety_stock}</Text>
                    <Text style={styles.miniCardText}>Safety Stock</Text>
                  </View>
                  <View style={styles.miniCard}>
                    <Text style={styles.miniCardText}>
                      {item.re_order_level}
                    </Text>
                    <Text style={styles.miniCardText}>Re Order Level</Text>
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
                        handleDelete(item.customer_id, item.project_id)
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
                        onPress={()=>navigation.push("ProjectUpdate", {customerid: item.customer_id, projectid: item.project_id})}
                      style={{
                        width: Dimensions.get("window").width / 3 - 30,
                        backgroundColor: "#fff",
                        margin: 5,
                        marginTop: 15,
                        padding: 8,
                        borderRadius: 30,
                        borderWidth: 2,
                        borderColor: "#00a680",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={[styles.text,
                    {
                        color: "#00a680",
                    }]}>Update</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <AddButton setAddFormVisible={setAddFormVisible}/>
    </>

    // <>
    //     <ScrollView>
    //         <View style={{flex: 1, padding: 10}}>
    //             {customer &&
    //                 customer.map((item, index) => {
    //                     {
    //                         console.log(item.customer_id);
    //                     }
    //                     return (
    //                         <View
    //                             key={index}
    //                             style={{
    //                                 width: "100%",
    //                                 backgroundColor: "#cccccc",
    //                                 padding: 10,
    //                                 borderRadius: 10,
    //                                 marginBottom: 20,
    //                             }}
    //                         >
    //                             <View style={styles.cardRow}>
    //                                 <View style={styles.miniCard}>
    //                                     <Text style={styles.miniCardText}>
    //                                         {item.customer_name}
    //                                     </Text>
    //                                     <Text style={styles.miniCardText}>
    //                                         Customer Name
    //                                     </Text>
    //                                 </View>
    //                                 <View style={styles.miniCard}>
    //                                     <Text style={styles.miniCardText}>
    //                                         {item.email}
    //                                     </Text>
    //                                     <Text style={styles.miniCardText}>
    //                                         Email
    //                                     </Text>
    //                                 </View>
    //                             </View>
    //                             <View style={styles.cardRow}>
    //                                 <View style={styles.miniCard}>
    //                                     <Text style={styles.miniCardText}>
    //                                         {item.phone}
    //                                     </Text>
    //                                     <Text style={styles.miniCardText}>
    //                                         Phone
    //                                     </Text>
    //                                 </View>
    //                                 <View style={styles.miniCard}>
    //                                     <Text style={styles.miniCardText}>
    //                                         {item.gst_no}
    //                                     </Text>
    //                                     <Text style={styles.miniCardText}>
    //                                         GST No
    //                                     </Text>
    //                                 </View>
    //                                 <View style={styles.miniCard}>
    //                                     <Text style={styles.miniCardText}>
    //                                         {item.fax_no}
    //                                     </Text>
    //                                     <Text style={styles.miniCardText}>
    //                                         FAX No
    //                                     </Text>
    //                                 </View>
    //                             </View>
    //                             {/* <View
    //                                 style={{
    //                                     backgroundColor: "#fff",
    //                                     borderRadius: 10,
    //                                     padding: 15,
    //                                     margin: 5,
    //                                 }}
    //                             >
    //                                 <Text>
    //                                     Product group - {item.product_group}
    //                                 </Text>
    //                             </View> */}
    //                             {/* <View
    //                                 style={{
    //                                     backgroundColor: "#fff",
    //                                     borderRadius: 10,
    //                                     padding: 15,
    //                                     margin: 5,
    //                                 }}
    //                             >
    //                                 <Text>Description -</Text>
    //                                 <Text>{item.description}</Text>
    //                             </View> */}
    //                             <View
    //                                 style={{
    //                                     flexDirection: "row",
    //                                     justifyContent: "center",
    //                                     alignItems: "center",
    //                                 }}
    //                             >
    //                                 <TouchableOpacity
    //                                     style={{
    //                                         width:
    //                                             Dimensions.get("window")
    //                                                 .width /
    //                                                 3 -
    //                                             30,
    //                                         backgroundColor: "green",
    //                                         margin: 5,
    //                                         padding: 10,
    //                                         borderRadius: 10,
    //                                         alignItems: "center",
    //                                         justifyContent: "center",
    //                                     }}
    //                                 >
    //                                     <Text style={styles.text}>
    //                                         Delete
    //                                     </Text>
    //                                 </TouchableOpacity>
    //                                 <TouchableOpacity
    //                                     style={{
    //                                         width:
    //                                             Dimensions.get("window")
    //                                                 .width /
    //                                                 3 -
    //                                             30,
    //                                         backgroundColor: "blue",
    //                                         margin: 5,
    //                                         padding: 10,
    //                                         borderRadius: 10,
    //                                         alignItems: "center",
    //                                         justifyContent: "center",
    //                                     }}
    //                                 >
    //                                     <Text style={styles.text}>
    //                                         Update
    //                                     </Text>
    //                                 </TouchableOpacity>
    //                                 <TouchableOpacity
    //                                     onPress={() =>
    //                                         handleClick(item.customer_id)
    //                                     }
    //                                     style={{
    //                                         width:
    //                                             Dimensions.get("window")
    //                                                 .width /
    //                                                 3 -
    //                                             30,
    //                                         backgroundColor: "black",
    //                                         margin: 5,
    //                                         padding: 10,
    //                                         borderRadius: 10,
    //                                         alignItems: "center",
    //                                         justifyContent: "center",
    //                                     }}
    //                                 >
    //                                     <Text style={styles.text}>
    //                                         Project
    //                                     </Text>
    //                                 </TouchableOpacity>
    //                             </View>
    //                         </View>
    //                     );
    //                 })}
    //         </View>
    //     </ScrollView>
    //     <AddButton setAddFormVisible={setAddFormVisible} />
    // </>

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
    color: "#fff",
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
export default ShowProject;
