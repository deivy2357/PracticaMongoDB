const Alumno = require('../models/alumno.model');

const faker = require('faker');
faker.locale = 'es';

const TOTAL_ALUMNOS = 100;
const data_foreigns = {
    "usuario": "616f07617b961f2cc64c62ed",
    "apoderado": "616f07fe7b961f2cc64c62f0",
    "curso": "616f08c9590e16ca3c806622",
    "turno": "616f0b25e58bc2313258f2a5",
};

const createBulkAlumnos = async () => {
    const alumnos = [];
    let isMale = true;
    for(let i = 1; i <= TOTAL_ALUMNOS; i++) {
        const alumno = {
            ...data_foreigns,
            nombre: faker.name.firstName(isMale? 0: 1),
            lastName1: faker.name.lastName(isMale? 0: 1),
            lastName2: faker.name.lastName(isMale? 0: 1),
            sexo: isMale? 'masculino': 'femenino',
        };
        isMale = !isMale;
        alumnos.push(alumno);
    };

    try {
        await Alumno.insertMany(alumnos);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/***
 * Operador ternario:
 *    (condicion) ? (cuando es true): (cuando es false)
 */


module.exports = {
    createBulkAlumnos,
}
