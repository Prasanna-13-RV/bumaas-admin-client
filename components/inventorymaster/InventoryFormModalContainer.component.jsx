import {
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, {Fragment} from "react";
import {Formik} from "formik";
import * as yup from "yup";

import {adminInventoryPostAxios} from "../../axios/admin";
import FormModal from "../FormModal.component";
import {useNavigation} from "@react-navigation/native";

const InventoryFormModalContainer = ({addFormVisible, setAddFormVisible}) => {
    const navigation = useNavigation();
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
        <FormModal
            addFormVisible={addFormVisible}
            setAddFormVisible={setAddFormVisible}
        >
            <Formik
                initialValues={{
                    part_no: "",
                    description: "",
                    type: "",
                    product_group: "",
                    weight: "",
                    standard_box_quantity: "",
                }}
                onSubmit={(values) => {
                    console.log(values, "lol");
                    // setAddFormVisible(false);
                    adminInventoryPostAxios(values);
                    navigation.push("Inventrymaster");
                }}
                validationSchema={schema}
                validateOnMount={true}
            >
                {({handleChange, handleSubmit, values, isValid}) => {
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
                                Add To Inventory
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
                                                fontSize: 16,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {field.placeholder}
                                        </Text>
                                        <TextInput
                                            key={index}
                                            style={styles.input}
                                            placeholder={field.placeholder}
                                            onChangeText={handleChange(
                                                field.name
                                            )}
                                            value={values[field.name]}
                                            keyboardType={
                                                field.name ==
                                                "standardBoxQuantity"
                                                    ? "numeric"
                                                    : "default" &&
                                                      field.name == "weight"
                                                    ? "numeric"
                                                    : "default" &&
                                                      field.name ==
                                                          "standard_box_quantity"
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
                                    <Text style={{color: "white"}}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    );
                }}
            </Formik>
        </FormModal>
    );
};

const styles = StyleSheet.create({
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
    input: {
        borderColor: "#609BEB",
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 15,
        paddingVertical: 15,
        width: "100%",
        marginVertical: 5,
    },
});

export default InventoryFormModalContainer;
