import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, Fragment } from "react";
import { Picker } from "@react-native-community/picker";
import { Dropdown } from "react-native-element-dropdown";
import { Formik } from "formik";
import * as yup from "yup";
import {
  adminCustomerPostAxios,
  adminCustomerGetSingleAxios,
  adminInventoryGetAxios,
  adminProjectPostAxios,
} from "../../axios/admin";
import FormModal from "../FormModal.component";
import NavigationSignUp from "../../navigation";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const ProjectFormModalContainer = ({
  addFormVisible,
  setAddFormVisible,
  customerid,
}) => {
  console.log("customerid", customerid);
  const navigation = useNavigation();
  var col;
  var qq;
  const [color, setColor] = useState(false);
  const [customer, setCustomer] = useState();
  const [inventory, setInventory] = useState();
  const [value, setValue] = useState(null);
  //   const [index, setIndex] = useState(1);
  const [selected, setSelected] = useState([]);
  useEffect(async () => {
    await adminCustomerGetSingleAxios(customerid).then((res) => {
      //  console.log("res",res.data[0]);
      // col = res.data.color;
      console.log(res.data[0], "plddd");
      setCustomer(res.data[0]);
      // setColor(col);
    });
    await adminInventoryGetAxios().then((res) => {
      console.log(res, "rsssrs");
      setInventory(res.data);
      console.log("====================================");
      // console.log(customer,'hi');
      console.log("====================================");
    });
  }, []);
  const arr = [
    {
      name: "project_name",
      placeholder: "Project Name",
    },
    {
      name: "customer_name",
      placeholder: "Customer Name",
    },
    {
      name: "customer_part_no",
      placeholder: "Customer Part No",
    },
    {
      name: "part_no",
      placeholder: "Part No",
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
      placeholder: "Product Group",
    },
    {
      name: "weight",
      placeholder: "Weight",
    },
    {
      name: "norms_per_project",
      placeholder: "Norms Per Project",
    },
    {
      name: "consumption_tracking",
      placeholder: "Consumption Tracking",
    },
    {
      name: "weekly_consumption",
      placeholder: "Weekly Consumption",
    },
    {
      name: "standard_box_quantity",
      placeholder: "Standard Box Quantity",
    },
    {
      name: "lead_time",
      placeholder: "Lead Time",
    },
    {
      name: "safety_stock",
      placeholder: "Safety Stock",
    },
    {
      name: "re_order_level",
      placeholder: "Re Order Level",
    },
  ];
  let schema = yup.object().shape({
    project_name: yup.string().required(),
    customer_name: yup.string().required(),
    customer_part_no: yup.string().required(),
    part_no: yup.string().required(),
    description: yup.string().required(),
    type: yup.string().required(),
    product_group: yup.string().required(),
    weight: yup.string().required(),
    norms_per_project: yup.string().required(),
    consumption_tracking: yup.string().required(),
    weekly_consumption: yup.string().required(),
    standard_box_quantity: yup.string().required(),
    lead_time: yup.string().required(),
    safety_stock: yup.string().required(),
    re_order_level: yup.string().required(),
  });
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];
  return (
    <FormModal
      addFormVisible={addFormVisible}
      setAddFormVisible={setAddFormVisible}
    >
      {customer && (
        <Formik
          initialValues={{
            project_name: "",
            customer_name: customer["customer"]
              ? customer["customer"].customer_name
              : "",
            customer_part_no: "",
            part_no: "",
            description: "",
            type: "",
            product_group: "",
            weight: "",
            norms_per_project: "",
            consumption_tracking: "",
            weekly_consumption: "",
            standard_box_quantity: "",
            lead_time: "",
            safety_stock: "",
            re_order_level: "",
          }}
          validationSchema={schema}
          validateOnMount={true}
          onSubmit={(values) => {
            adminProjectPostAxios(values, customerid, selected).then((res) => {
              console.log(res);
            });
            setAddFormVisible(false);
            navigation.goBack();
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <ScrollView>
              <View style={styles.main}>
                <>
                  {arr.map((item, index) => {
                    // col = item.name;
                    const arr_part_no = [];
                    const arr_description = [];
                    const arr_type = [];
                    const arr_product_group = [];
                    const arr_weight = [];
                    inventory &&
                      inventory.map((it) => {
                        // console.log(it[item.name],'it');
                        if (it["part_no"]) {
                          // console.log(best_part_no);
                          arr_part_no.push({
                            label: it["part_no"],
                            value: it["part_no"],
                          });
                          // console.log(part_no);
                        }
                        if (it["description"]) {
                          arr_description.push({
                            label: it["description"],
                            value: it["description"],
                          });
                        }

                        if (it["type"]) {
                          arr_type.push({
                            label: it["type"],
                            value: it["type"],
                          });
                        }
                        if (it["product_group"]) {
                          arr_product_group.push({
                            label: it["product_group"],
                            value: it["product_group"],
                          });
                        }
                        if (it["weight"]) {
                          arr_weight.push({
                            label: it["weight"],

                            value: it["weight"],
                          });
                        }
                      });
                    return (
                      <Fragment key={index}>
                        <View style={styles.container}>
                          <Text style={[styles.title, styles.pickerText]}>
                            {item.placeholder}
                          </Text>
                          {item.name != "type" &&
                          item.name != "description" &&
                          item.name != "product_group" &&
                          item.name != "weight" &&
                          item.name != "part_no" ? (
                            <TextInput
                              style={[
                                styles.inputBox,
                                color &&
                                  values[col] == 0 &&
                                  styles.inputBoxError,
                              ]}
                              onChangeText={handleChange(item.name)}
                              onBlur={handleBlur(item.name)}
                              placeholder={item.placeholder}
                              value={values[item.name]}
                              keyboardType={
                                item.name == "weight"
                                  ? "numeric"
                                  : "default" &&
                                    item.name == "norms_per_project"
                                  ? "numeric"
                                  : "default" &&
                                    item.name == "weekly_consumption"
                                  ? "numeric"
                                  : "default" &&
                                    item.name == "standard_box_quantity"
                                  ? "numeric"
                                  : "default" && item.name == "lead_time"
                                  ? "numeric"
                                  : "default" && item.name == "safety_stock"
                                  ? "numeric"
                                  : "default" && item.name == "re_order_level"
                                  ? "numeric"
                                  : "default"
                              }
                            />
                          ) : null}
                          {index == 5 && item.name == "type" ? (
                            <Picker
                              style={styles.picker}
                              mode="dropdown"
                              placeholder="Select City"
                              onValueChange={handleChange(item.name)}
                              selectedValue={values[item.name]}
                            >
                              <Picker.Item label="Select Type" value="" />
                              {/* {console.log(arr_item.name)} */}

                              {arr_type.map((it) => (
                                <Picker.Item
                                  label={it.label}
                                  value={it.value}
                                />
                              ))}
                            </Picker>
                          ) : null}
                          {item.name == "description" ? (
                            <Picker
                              style={{
                                width: "100%",
                              }}
                              mode="dropdown"
                              placeholder="Select City"
                              onValueChange={handleChange(item.name)}
                              selectedValue={values[item.name]}
                            >
                              <Picker.Item label="Select Type" value="" />
                              {/* {console.log(arr_item.name)} */}

                              {arr_description.map((it) => (
                                <Picker.Item
                                  label={it.label}
                                  value={it.value}
                                />
                              ))}
                            </Picker>
                          ) : null}
                          {item.name == "product_group" ? (
                            <Picker
                              style={{
                                width: "100%",
                              }}
                              mode="dropdown"
                              placeholder="Select City"
                              onValueChange={handleChange(item.name)}
                              selectedValue={values[item.name]}
                            >
                              <Picker.Item label="Select Type" value="" />
                              {/* {console.log(arr_item.name)} */}

                              {arr_product_group.map((it) => (
                                <Picker.Item
                                  label={it.label}
                                  value={it.value}
                                />
                              ))}
                            </Picker>
                          ) : null}
                          {item.name == "part_no" ? (
                            <Picker
                              style={{
                                width: "100%",
                              }}
                              mode="dropdown"
                              placeholder="Select City"
                              onValueChange={handleChange(item.name)}
                              selectedValue={values[item.name]}
                            >
                              <Picker.Item label="Select Type" value="" />
                              {/* {console.log(arr_item.name)} */}

                              {arr_part_no.map((it) => (
                                <Picker.Item
                                  label={it.label.toLocaleString()}
                                  value={it.value.toLocaleString()}
                                />
                              ))}
                            </Picker>
                          ) : null}
                          {item.name == "weight" ? (
                            <Picker
                              style={{
                                width: "100%",
                              }}
                              mode="dropdown"
                              placeholder="Select City"
                              onValueChange={handleChange(item.name)}
                              selectedValue={values[item.name]}
                            >
                              <Picker.Item label="Select Type" value="" />
                              {/* {console.log(arr_item.name)} */}

                              {arr_weight.map((it) => (
                                
                                <Picker.Item
                                  label={it.label.toLocaleString()}
                                  value={it.value.toLocaleString()}
                                />
                              ))}
                            </Picker>
                          ) : null}
                        </View>
                      </Fragment>
                    );
                  })}
                  {arr_part_no && (
                    <View style={styles.container1}>
                      <MultiSelect
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        data={arr_part_no}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        searchPlaceholder="Search..."
                        value={selected}
                        onChange={(item) => {
                          setSelected(item);
                        }}
                        renderLeftIcon={() => (
                          <AntDesign
                            style={styles.icon}
                            color="black"
                            name="Safety"
                            size={20}
                          />
                        )}
                        selectedStyle={styles.selectedStyle}
                      />
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.btn(isValid)}
                    onPress={() => {
                      isValid ? handleSubmit() : setColor(true);
                      console.log(color);
                    }}
                  >
                    <Text style={{ color: "white" }}>Submit</Text>
                  </TouchableOpacity>
                </>
              </View>
            </ScrollView>
          )}
        </Formik>
      )}
    </FormModal>
  );
};

const styles = StyleSheet.create({
  container1: { padding: 16, width: "100%" },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  picker: {
    width: "100%",
    borderColor: "#609BEB",
    borderWidth: 1,
    borderRadius: 50,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  inputBoxError: {
    borderColor: "red",
  },
  main: {
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },
  maintitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    textAlign: "left",
    marginLeft: 10,
    marginVertical: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: "auto",
    width: "90%",
    // marginTop: 50
  },
  inputBox: {
    // backgroundColor: '#CDD3D5',
    borderColor: "#609BEB",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: "100%",
    marginVertical: 10,
  },
  btn: (isValid) => ({
    backgroundColor: isValid ? "#609BEB" : "#CDD3D5",
    color: "white",
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    borderRadius: 50,
    marginVertical: 10,
  }),
  btn2: {
    backgroundColor: "#609BEB",
    color: "white",
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    borderRadius: 50,
    marginVertical: 10,
  },
  pickerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default ProjectFormModalContainer;
