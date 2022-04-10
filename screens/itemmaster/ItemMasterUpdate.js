import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useState, useEffect, Fragment } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-community/picker";
import * as ExpoFileSystem from "expo-file-system";
import {
  adminItemGetSingleAxios,
  adminItemPutAxios,
  adminInventoryGetSingleAxiosName,
  adminInventoryGetAxios,
} from "../../axios/admin";

const ItemMasterUpdate = ({ route }) => {
  const navigation = useNavigation();
  const [item, setItem] = useState([]);
  const [inventory, setInventory] = useState();
  const itemid = route.params.itemid;
  const [details, setDetails] = useState();
    const [file, setFile] = useState();
  const [fileResponse, setFileResponse] = useState(item[0] && item[0].drawing);

  const handleDocumentSelection = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      console.log(result);
      const fileContent = await ExpoFileSystem.readAsStringAsync(result.uri);
        setFile(fileContent);
      setFileResponse(
        result.name,
        
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {}, [details]);

  useEffect(async () => {
    adminInventoryGetAxios().then((res) => setInventory(res.data));
    console.log(itemid);
    await adminItemGetSingleAxios(itemid)
      .then(async (res) => {
        // console.log(res["customer"],"ass");
        // setDelet(false);
        setItem(res);
        setFileResponse(res[0].drawing);
        console.log(res[0].part_no, "updates");
        await adminInventoryGetSingleAxiosName(res[0].part_no).then((res1) => {
          setDetails(res1[0]);

          console.log(details,res1[0],res1, "details");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const formFields = [
    {
      name: "part_no",
      placeholder: "Best Part No",
    },
    {
      name: "description",
      placeholder: "Description",
    },
    {
      name: "type",
      placeholder: "Type",
    },
    {
      name: "product_group",
      placeholder: "Product group",
    },
    {
      name: "weight",
      placeholder: "Weight",
    },
    {
      name: "standard_box_quantity",
      placeholder: "Standard box quantity",
    },
    {
      name: "safety_stock",
      placeholder: "Safety Stock",
    },
    {
      name: "rol",
      placeholder: "ROL",
    },
    {
      name: "standard_lead_time",
      placeholder: "Standard Lead Time",
    },
    {
      name: "hsn_code",
      placeholder: "HSN Code",
    },
    {
      name: "local_imported",
      placeholder: "Local / Imported",
    },
  ];
  const handlePick = async (value) => {
    console.log("ji", details);
    console.log(value);
    adminInventoryGetSingleAxiosName(value).then((res) => {
      console.log(res[0], "lo");
      res.map((i) => {
        console.log(i, "vals");
        setDetails({
          part_no: i.part_no,
          description: i.description,
          product_group: i.product_group,
          type: i.type,
          standard_box_quantity: i.standard_box_quantity.toLocaleString(),
          weight: i.weight.toLocaleString(),

          //    safety_stock: item[0].safety_stock.toLocaleString(),
          //         rol: item[0].rol.toLocaleString(),
          //         standard_lead_time: item[0].standard_lead_time.toLocaleString(),
          //         hsn_code: item[0].hsn_code.toLocaleString(),
          //         local_imported: item[0].local_imported.toLocaleString(),
        });
      });
      console.log(details, "new");
    });
    //If file selected then create FormData
  };
  const schema = yup.object().shape({
    part_no: yup.string().required(),
    safety_stock: yup.number().required(),
    rol: yup.number().required(),
    standard_lead_time: yup.number().required(),
    hsn_code: yup.number().required(),
    local_imported: yup.string().required(),
  });

  return (
    <>
    {item.length > 0 ? (
    <>
      {
        details &&
        (console.log(item, "update"),
        console.log(item[0], "update"),
        (
          <Formik
            initialValues={{
              part_no: item[0].part_no,
              description: details.description,
              type: details.type,
              product_group: details.product_group,
              weight: details.weight.toLocaleString(),
              standard_box_quantity:
                details.standard_box_quantity.toLocaleString(),
                    
              safety_stock: item[0].safety_stock.toLocaleString(),
              rol: item[0].rol.toLocaleString(),
              standard_lead_time: item[0].standard_lead_time.toLocaleString(),
              hsn_code: item[0].hsn_code.toLocaleString(),
              local_imported: item[0].local_imported.toLocaleString(),
            }}
            onSubmit={(values) => {
              console.log(fileResponse);
              var fileToUpload;
              if (fileResponse != item[0].drawing) {
                console.log("joo");
                fileToUpload = fileContent;

                const data = new FormData();
                data.append("name", fileResponse);
                data.append("file_attachment", fileToUpload);
                adminItemPutAxios(
                  values,
                  details,
                  data,
                  fileResponse,
                  itemid
                );
              } else {
                adminItemPutAxios(
                  values,
                  details,
                  null,
                  item[0].drawing,
                  itemid    
                );
              }
              navigation.replace("Itemmaster");
            }}
            validationSchema={schema}
            validateOnMount={true}
          >
            {({ handleChange, handleSubmit, values, isValid }) => {
              console.log(isValid);
              return (
                <ScrollView>
                  <Text
                    style={{
                      textAlign: "center",
                      marginVertical: 30,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Update Item
                  </Text>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-start",
                      marginHorizontal: "auto",
                      flex: 1,
                      padding: 30,
                      paddingTop: 0,
                    }}
                  >
                    {formFields.map((field, index) => (
                      <Fragment key={index}>
                        <Text
                          style={{
                            textAlign: "left",
                            marginLeft: 10,
                            marginTop: index === 0 ? 0 : 10,
                          }}
                        >
                          {field.placeholder}
                        </Text>

                        {field.name != "part_no" && (
                          <TextInput
                            key={index}
                            style={styles.input}
                            placeholder={field.placeholder}
                            onChangeText={handleChange(field.name)}
                            value={
                              details[field.name]
                                ? details[field.name]
                                : values[field.name]
                            }
                            keyboardType={"numeric"}
                          />
                        )}
                        {field.name == "part_no" ? (
                          <Picker
                            style={styles.picker}
                            mode="dropdown"
                            placeholder="Select Best part no"
                            onValueChange={(itemValue) => (
                              handleChange(field.name), handlePick(itemValue)
                            )}
                            selectedValue={
                              details ? details.part_no : values[field.name]
                            }
                          >
                            <Picker.Item label="Select Type" value="" />

                            {inventory.map((it) => (
                              <Picker.Item
                                label={it.part_no}
                                value={it.part_no}
                              />
                            ))}
                          </Picker>
                        ) : null}
                      </Fragment>
                    ))}
                    <View>
                      <Button
                        title={"Select Drawing"}
                        // style={styles.btn(isValid)}
                        onPress={handleDocumentSelection}
                      ></Button>
                      <Text>
                        {fileResponse ? fileResponse : item[0].drawing}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.btn(isValid)}
                      onPress={() => handleSubmit()}
                    >
                      <Text style={{ color: "white" }}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              );
            }}
          </Formik>
        ))}
    </>
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
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#609BEB",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: "100%",
    marginVertical: 5,
  },
  picker: {
    width: "100%",
    borderColor: "#609BEB",
    borderWidth: 1,
    borderRadius: 50,
  },
  btn: (isValid) => ({
    backgroundColor: isValid ? "#609BEB" : "#CDD3D5",
    color: "white",
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "40%",
    borderRadius: 50,
    marginVertical: 10,
  }),
});

export default ItemMasterUpdate;
