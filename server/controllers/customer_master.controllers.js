const db = require("../database");

exports.admingetcustomer = async (req, res) => {
  const arr = [];
  await db.query("SELECT * FROM customer_master", async (err, results) => {
    if (err) {
      return console.log(err);
    } else {
      const myPromise = new Promise((resolve, reject) => {
         results.forEach(async (element, index) => {
            console.log(element.customer_id);
            // console.log(results, 'r1');
            await db.query(
              "SELECT * FROM address WHERE customer_id = ?",
              [element.customer_id],
              async (err, results2) => {
                if (err) {
                  return console.log(err);
                } else {
                  await db.query(
                    "SELECT * FROM supplier_information WHERE customer_id = ?",
                    [element.customer_id],
                    (err, results3) => {
                      if (err) {
                        return console.log(err);
                      } else {
                        // console.log(element, "rer");
                        // console.log(results3, "r3");
                        // console.log(results2, "r2");
                        // arr.push({
                        //     customer: element,
                        //     address: [results2],
                        //     supplier: results3
                        // });
                        arr.push({
                          customer: element,
                          customer_address: results2[0],
                          shipping_address: results2[1],
                          ac: results3[0],
                          stores: results3[1],
                          purchase: results3[2],
                          manager: results3[3],
                        });
                            // console.log(arr, "arrinside");
                            if(index == results.length - 1){
                                resolve(arr);
                                // console.log(index, "index");
                            }
                        // console.log(element,"element",results3,"r2",results2,"r3");
                        // res.json({
                        //     data1: element,
                        //     data2: results2,
                        //     data3: results3
                        // });
                      }
                    }
                  );
                }
              }
            );
            // index++;
            // console.log(arr, "arr");
            
          });

        }).then(async (result) => {
            // console.log(result, "result");
            res.json(result);
        });
            
    //   console.log(arr, "arr");
    }
  });
};

