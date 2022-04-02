import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, Fragment } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";

import {
  adminInventoryGetSingleAxios,
  adminInventoryPutAxios,
} from "../../axios/admin";

const InventoryUpdate = ({ route }) => {
  const navigation = useNavigation();
  const [inventory, setInventory] = useState([]);
  const inventoryid = route.params.inventoryid;
  useEffect(async () => {
    console.log(inventoryid);
    await adminInventoryGetSingleAxios(inventoryid)
      .then((res) => {
        // console.log(res["customer"],"ass");
        // setDelet(false);

        console.log(res[0], "update");

        setInventory(res);
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
  ];

  const schema = yup.object().shape({
    part_no: yup.string().required(),
    description: yup.string().required(),
    type: yup.string().required(),
    product_group: yup.string().required(),
    weight: yup.number().required(),
    standard_box_quantity: yup.number().required(),
  });

  return (
    <>
      {inventory[0] && (
        <Formik
          initialValues={{
            part_no: inventory[0].part_no,
            description: inventory[0].description,
            type: inventory[0].type,
            product_group: inventory[0].product_group,
            weight: inventory[0].weight.toLocaleString(),
            standard_box_quantity:
              inventory[0].standard_box_quantity.toLocaleString(),
          }}
          onSubmit={(values) => {
            console.log(values);
            adminInventoryPutAxios(values, inventoryid);
            navigation.push('Inventrymaster');
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
                  Update Inventory
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
                      <TextInput
                        key={index}
                        style={styles.input}
                        placeholder={field.placeholder}
                        onChangeText={handleChange(field.name)}
                        value={values[field.name]}
                        keyboardType={
                          field.name == "standardBoxQuantity"
                            ? "numeric"
                            : "default"
                        }
                      />
                    </Fragment>
                  ))}
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
  })
});

export default InventoryUpdate;
