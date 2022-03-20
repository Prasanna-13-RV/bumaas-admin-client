const axios = require("axios");

const baseURL = "http://192.168.0.102:8080";
export const adminCustomerGetSingleAxios = async (customerid) => {
  console.log('====================================');
  console.log(customerid);
  console.log('====================================');
  
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


export const adminCustomerPostAxios = async (values) =>
  await axios
    .post(
      `${baseURL}/admin/customer`,

      {
        values,
      }
    )
    .then((res) => {
      
      // return res;
    })
    .catch((err) => {
      
      // return err;
    });

export const adminCustomerPutAxios = (values,customerid) =>{
  axios
    .put(`${baseURL}/admin/customer/update/${customerid}`, {values})
    .then((res) => {
     
      return res;
    })
    .catch((err) => {
      
      return err;
    });
  }


  export const adminProjectPutAxios = (values,customerid,projectid) =>{
    axios
      .put(`${baseURL}/admin/customer/${customerid}/project/update/${projectid}`, {values})
      .then((res) => {
       
        return res;
      })
      .catch((err) => {
        
        return err;
      });
    }
export const adminCustomerDeleteAxios = async (id) => {
  
return await axios
  .delete(`${baseURL}/admin/customer/delete/${id}`)
  
}

export const adminInventoryGetAxios = async () => {
  console.log('====================================axios');
  return await axios.get(`${baseURL}/admin/inventory`)}

export const adminInventoryPostAxios = async (data) => {
  
  return await axios
    .post(`${baseURL}/admin/inventory`, data)
    .then((res) => {})
    .catch((err) => {
      
    });}
    export const adminInventoryGetSingleAxios = async (inventoryid) => {
      return await axios
        .get(`${baseURL}/admin/inventory/${inventoryid}`)
        .then((res) => {
          
          return res.data;
        })
        .catch((err) => {
          
          return err;
        });
    }
export const adminInventoryPutAxios = async (values,inventoryid) => {
  console.log(values,inventoryid);
  return await axios
    .put(`${baseURL}/admin/inventory/update/${inventoryid}`, {values})
    .then((res) => console.log(res))
    .catch((err) => {
      
      return err;
    })}

export const adminInventoryDeleteAxios = async (id) =>
  await axios
    .delete(`${baseURL}/admin/inventory/delete/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      
      return err;
    });

export const adminProjectPostAxios = async (values, id) =>
  await axios
    .post(
      `${baseURL}/admin/customer/${id}/project`,

      {
        values,
        customer_id: id,
      }
    )
    .then((res) => {
      
      // return res;
    })
    .catch((err) => {
      
      // return err;
    });

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
    })}



    export const adminProjectGetSingleAxios = async (customerid, projectid) => {
      return await axios
        .get(`${baseURL}/admin/customer/${customerid}/project/${projectid}`)
        .then((res) => {
          
          return res.data;
        })
        .catch((err) => {
          
          return err;
        });
    }

