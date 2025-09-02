-- Active: 1750235329113@@127.0.0.1@3306@express_mvc

DROP DATABASE IF EXISTS express_mvc ;

CREATE DATABASE express_mvc;

USE express_mvc;

CREATE TABLE personnes (

    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(30),
    prenom VARCHAR(30),
    age INT

);

INSERT INTO personnes VALUES
(NULL, "Wick", "John", 45),
(NULL, "Dalton", "Jack", 55),
(NULL, "Maggio", "Sophie", 35)