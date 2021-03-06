const axios = require("axios");

const baseURL = "http://192.168.0.103:8080";
// const baseURL = "https://bumaas-admin-server.herokuapp.com";
export const adminCustomerGetSingleAxios = async (customerid) => {
    console.log(customerid);
    return await axios.get(`${baseURL}/admin/customer/${customerid}`);
};
export const adminCustomerGetViewAxios = async (customerid) => {
    console.log(customerid);
    return await axios.get(`${baseURL}/admin/customer/${customerid}`);
};

export const adminCustomerGetAxios = async () =>
    await axios
        .get(`${baseURL}/admin/customer`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });

export const adminCustomerPostAxios = async (values) => {
    const random = Math.random(10).toString().split(".")[1].slice(0, 10);
    const unique_id = `Best_${values.customer_name}_${random}`;
    console.log(unique_id);
    return await axios
        .post(
            `${baseURL}/admin/customer`,

            {
                values,
                unique_id,
            }
        )
        .then((res) => {
            // return res;
        })
        .catch((err) => {
            // return err;
        });
};

export const adminCustomerPutAxios = async (values, customerid) => {
    const random = Math.random(10).toString().split(".")[1].slice(0, 10);
    const unique_id = `Best_${values.customer_name}_${random}`;
    return await axios
        .put(`${baseURL}/admin/customer/update/${customerid}`, {
            values,
            unique_id,
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export const adminProjectPutAxios = (values, customerid, projectid,selected) => {
    const json = JSON.stringify(selected);
   return axios
        .put(
            `${baseURL}/admin/customer/${customerid}/project/update/${projectid}`,
            {values,multi_part:json}
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};
export const adminCustomerDeleteAxios = async (id) => {
    return await axios.delete(`${baseURL}/admin/customer/delete/${id}`);
};

export const adminInventoryGetAxios = async () => {
    console.log("====================================axios");
    return await axios.get(`${baseURL}/admin/inventory`);
};

export const adminInventoryPostAxios = async (data) => {
    return await axios
        .post(`${baseURL}/admin/inventory`, data)
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            return err;
        });
};
export const adminInventoryGetSingleAxios = async (inventoryid) => {
    return await axios
        .get(`${baseURL}/admin/inventory/${inventoryid}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
};
export const adminInventoryGetSingleAxiosName = async (name) => {
    console.log(name,'part in ax');
    return await axios
        .get(`${baseURL}/admin/inventory/name/${name}`)
        .then((res) => {
            console.log(res.data,'itm');
            return res.data;
        })
        .catch((err) => {
            console.log(err,'err');
            return err;
        });
};
export const adminInventoryPutAxios = async (values, inventoryid) => {
    console.log(values, inventoryid);
    return await axios
        .put(`${baseURL}/admin/inventory/update/${inventoryid}`, {values})
        .then((res) => console.log(res))
        .catch((err) => {
            return err;
        });
};

export const adminInventoryDeleteAxios = async (id) =>
    await axios
        .delete(`${baseURL}/admin/inventory/delete/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

// Item
export const adminItemGetAxios = async () => {
    console.log("====================================axios");
    return await axios.get(`${baseURL}/admin/item`);
};

export const adminItemPostAxios = async (data1,data2,file,name) => {
    console.log(data1,'d',data2,'ds');
    return await axios
        .post(`${baseURL}/admin/item`, {
            data1,data2,file,name
        })
        .then((res) => {})
        .catch((err) => {});
};
export const adminItemGetSingleAxios = async (itemid) => {
    return await axios
        .get(`${baseURL}/admin/item/${itemid}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
};
export const adminItemGetViewAxios = async (itemid) => {
    return await axios
        .get(`${baseURL}/admin/item/${itemid}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
};
export const adminItemPutAxios = async (values,details,file,name, itemid) => {
    console.log(values, itemid);
    return await axios
        .put(`${baseURL}/admin/item/update/${itemid}`, {values,details,file,name})
        .then((res) => console.log(res))
        .catch((err) => {
            return err;
        });
};

export const adminItemDeleteAxios = async (id) =>
    await axios
        .delete(`${baseURL}/admin/item/delete/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

// Item ends

export const adminProjectPostAxios = async (values, id,multipart) => {
    console.log(multipart,'pk');
    const json = JSON.stringify(multipart)
    return await axios
        .post(
            `${baseURL}/admin/customer/${id}/project`,

            {
                values,
                customer_id: id,
                multi_part:json
            }
        )
        .then((res) => {
            // return res;
            console.log(res);
        })
        .catch((err) => {
            // return err;
            console.log(err);
        })}

export const adminProjectGetAxios = async (id) => {
    return await axios
        .get(`${baseURL}/admin/customer/project/${id}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
};

export const adminProjectDeleteAxios = async (customerid, projectid) => {
    return await axios
        .delete(`${baseURL}/admin/customer/${customerid}/project/${projectid}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export const adminProjectGetSingleAxios = async (customerid, projectid) => {
    return await axios
        .get(`${baseURL}/admin/customer/${customerid}/project/${projectid}`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
};
