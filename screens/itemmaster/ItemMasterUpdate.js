import {
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, {useState, useEffect, Fragment} from "react";
import {Formik} from "formik";
import * as yup from "yup";
import {useNavigation} from "@react-navigation/native";

import {adminItemGetSingleAxios, adminItemPutAxios} from "../../axios/admin";

const ItemMasterUpdate = ({route}) => {
    const navigation = useNavigation();
    const [item, setItem] = useState([]);
    const itemid = route.params.itemid;
    useEffect(async () => {
        console.log(itemid);
        await adminItemGetSingleAxios(itemid)
            .then((res) => {
                // console.log(res["customer"],"ass");
                // setDelet(false);

                console.log(res[0], "update");

                setItem(res);
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
        {
            name: "drawing",
            placeholder: "Drawing",
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
            {item[0] && (
                console.log(item, "update"),
                console.log(item[0], "update"),
                <Formik
                    initialValues={{
                        part_no: item[0].part_no,
                        description: item[0].description,
                        type: item[0].type,
                        product_group: item[0].product_group,
                        weight: item[0].weight.toLocaleString(),
                        standard_box_quantity:
                            item[0].standard_box_quantity.toLocaleString(),
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        adminItemPutAxios(values, itemid);
                        navigation.push("Itemmaster");
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
                                                    marginTop:
                                                        index === 0 ? 0 : 10,
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
                                                        : "default"
                                                }
                                            />
                                        </Fragment>
                                    ))}
                                    <TouchableOpacity
                                        style={styles.btn(isValid)}
                                        onPress={() => handleSubmit()}
                                    >
                                        <Text style={{color: "white"}}>
                                            Submit
                                        </Text>
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
    }),
});

export default ItemMasterUpdate;