exports.adminpostcustomer = async (req, res) => {
  const {
    customer_name,
    building_name,
    street_1,
    street_2,
    locality,
    district,
    pincode,
    state,
    country,
    email,
    phone_number,
    gst_no,
    fax_no,
    shipping_building_name,
    shipping_street_1,
    shipping_street_2,
    shipping_locality,
    shipping_district,
    shipping_pincode,
    shipping_state,
    shipping_country,
    a_c_name,
    a_c_designation,
    a_c_department,
    a_c_email,
    a_c_phone_number,
    stores_name,
    stores_designation,
    stores_department,
    stores_email,
    stores_phone_number,
    purchase_name,
    purchase_designation,
    purchase_department,
    purchase_email,
    purchase_phone_number,
    manager_name,
    manager_designation,
    manager_department,
    manager_email,
    manager_phone_number,
  } = req.body.values;

  console.log(req.body, "dd");

  await db.query(
    "INSERT INTO customer_master (customer_name, email, phone, gst_no, fax_no) VALUES (?, ?, ?, ?, ?)",
    [customer_name, email, phone_number, gst_no, fax_no],
    async (err, results) => {
      if (err) {
        return console.log(err);
      } else {
        const customer__id = results.insertId;
        await db.query(
          "INSERT INTO address (customer_id, building_name, street_1, street_2, locality, district, pincode, state, country, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            customer__id,
            building_name,
            street_1,
            street_2,
            locality,
            district,
            pincode,
            state,
            country,
            "customer_address",
          ],
          console.log(customer__id, "id"),
          async (err, results) => {
            if (err) {
              return console.log(err);
            }
          }
        );
        await db.query(
          "INSERT INTO address (customer_id, building_name, street_1, street_2, locality, district, pincode, state, country, type) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            customer__id,
            shipping_building_name,
            shipping_street_1,
            shipping_street_2,
            shipping_locality,
            shipping_district,
            shipping_pincode,
            shipping_state,
            shipping_country,
            "shipping_address",
          ],
          async (err, results) => {
            if (err) {
              return console.log(err);
            } else {
              await db.query(
                "INSERT INTO supplier_information (customer_id, person_name, designation, department, email, mobile_number, type) VALUES (?, ?, ?,?, ?, ?,?)",
                [
                  customer__id,
                  a_c_name,
                  a_c_designation,
                  a_c_department,
                  a_c_email,
                  a_c_phone_number,
                  "account_contact",
                ],
                async (err, results) => {
                  if (err) {
                    return console.log(err);
                  } else {
                    await db.query(
                      "INSERT INTO supplier_information (customer_id,person_name, designation, department, email, mobile_number, type) VALUES (?, ?, ?,?, ?, ?, ?)",
                      [
                        customer__id,
                        stores_name,
                        stores_designation,
                        stores_department,
                        stores_email,
                        stores_phone_number,
                        "stores",
                      ],
                      async (err, results) => {
                        if (err) {
                          console.log(err);
                        } else {
                          await db.query(
                            "INSERT INTO supplier_information (customer_id,person_name, designation, department, email, mobile_number, type) VALUES (?, ?, ?,?, ?, ?,?)",
                            [
                              customer__id,
                              purchase_name,
                              purchase_designation,
                              purchase_department,
                              purchase_email,
                              purchase_phone_number,
                              "purchase",
                            ],
                            async (err, results) => {
                              if (err) {
                                console.log(err);
                              } else {
                                await db.query(
                                  "INSERT INTO supplier_information (customer_id, person_name, designation, department, email, mobile_number, type) VALUES (?, ?, ?, ?, ?,?, ?)",
                                  [
                                    customer__id,
                                    manager_name,
                                    manager_designation,
                                    manager_department,
                                    manager_email,
                                    manager_phone_number,
                                    "manager",
                                  ],
                                  async (err, results) => {
                                    if (err) {
                                      return console.log(err);
                                    } else {
                                      return res.json({
                                        data: results,
                                      });
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

exports.adminviewcustomer = async (req, res) => {
  console.log(req.params, "req.body");
  const id = req.params.id;
  const arr = [];
  await db.query("SELECT * FROM customer_master WHERE customer_id = ?",[id], async (err, results) => {
    if (err) {
      return console.log(err);
    } else {
      const myPromise = new Promise((resolve, reject) => {
         results.forEach(async (element, index) => {
            console.log(element.customer_id);
            // console.log(results, 'r1');
            await db.query(
              "SELECT * FROM address WHERE customer_id = ?",
              [id],
              async (err, results2) => {
                if (err) {
                  return console.log(err);
                } else {
                  await db.query(
                    "SELECT * FROM supplier_information WHERE customer_id = ?",
                    [id],
                    (err, results3) => {
                      if (err) {
                        return console.log(err);
                      } else {
                        // console.log(element, "rer");
                        // console.log(results3, "r3");
                        // console.log(results2, "r2");
                        // arr.push({
                        //     customer: element,
                        //     address: [results2],
                        //     supplier: results3
                        // });
                        arr.push({
                          customer: element,
                          customer_address: results2[0],
                          shipping_address: results2[1],
                          ac: results3[0],
                          stores: results3[1],
                          purchase: results3[2],
                          manager: results3[3],
                        });
                            // console.log(arr, "arrinside");
                            if(index == results.length - 1){
                                resolve(arr);
                                // console.log(index, "index");
                            }
                        // console.log(element,"element",results3,"r2",results2,"r3");
                        // res.json({
                        //     data1: element,
                        //     data2: results2,
                        //     data3: results3
                        // });
                      }
                    }
                  );
                }
              }
            );
            // index++;
            // console.log(arr, "arr");
            
          });

        }).then(async (result) => {
            console.log(result, "result");
            res.json(result);
        });
            
    //   console.log(arr, "arr");
    }
  });
};

exports.adminupdatecustomer = async (req, res) => {
  console.log(req.body, "req.body");
  const id = req.params.id;
  console.log(id, "idas");
  const {
    customer_name,
    building_name,
    street_1,
    street_2,
    locality,
    district,
    pincode,
    state,
    country,
    email,
    phone_number,
    gst_no,
    fax_no,
    shipping_building_name,
    shipping_street_1,
    shipping_street_2,
    shipping_locality,
    shipping_district,
    shipping_pincode,
    shipping_state,
    shipping_country,
    a_c_name,
    a_c_designation,
    a_c_department,
    a_c_email,
    a_c_phone_number,
    stores_name,
    stores_designation,
    stores_department,
    stores_email,
    stores_phone_number,
    purchase_name,
    purchase_designation,
    purchase_department,
    purchase_email,
    purchase_phone_number,
    manager_name,
    manager_designation,
    manager_department,
    manager_email,
    manager_phone_number,
  } = req.body.values;

  await db.query(
    "UPDATE customer_master SET customer_name =?, email = ?, phone = ?, gst_no = ?, fax_no = ? WHERE customer_id = ?",
    [customer_name, email, phone_number, gst_no, fax_no, id],
    async (err, results) => {
      if (err) {
        return console.log(err);
      } else {
        await db.query(
          "Update address SET building_name = ?, street_1 = ?, street_2 = ?, locality = ?, district = ?, pincode = ?, state = ?, country = ?, type = ? WHERE customer_id = ?",
          [
            building_name,
            street_1,
            street_2,
            locality,
            district,
            pincode,
            state,
            country,
            "customer_address",
            id,
          ],
          async (err, results) => {
            if (err) {
              return console.log(err);
            } else {
              await db.query(
                "UPDATE address SET building_name = ?, street_1 = ?, street_2 = ?, locality = ?, district = ?, pincode = ?, state = ?, country = ?, type = ? WHERE customer_id = ?",
                [
                  shipping_building_name,
                  shipping_street_1,
                  shipping_street_2,
                  shipping_locality,
                  shipping_district,
                  shipping_pincode,
                  shipping_state,
                  shipping_country,
                  "shipping_address",
                  id,
                ],
                async (err, results) => {
                  if (err) {
                    return console.log(err);
                  } else {
                    await db.query(
                      "UPDATE supplier_information SET person_name = ?, designation = ?, department = ?, email = ?, mobile_number = ? WHERE customer_id = ?",
                      [
                        a_c_name,
                        a_c_designation,
                        a_c_department,
                        a_c_email,
                        a_c_phone_number,
        
                        id,
                      ],
                      async (err, results) => {
                        if (err) {
                          return console.log(err);
                        } else {
                          await db.query(
                            "UPDATE supplier_information SET person_name = ?, designation = ?, department = ?, email = ?, mobile_number = ? WHERE customer_id = ?",
                            [
                              stores_name,
                              stores_designation,
                              stores_department,
                              stores_email,
                              stores_phone_number,
                             
                              id,
                            ],
                            async (err, results) => {
                              if (err) {
                                return console.log(err);
                              } else {
                                await db.query(
                                  "UPDATE supplier_information SET person_name = ?, designation = ?, department = ?, email = ?, mobile_number = ? WHERE customer_id = ?",
                                  [
                                    purchase_name,
                                    purchase_designation,
                                    purchase_department,
                                    purchase_email,
                                    purchase_phone_number,
                                    
                                    id,
                                  ],
                                  async (err, results) => {
                                    if (err) {
                                      return console.log(err);
                                    } else {
                                      await db.query(
                                        "UPDATE supplier_information SET person_name = ?, designation = ?, department = ?, email = ?, mobile_number = ? WHERE customer_id = ?",
                                        [
                                          manager_name,
                                          manager_designation,
                                          manager_department,
                                          manager_email,
                                          manager_phone_number,
                                          
                                          id,
                                        ],
                                        async (err, results) => {
                                          if (err) {
                                            return console.log(err);
                                          } else {
                                            console.log(results, "results")
                                            
                                          }
                                        }
                                      );
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

exports.admindeletecustomer = async (req, res) => {
  const { id } = req.params;
  console.log(id, "idcus");

  await db.query(
    "DELETE FROM address WHERE customer_id = ?",
    [id],
    async (err, results) => {
      if (err) {
        return console.log(err);
      } else {
        await db.query(
          "DELETE FROM supplier_information WHERE customer_id = ?",
          [id],
          async (err, results) => {
            if (err) {
              return console.log(err);
            } else {
              await db.query(
                "DELETE FROM customer_master WHERE customer_id = ?",
                [id],
                async (err, results) => {
                  if (err) {
                    return console.log(err);
                  } else {
                    res.json("Deleted Successfully");
                    // console.log("Deleted Successfully");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};
