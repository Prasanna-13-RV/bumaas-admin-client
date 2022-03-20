const express = require("express");
const app = express();

const router = express.Router();
const db = require("../database");

exports.admingetproject = async (req, res) => {
    const {id} = req.params;
    console.log(req.params,'pp');
    console.log(req.body,'pp');
    console.log(req.headers,'pp');
    console.log(id);
    await db.query(
        "SELECT * FROM project_master WHERE customer_id = ?",[id],
        (err, result) => {
            if (err) {
                return console.log(err);
            } else {
                console.log(result,'resddh');
                return res.json({
                    result
                });
            }
        }
    );
};


exports.adminpostproject = async (req, res) => {
    console.log(req.body);
    const {
        project_name,
        customer_name,
        
        customer_part_no,
        part_no,
        description,
        type,
        product_group,
        weight,
        norms_per_project,
        consumption_tracking,
        weekly_consumption,
        standard_box_quantity,
        lead_time,
        safety_stock,
        re_order_level,
    } = req.body.values;
    const {customer_id} = req.body;
    console.log(customer_id);
    
    db.query(
        "SELECT * FROM customer_master , inventory_master, project_master",
        (err, result) => {
            if (err) {
                return console.log(err);
            } else {
                console.log(project_name,
                    customer_name,
                    customer_part_no,'backend')
                db.query(
                    "INSERT INTO project_master (project_name, customer_name,customer_id, customer_part_no, part_no, description, type, product_group, weight, norms_per_project, consumption_tracking, weekly_consumption, standard_box_quantity, lead_time, safety_stock, re_order_level) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ? , ? )",
                    [
                        project_name,
                        customer_name,
                        customer_id,
                        customer_part_no,
                        part_no,
                        description,
                        type,
                        product_group,
                        weight,
                        norms_per_project,
                        consumption_tracking,
                        weekly_consumption,
                        standard_box_quantity,
                        lead_time,
                        safety_stock,
                        re_order_level,
                    ],
                    (err, result) => {
                        if (err) {
                            return console.log(err);
                        } else {
                            return res.json({
                                data: result,
                            });
                        }
                    }
                );
            }
        }
    );
};

exports.adminviewproject = async (req, res) => {
    const {
        project_name,
        customer_name,
        customer_part_no,
        part_no,
        description,
        type,
        product_group,
        weight,
        norms_per_project,
        consumption_tracking,
        weekly_consumption,
        standard_box_quantity,
        lead_time,
        safety_stock,
        re_order_level,
    } = req.body;

    const {customerid,projectid} = req.params;

    db.query(
        "SELECT * FROM project_master WHERE project_id = ? AND customer_id = ?",[projectid,customerid],
        (err, result) => {
            if (err) {
                return console.log(err);
            } else {
                return res.json({
                    data: result,
                });
            }
        }
    );
};

exports.adminupdateproject = async (req, res) => {
    const {customerid,projectid} = req.params;
    console.log(req.body.values);
    const {
        project_name,
        customer_name,
        customer_part_no,
        part_no,
        description,
        type,
        product_group,
        weight,
        norms_per_project,
        consumption_tracking,
        weekly_consumption,
        standard_box_quantity,
        lead_time,
        safety_stock,
        re_order_level,
    } = req.body.values;
    db.query(
        "UPDATE project_master SET project_name = ?, customer_name = ?, customer_part_no = ?, part_no = ?, description = ?, type = ?, product_group = ?, weight = ?, norms_per_project = ?, consumption_tracking = ?, weekly_consumption = ?, standard_box_quantity = ?, lead_time = ?, safety_stock = ?, re_order_level = ? WHERE project_id = ? AND customer_id = ?",
        [ project_name,
            customer_name,
            customer_part_no,
            part_no,
            description,
            type,
            product_group,
            weight,
            norms_per_project,
            consumption_tracking,
            weekly_consumption,
            standard_box_quantity,
            lead_time,
            safety_stock,
            re_order_level, projectid,customerid],
        (err, result) => {
            if (err) {
                return console.log(err);
            } else {
                console.log(result,'resddh');
            }
        }
    );
};

exports.admindeleteproject = async (req, res) => {
    const {customerid,projectid} = req.params;
    console.log(req.params,'kok');
        db.query(
        "DELETE FROM project_master WHERE project_id = ? AND customer_id = ?",
        [projectid,customerid],
        (err, result) => {
            if (err) {
                return console.log(err);
            } else {
                return res.json({
                    data: result,
                });
            }
        }
    );
};
