const fs = require('fs');
const path = require('path');

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt()//constructor del md

const  jsdom = require('jsdom');
const { JSDOM } = jsdom;

const axios = require('axios');


//La ruta existe o no 
//const existPath = (path) => existsSync(path);

//La ruta es absoluta o no 
const isAbsolutePath = (ispath) => path.isAbsolute(ispath)?ispath: path.resolve(ispath);

//Averigua la extensión de un archivo
const extensionPath = (ispath) => path.extname(ispath) === '.md';

//Revisando si la ruta existe y es absoluta
const checkPath = (path) => {
    if(fs.existsSync(path)){
      const absolutePath = isAbsolutePath(path);
      if(extensionPath(absolutePath)){
        return absolutePath;
      }
    } else {
      console.log('no contiene extension md');
    }
  }

console.log(checkPath('./prueba/link1.md'));

//Leyendo un archivo
const readFile = (path) => fs.readFileSync(path, 'utf8');

//Leyendo links de un archivo 
function scanLinks(path) {
  const contentFile = readFile(path)
  const stringHtml = md.render(contentFile) //convirtiendo a string de html el archivo md
  const domHtml = new JSDOM(stringHtml) //con el jsdom se convierte a html 
  const anchorList = domHtml.window.document.querySelectorAll('a')
  //console.log(nodeList)El objeto resultante es una instancia de la JSDOMclase, 
  //que contiene varias propiedades y métodos útiles además de window
  const listLink = [];

  anchorList.forEach((link) => {
    listLink.push({ href: link.href, text: link.innerHTML, file: path })
  })
  return listLink
};


console.log(scanLinks('./prueba/link1.md'))

//Validar los links

const validateLinks = (path) => {
  return axios(path)
    .then((data) => {
      if (data.status === 200) {
        return {
          path,
          status: data.status,
          message: 'ok'
        };
      }
    })
    .catch((error) => {
      return ({
        path,
        status: error.response.status,
        message: 'fail'
      })
    })
};


validateLinks('https://www.youtube.com/').then((data) => {
  console.log(data)
})


/*const mdlinks = (path) =>{

}
*/











//Lee un directorio 
/*const readDir = (isDir) => {
    if (isDir){
    return readdirSync(isDir)
}}
console.log(readDir('./prueba'))*/

//Verifica si la ruta es un directorio
//const pathIsDir = (route) => lstatSync(route).isDirectory();
//console.log(pathIsDir('./prueba'));

/*const joinRoute = path.join('./prueba','./test');
console.log(joinRoute)*/