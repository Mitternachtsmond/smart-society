create database if not exists sms_db;
use sms_db;
create table if not exists members (
property_no varchar(20) primary key,
property_type varchar(20) not null,
password varchar(20) not null,
member_type varchar(20) not null, 
mobile_no char(10) not null,
name varchar(20) not null,
tenant_name varchar(20),
tenant_mobile char(10));

create table if not exists property_info (
type varchar(20) primary key,
maintenance int not null,
carpet_area int not null);

create table if not exists maintenance (
property_no varchar(20) primary key,
gen_month date not null,
amount_basic int not null,
amount_due int not null,
amount_paid int not null,
penalty int not null default 0,
payment_date date);

create table if not exists gate_log (
sr_no int primary key auto_increment,
visitor_name varchar(20) not null,
property_no varchar(20) not null,
entry_time datetime not null,
exit_time datetime not null,
vehicle_type varchar(20),
vehicle_no varchar(8),
parking_id varchar(20) not null);

create table if not exists transactions (
sr_no int primary key auto_increment, 
amount int not null,
transaction_date date not null,
sent_to varchar(20) not null,
received_from varchar(20) not null,
description  varchar(100));

create table if not exists announcements (
sr_no int primary key not null auto_increment,
author varchar(20) not null,
category varchar(20) not null,
date datetime not null,
description varchar(100));

create table if not exists parking(
parking_id varchar(20) primary key, 
filled bit not null, 
property_no varchar(20));

create table if not exists personal_staff(
sr_no int primary key auto_increment,
staff_name varchar(20),
occupation_type varchar(20));

create table if not exists society_staff(
aadhar_no varchar(12) primary key not null,
staff_name varchar(20) not null,
occupation_type varchar(20) not null,
salary int not null,
contractor varchar(20) not null,
date_of_employment date not null,
mobile_no char(10));

create table if not exists voting(
property_no varchar(20) primary key,
decision varchar(500));

create table if not exists inventory(
item_name varchar(20),
quantity int);

alter table members
add foreign key(property_type) references property_info(type);

alter table maintenance
drop primary key;

alter table maintenance
add constraint primary key(property_no, gen_month);

alter table maintenance
add foreign key(property_no) references members(property_no);

alter table gate_log
add foreign key(parking_id) references parking(parking_id);

alter table parking
add foreign key(property_no) references members(property_no);

alter table gate_log
add foreign key(property_no) references members(property_no);

alter table voting
add foreign key(property_no) references members(property_no);
