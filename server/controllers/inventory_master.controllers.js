const express = require('express');
const db = require('../database');

exports.admingetinventory = async (req, res) => {
	await db.query('SELECT * FROM inventory_master', (err, result) => {
		if (err) console.log(err);
		console.log(result,'pop');
		res.json(result);

	});
};

exports.adminpostinventory = async (req, res) => {
	const {
		part_no,
		description,
		type,
		product_group,
		weight,
		standard_box_quantity
	} = req.body;

	await db.query(
		'INSERT INTO inventory_master (part_no, description, type, product_group, weight, standard_box_quantity) VALUES (?, ?, ?, ?, ?, ?)',
		[part_no, description, type, product_group, weight, standard_box_quantity],
		(err, result) => {
			if (err) console.log(err);
			res.json(result);
		}
	);
};

exports.adminviewinventory = async (req, res) => {
	console.log(req.params.id);
	db.query('SELECT * FROM inventory_master WHERE inventory_id = ?',
		[req.params.id],
		(err, result) => {
			if (err) console.log(err);
			console.log(result);
			res.json(result);
		})
};

exports.adminupdateinventory = async (req, res) => {
	console.log(req.params.id);
	console.log('lpl');
	const {
		part_no,
		description,
		type,
		product_group,
		weight,
		standard_box_quantity
	} = req.body.values;

	db.query('UPDATE inventory_master SET part_no = ?, description = ?, type = ?, product_group = ?, weight = ?, standard_box_quantity = ? WHERE inventory_id = ?',
		[
			part_no,
			description,
			type,
			product_group,
			weight,
			standard_box_quantity,
			req.params.id
		],
		(err, result) => {
			if (err) console.log(err);
			console.log(result);
		})
};

exports.admindeleteinventory = async (req, res) => {
	console.log(req.params.id);
	db.query('DELETE FROM inventory_master WHERE inventory_id = ?',
		[req.params.id],
		(err, result) => {
			if (err) console.log(err);
			res.json(result);
		});
};
