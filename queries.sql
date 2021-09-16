CREATE DATABASE IF NOT EXISTS sms_db;

USE sms_db;

CREATE TABLE IF NOT EXISTS members (
property_no varchar(20) PRIMARY KEY,
property_type varchar(20) NOT NULL,
password varchar(20) NOT NULL,
member_type varchar(20) NOT NULL, 
mobile_no char(10) NOT NULL,
name varchar(20) NOT NULL,
tenant_name varchar(20),
tenant_mobile char(10));

CREATE TABLE IF NOT EXISTS property_info (
property_type varchar(20) PRIMARY KEY,
maintenance int NOT NULL,
carpet_area int NOT NULL);

CREATE TABLE IF NOT EXISTS maintenance (
property_no varchar(20),
gen_month date NOT NULL,
amount_basic int NOT NULL,
amount_due int NOT NULL,
amount_paid int NOT NULL,
penalty int NOT NULL DEFAULT 0,
payment_date date,
PRIMARY KEY(property_no, gen_month));

CREATE TABLE IF NOT EXISTS gate_log (
sr_no int PRIMARY KEY AUTO_INCREMENT,
visitor_name varchar(20) NOT NULL,
property_no varchar(20) NOT NULL,
entry_time datetime NOT NULL,
exit_time datetime NOT NULL,
vehicle_type varchar(20),
vehicle_no varchar(8),
parking_id varchar(20));

CREATE TABLE IF NOT EXISTS transactions (
sr_no int PRIMARY KEY AUTO_INCREMENT, 
amount int NOT NULL,
transaction_date date NOT NULL,
sent_to varchar(20) NOT NULL,
received_from varchar(20) NOT NULL,
description varchar(250));

CREATE TABLE IF NOT EXISTS announcements (
sr_no int PRIMARY KEY NOT NULL AUTO_INCREMENT,
author varchar(20) NOT NULL,
category varchar(20) NOT NULL,
date datetime NOT NULL,
description varchar(500) NOT NULL);

CREATE TABLE IF NOT EXISTS parking(
parking_id varchar(20) PRIMARY KEY, 
filled bit NOT NULL, 
property_no varchar(20));

CREATE TABLE IF NOT EXISTS personal_staff(
sr_no int PRIMARY KEY AUTO_INCREMENT,
staff_name varchar(20),
occupation_type varchar(20));

CREATE TABLE IF NOT EXISTS society_staff(
aadhar_no varchar(12) PRIMARY KEY NOT NULL,
staff_name varchar(20) NOT NULL,
occupation_type varchar(20) NOT NULL,
salary int NOT NULL,
contractor varchar(20) NOT NULL,
date_of_employment date NOT NULL,
mobile_no char(10));

CREATE TABLE IF NOT EXISTS voting(
property_no varchar(20) PRIMARY KEY,
decision varchar(500));

CREATE TABLE IF NOT EXISTS inventory(
item_name varchar(20) PRIMARY KEY,
quantity int);

ALTER TABLE members
ADD FOREIGN KEY(property_type) REFERENCES property_info(property_type);

ALTER TABLE maintenance
ADD FOREIGN KEY(property_no) REFERENCES members(property_no);

ALTER TABLE gate_log
ADD FOREIGN KEY(parking_id) REFERENCES parking(parking_id);

ALTER TABLE parking
ADD FOREIGN KEY(property_no) REFERENCES members(property_no);

ALTER TABLE gate_log
ADD FOREIGN KEY(property_no) REFERENCES members(property_no);

ALTER TABLE voting
ADD FOREIGN KEY(property_no) REFERENCES members(property_no);
