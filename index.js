const path = require('node:path');
const fs = require('node:fs');

//La ruta existe o no 
const routeExists = fs.existsSync('C:/Users/Usuario/Documents/LIM018/mdn-links/LIM018-md-links/README.md');
console.log(routeExists)

//La ruta es absoluta o no 
const routeisAbsolute = (ispath) => {
    if(path.isAbsolute(ispath)){
        console.log("La ruta es absoluta")
        return ispath;
    }else{
        console.log("La ruta no es absoluta")
        return path.resolve(ispath);
    }
}
console.log(routeisAbsolute('C:/Users/Usuario/Documents/LIM018/mdn-links/LIM018-md-links/prueba'));

//Leyendo un archivo
const readFile = fs.readFileSync('./prueba/link1.md', 'utf-8');
console.log(readFile);

//Averigua la extensión de un archivo
const getExt = (file) => path.extname(file);
console.log(getExt('./prueba/link1.md'))

//Lee un directorio 
const readDir = (isDir) => {
    if (isDir){
    return fs.readdirSync(isDir)
}}
console.log(readDir('./prueba'))

//Verifica si la ruta es un directorio
const pathIsDir = (route) => fs.lstatSync(route).isDirectory();
console.log(pathIsDir('./prueba'));

const joinRoute = path.join('./prueba','./test');
console.log(joinRoute)