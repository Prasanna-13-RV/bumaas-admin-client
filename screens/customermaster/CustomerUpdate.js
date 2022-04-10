import {
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import React, {useState, useEffect, Fragment} from "react";
import {Formik} from "formik";
import * as yup from "yup";
import {
    adminCustomerGetSingleAxios,
    adminCustomerPutAxios,
} from "../../axios/admin";
import FormModal from "../../components/FormModal.component";
import {useNavigation} from "@react-navigation/native";

const CustomerUpdate = ({route}) => {
    const customerid = route.params.customerid;
    console.log(customerid);
    var col;
    const navigation = useNavigation();
    const [color, setColor] = useState(false);
    const [customer, setCustomer] = useState([]);

    useEffect(async () => {
        await adminCustomerGetSingleAxios(customerid)
            .then((res) => {
                // console.log(res["customer"],"ass");
                // setDelet(false);
                var arr = [];
                console.log(res, "update");
                res.data.map((item) => {
                    console.log(item);
                    arr.push(item);
                });
                setCustomer(arr);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [color]);
    const arr = [
        {
            catagoryname: "customerName",
            fields: [
                {
                    title: "Customer Name",
                    name: "customer_name",
                    placeholder: "Enter Customer Name",
                },
                {
                    title: "Building",
                    name: "building_name",
                    placeholder: "Enter Building Name",
                },
                {
                    title: "street1",
                    name: "street_1",
                    placeholder: "Enter Street1",
                },
                {
                    title: "street2",
                    name: "street_2",
                    placeholder: "Enter Street2",
                },
                {
                    title: "enter Locality",
                    name: "locality",
                    placeholder: "Enter Locality",
                },
                {
                    name: "district",
                    placeholder: "Enter District",
                },
                {
                    name: "pincode",
                    placeholder: "Enter Pincode",
                },
                {
                    name: "state",
                    placeholder: "Enter State",
                },
                {
                    name: "country",
                    placeholder: "Enter Country",
                },
                {
                    name: "email",
                    placeholder: "Enter Email",
                },
                {
                    name: "phone_number",
                    placeholder: "Enter Phone",
                },
                {
                    name: "gst_no",
                    placeholder: "Enter GST",
                },
                {
                    name: "fax_no",
                    placeholder: "Enter Fax",
                },
            ],
        },

        {
            catagoryname: "shipping",
            fields: [
                {
                    name: "shipping_building_name",
                    placeholder: "Enter Building",
                },
                {
                    name: "shipping_street_1",
                    placeholder: "Enter Street1",
                },
                {
                    name: "shipping_street_2",
                    placeholder: "Enter Street2",
                },
                {
                    name: "shipping_locality",
                    placeholder: "Enter Locality",
                },
                {
                    name: "shipping_district",
                    placeholder: "Enter District",
                },
                {
                    name: "shipping_pincode",

                    placeholder: "Enter Pincode",
                },
                {
                    name: "shipping_state",
                    placeholder: "Enter State",
                },
                {
                    name: "shipping_country",
                    placeholder: "Enter Country",
                },
            ],
        },
        {
            catagoryname: "CP1",
            fields: [
                {
                    name: "a_c_name",
                    placeholder: "Enter Name",
                },
                {
                    name: "a_c_designation",
                    placeholder: "Enter Designation",
                },
                {
                    name: "a_c_department",
                    placeholder: "Enter Department",
                },

                {
                    name: "a_c_email",
                    placeholder: "Enter Email",
                },
                {
                    name: "a_c_phone_number",
                    placeholder: "Enter Phone",
                },
            ],
        },

        {
            catagoryname: "CP2",
            fields: [
                {
                    name: "stores_name",
                    placeholder: "Enter Stores Name",
                },
                {
                    name: "stores_designation",
                    placeholder: "Enter Stores Designation",
                },
                {
                    name: "stores_department",
                    placeholder: "Enter Stores Department",
                },
                {
                    name: "stores_email",
                    placeholder: "Enter Stores Email",
                },
                {
                    name: "stores_phone_number",
                    placeholder: "Enter Stores Phone",
                },
            ],
        },
        {
            catagoryname: "CP3",
            fields: [
                {
                    name: "purchase_name",
                    placeholder: "Enter Purchase Name",
                },
                {
                    name: "purchase_designation",
                    placeholder: "Enter Purchase Designation",
                },
                {
                    name: "purchase_department",
                    placeholder: "Enter Purchase Department",
                },
                {
                    name: "purchase_email",
                    placeholder: "Enter Purchase Email",
                },
                {
                    name: "purchase_phone_number",
                    placeholder: "Enter Purchase Phone",
                },
            ],
        },
        {
            catagoryname: "CP4",
            fields: [
                {
                    name: "manager_name",
                    placeholder: "Enter Manager Name",
                },
                {
                    name: "manager_designation",
                    placeholder: "Enter Manager Designation",
                },
                {
                    name: "manager_department",
                    placeholder: "Enter Manager Department",
                },
                {
                    name: "manager_email",
                    placeholder: "Enter Manager Email",
                },
                {
                    name: "manager_phone_number",
                    placeholder: "Enter Manager Phone",
                },
            ],
        },
    ];
    let schema = yup.object().shape({
        customer_name: yup.string().required(),
        building_name: yup.string().required(),
        street_1: yup.string().required(),
        street_2: yup.string().required(),
        locality: yup.string().required(),
        district: yup.string().required(),
        pincode: yup.number().required(),
        state: yup.string().required(),
        country: yup.string().required(),

        shipping_building_name: yup.string().required(),
        shipping_street_1: yup.string().required(),
        shipping_street_2: yup.string().required(),
        shipping_locality: yup.string().required(),
        shipping_district: yup.string().required(),
        shipping_pincode: yup.number().required(),
        shipping_state: yup.string().required(),
        shipping_country: yup.string().required(),

        a_c_name: yup.string().required(),
        a_c_designation: yup.string().required(),
        a_c_department: yup.string().required(),
        a_c_email: yup.string().required(),
        a_c_phone_number: yup.number().required(),

        stores_name: yup.string().required(),

        stores_designation: yup.string().required(),
        stores_department: yup.string().required(),
        stores_email: yup.string().required(),
        stores_phone_number: yup.number().required(),

        purchase_name: yup.string().required(),
        purchase_designation: yup.string().required(),
        purchase_department: yup.string().required(),
        purchase_email: yup.string().required(),
        purchase_phone_number: yup.number().required(),

        manager_name: yup.string().required(),
        manager_designation: yup.string().required(),
        manager_department: yup.string().required(),
        manager_email: yup.string().required(),
        manager_phone_number: yup.number().required(),
    });
    return (
        <>
        {customer.length > 0 ? (
        <>
            {customer[0] && (
                <Formik
                    initialValues={{
                        customer_name: customer[0]["customer"].customer_name,
                        building_name:
                            customer[0]["customer_address"].building_name,
                        street_1: customer[0]["customer_address"].street_1,
                        street_2: customer[0]["customer_address"].street_2,
                        locality: customer[0]["customer_address"].locality,
                        district: customer[0]["customer_address"].district,
                        pincode:
                            customer[0][
                                "customer_address"
                            ].pincode.toLocaleString(),
                        state: customer[0]["customer_address"].state,
                        country: customer[0]["customer_address"].country,
                        email: customer[0]["customer"].email,
                        phone_number:
                            customer[0]["customer"].phone.toLocaleString(),
                        gst_no: customer[0]["customer"].gst_no.toLocaleString(),
                        fax_no: customer[0]["customer"].fax_no.toLocaleString(),
                        shipping_building_name:
                            customer[0]["shipping_address"].building_name,
                        shipping_street_1:
                            customer[0]["shipping_address"].street_1,
                        shipping_street_2:
                            customer[0]["shipping_address"].street_2,
                        shipping_locality:
                            customer[0]["shipping_address"].locality,

                        shipping_district:
                            customer[0]["shipping_address"].district,
                        shipping_pincode:
                            customer[0][
                                "shipping_address"
                            ].pincode.toLocaleString(),
                        shipping_state: customer[0]["shipping_address"].state,
                        shipping_country:
                            customer[0]["shipping_address"].country,
                        a_c_name: customer[0]["ac"].person_name,
                        a_c_designation: customer[0]["ac"].designation,
                        a_c_department: customer[0]["ac"].department,
                        a_c_email: customer[0]["ac"].email,
                        a_c_phone_number:
                            customer[0]["ac"].mobile_number.toLocaleString(),
                        stores_name: customer[0]["stores"].person_name,
                        stores_designation: customer[0]["stores"].designation,
                        stores_department: customer[0]["stores"].department,
                        stores_email: customer[0]["stores"].email,
                        stores_phone_number:
                            customer[0][
                                "stores"
                            ].mobile_number.toLocaleString(),
                        purchase_name: customer[0]["purchase"].person_name,
                        purchase_designation:
                            customer[0]["purchase"].designation,
                        purchase_department: customer[0]["purchase"].department,
                        purchase_email: customer[0]["purchase"].email,
                        purchase_phone_number:
                            customer[0][
                                "purchase"
                            ].mobile_number.toLocaleString(),
                        manager_name: customer[0]["manager"].person_name,
                        manager_designation: customer[0]["manager"].designation,
                        manager_department: customer[0]["manager"].department,
                        manager_email: customer[0]["manager"].email,
                        manager_phone_number:
                            customer[0][
                                "manager"
                            ].mobile_number.toLocaleString(),
                    }}
                    validationSchema={schema}
                    validateOnMount={true}
                    onSubmit={(values) => {
                        // setIndex(index + 1);
                        console.log(values);
                        adminCustomerPutAxios(values, customerid);
                        //   navigation.goBack();
                        navigation.push("Customermaster");

                        // console.log(index);
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        isValid,
                    }) => (
                        <ScrollView>
                            <View style={styles.main}>
                                <>
                                    {arr.map((item, index) => {
                                        // col = item.name;
                                        return (
                                            <Fragment key={index}>
                                                <Text style={styles.maintitle}>
                                                    {item.catagoryname}
                                                </Text>
                                                {item.fields.map((field) => {
                                                    col = field.name;
                                                    return (
                                                        <View
                                                            style={
                                                                styles.container
                                                            }
                                                        >
                                                            <Text
                                                                style={
                                                                    styles.title
                                                                }
                                                            >
                                                                {
                                                                    field.placeholder
                                                                }
                                                            </Text>
                                                            <TextInput
                                                                style={[
                                                                    styles.inputBox,
                                                                    color &&
                                                                        values[
                                                                            col
                                                                        ] ==
                                                                            0 &&
                                                                        styles.inputBoxError,
                                                                ]}
                                                                onChangeText={handleChange(
                                                                    field.name
                                                                )}
                                                                onBlur={handleBlur(
                                                                    field.name
                                                                )}
                                                                placeholder={
                                                                    field.placeholder
                                                                }
                                                                value={
                                                                    values[
                                                                        field
                                                                            .name
                                                                    ]
                                                                }
                                                                keyboardType={
                                                                    field.name ==
                                                                    "gst_no"
                                                                        ? "numeric"
                                                                        : "default" &&
                                                                          field.name ==
                                                                              "phone_number"
                                                                        ? "numeric"
                                                                        : "default" &&
                                                                          field.name ==
                                                                              "fax_no"
                                                                        ? "numeric"
                                                                        : "default" &&
                                                                          field.name ==
                                                                              "pincode"
                                                                        ? "numeric"
                                                                        : "default" &&
                                                                          field.name ==
                                                                              "shipping_pincode"
                                                                        ? "numeric"
                                                                        : "default" &&
                                                                          field.name ==
                                                                              "a_c_phone_number"
                                                                        ? "numeric"
                                                                        : "default" &&
                                                                          field.name ==
                                                                              "stores_phone_number"
                                                                        ? "numeric"
                                                                        : "default" &&
                                                                          field.name ==
                                                                              "purchase_phone_number"
                                                                        ? "numeric"
                                                                        : "default" &&
                                                                          field.name ==
                                                                              "manager_phone_number"
                                                                        ? "numeric"
                                                                        : "default"
                                                                }
                                                            />
                                                        </View>
                                                    );
                                                })}
                                            </Fragment>
                                        );
                                    })}
                                    <TouchableOpacity
                                        style={styles.btn(isValid)}
                                        onPress={() => {
                                            isValid
                                                ? handleSubmit()
                                                : setColor(true);
                                            console.log(color);
                                        }}
                                    >
                                        <Text style={{color: "white"}}>
                                            Submit
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            </View>
                        </ScrollView>
                    )}
                </Formik>
            )}
        </>) :(
            <View style={{ flex: 1 }}>
            <ActivityIndicator
              style={{ flex: 1, alignSelf: "center" }}
              size="large"
              color="#0000ff"
            />
          </View>
        )}</>
    );
};

const styles = StyleSheet.create({
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
});

export default CustomerUpdate;
