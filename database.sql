
CREATE TABLE property_info (
property_type varchar(50) PRIMARY KEY, 
maintenance int NOT NULL, 
covered_area int NOT NULL);

CREATE TABLE members (
property_no varchar(15) PRIMARY KEY, 
property_type varchar(50) NOT NULL, 
password varchar(200) NOT NULL, 
member_type varchar(20) NOT NULL, 
name varchar(50) NOT NULL, 
mobile_no char(10) NOT NULL, 
tenant_name varchar(50), 
tenant_mobile char(10),
CONSTRAINT fk_property_type FOREIGN KEY (property_type) REFERENCES property_info(property_type));

CREATE TABLE parking (
parking_id varchar(25) PRIMARY KEY, 
filled bit NOT NULL, 
property_no varchar(15), 
CONSTRAINT fk FOREIGN KEY (property_no) REFERENCES members(property_no));

CREATE TABLE maintenance (
property_no varchar(15), 
gen_month date, 
amount_basic int NOT NULL, 
amount_paid int NOT NULL, 
penalty int NOT NULL DEFAULT 0, 
amount_due int NOT NULL, 
payment_date date, 
PRIMARY KEY(property_no, gen_month),
CONSTRAINT fk_maintenance FOREIGN KEY (property_no) REFERENCES members(property_no));

CREATE TABLE inventory (
item varchar(50) PRIMARY KEY, 
quantity int NOT NULL);

CREATE TABLE personal_staff (
s_no int PRIMARY KEY AUTO_INCREMENT, 
name varchar(50) NOT NULL, 
occupation varchar(50) NOT NULL);

CREATE TABLE society_staff (
aadhaar char(12) PRIMARY KEY, 
name varchar(50) NOT NULL, 
occupation varchar(50) NOT NULL, 
salary int NOT NULL, 
workplace varchar(50) NOT NULL, 
from_place varchar(50) NOT NULL, 
mobile_no char(10) NOT NULL);


CREATE TABLE transactions (
s_no int PRIMARY KEY AUTO_INCREMENT, 
amount int NOT NULL, 
date date NOT NULL, 
send_to varchar(50) NOT NULL, 
received_from varchar(50) NOT NULLl, 
description varchar(250));

CREATE TABLE announcements (
s_no int PRIMARY KEY AUTO_INCREMENT, 
author varchar(25) NOT NULL, 
category varchar(25) NOT NULL, 
date datetime NOT NULL, 
description varchar(250));

CREATE TABLE gate_log (
s_no int PRIMARY KEY AUTO_INCREMENT, 
name varchar(50) NOT NULL, 
property_no varchar(15) NOT NULL, 
entry_time datetime NOT NULL, 
exit_time datetime NOT NULL, 
vehicle_type varchar(25), 
vehicle_number varchar(10), 
parking_id varchar(25), 
CONSTRAINT fk_property FOREIGN KEY (property_no) REFERENCES members(property_no), 
CONSTRAINT fk_parking FOREIGN KEY (parking_id) REFERENCES parking(parking_id));

CREATE TABLE voting (
property_no varchar(15) PRIMARY KEY, 
decision varchar(50), 
CONSTRAINT fk_voting FOREIGN KEY (property_no) REFERENCES members(property_no));
