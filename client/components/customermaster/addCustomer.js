import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { adminCustomerPostAxios } from "../../axios/admin";
// import { TouchableOpacity } from 'react-native-web'

const addCustomer = () => {
  var col;
  const [color, setColor] = useState(false);
  const [index, setIndex] = useState(1);
  useEffect(() => {}, [color]);
  // const [next, setNext] = useState(false);
  // var i = 1;
  // const [customerName, setCustomerName] = useState("");
  // const [building, setBuilding] = useState("");
  // const handlePrev = () => {
  //   setIndex(index - 1);
  // };



  return (
    
  );
};

export default addCustomer;
