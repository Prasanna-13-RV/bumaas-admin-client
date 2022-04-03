import {
    View,
    Text,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, {Fragment,useEffect,useState} from "react";
import {Formik} from "formik";
import * as yup from "yup";
import {Picker} from "@react-native-community/picker";
import {adminInventoryGetSingleAxiosName, adminItemPostAxios} from "../../axios/admin";
import FormModal from "../FormModal.component";
import {useNavigation} from "@react-navigation/native";
import {adminInventoryGetAxios} from "../../axios/admin";

const ItemFormModalContainer = ({addFormVisible, setAddFormVisible}) => {
    const [inventory, setInventory] = useState([]);

    const [details, setDetails] = useState();
    useEffect(() => {
        adminInventoryGetAxios().then((res) => setInventory(res.data));
        console.log(inventory);
    },[]);
    useEffect(() => {
    },[details]);
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
        safety_stock: yup.number().required(),
        rol: yup.number().required(),
        standard_lead_time: yup.number().required(),
        hsn_code: yup.number().required(),
        local_imported: yup.number().required(),
        drawing: yup.string().required(),
    });
    const handlePick = (value) => {
        console.log(value);
        adminInventoryGetSingleAxiosName(value).then((res) => {
            console.log(res[0]);
            setDetails(res[0]);
            console.log(details.description,'ll')
        });
    };
    const [initial, setInitial] = useState({
        part_no: "",
                    description:"",
                    type: "",
                    product_group: "",
                    weight: "",
                    standard_box_quantity: "",
    })
    return (
        <FormModal
            addFormVisible={addFormVisible}
            setAddFormVisible={setAddFormVisible}
        >
            <Formik
                initialValues={{
                    part_no: details ? details.part_no :"",
                    description:details ? details.description :"",
                    type: "",
                    product_group: "",
                    weight: "",
                    standard_box_quantity: "",
                }}
                onSubmit={(values) => {
                    console.log(values, "item");
                    // setAddFormVisible(false);
                    adminItemPostAxios(values);
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
                                Add To Item
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
                                            {field.name != 'part_no' && <TextInput
                                                key={index}
                                                style={styles.input}
                                                placeholder={field.placeholder}
                                                onChangeText={handleChange(
                                                    field.name
                                                )}
                                                value={
                                                     values[field.name]
                                                }
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
                                                        : "default" &&
                                                        field.name ==
                                                            "safety_stock"
                                                        ? "numeric"
                                                        : "default" &&
                                                        field.name == "rol"
                                                        ? "numeric"
                                                        : "default" &&
                                                        field.name ==
                                                            "standard_lead_time"
                                                        ? "numeric"
                                                        : "default" &&
                                                        field.name == "hsn_code"
                                                        ? "numeric"
                                                        : "default" &&
                                                        field.name ==
                                                            "local_imported"
                                                        ? "numeric"
                                                        : "default"
                                                }
                                            />}
                                        {
                                                    field.name == "part_no" ? (
                                                        <Picker
                                                            style={
                                                                styles.picker
                                                            }
                                                            mode="dropdown"
                                                            placeholder="Select Best part no"
                                                            onValueChange={(itemValue) => (
                                                                console.log(itemValue),
                                                                handleChange(field.name),
                                                                handlePick(itemValue))
                                                            
                                                        }
                                                            selectedValue={
                                                                values[
                                                                    field.name
                                                                ]
                                                            }
                                                        >
                                                            <Picker.Item
                                                                label="Select Type"
                                                                value=""
                                                            />
                                                            {/* {console.log(arr_item.name)} */}

                                                            {inventory.map(
                                                                (it) => (
                                                                    <Picker.Item
                                                                        label={
                                                                            it.part_no
                                                                        }
                                                                        value={
                                                                            it.part_no
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </Picker>
                                                    ) : null}
                                    </Fragment>
                                ))}
                                <TouchableOpacity
                                    style={styles.btn(isValid)}
                                    onPress={() => console.log(values)}
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
    picker: {
        width: "100%",
        borderColor: "#609BEB",
        borderWidth: 1,
        borderRadius: 50,
    },
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

export default ItemFormModalContainer;
