const fs = require('fs');
const path = require('path');

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt()//constructor del md

const  jsdom = require('jsdom');
const { JSDOM } = jsdom;

const axios = require('axios');
const { options } = require('marked');


//La ruta existe o no 
const existPath = (path) => fs.existsSync(path);

//La ruta es absoluta o no 
const isAbsolutePath = (ispath) => path.isAbsolute(ispath)?ispath: path.resolve(ispath);

//Verifica si la ruta es un directorio
const routeIsDir = (path) => fs.statSync(path).isDirectory();

//Lee un directorio 
const openDir = (path) => fs.readdirSync(path)
//console.log(openDir('./prueba'), 'direc')

//La ruta es un archivo?
const isFile = (path) => fs.statSync(path).isFile()


//Averigua la extensión de un archivo
const extensionPath = (ispath) => path.extname(ispath) === '.md';

//Revisando si la ruta existe y es absoluta
const checkPath = (path) => {
    if(fs.existsSync(path)){
      const absolutePath = isAbsolutePath(path);
      if(extensionPath(absolutePath)){
        return absolutePath;
      }
    } 
  }

//console.log(checkPath('./prueba/link1.md'));

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
  /*const listLink = new Array (anchorList).map((link) => {
    console.log(link)
    return({ href: link.href, text: link.innerHTML, file: path })
  })*/
  const listLink = [];

  anchorList.forEach((link) => {
    listLink.push({ href: link.href, text: link.innerHTML, file: path })
  })
  return listLink
};


//console.log(scanLinks('prueba/link1.md'))

//Validar los links
/*scanLinks(path).forEach( Element => {
  validateLinks(Element.href).then((data) => {
    console.log(data)
  })
})
*/
const validateLinks = (element) => {
  return axios.get(element)
    .then((data) => {
      if (data.status === 200) {
        return {
          element,
          status: data.status,
          message: 'ok'
        };
      }
    })
};


// FUNCIÓN PARA VER LOS STATS DE LOS LINKS DE UN DOCUMENTO
const totalStats = (arrayOfLinks) => {
  const total = arrayOfLinks.length;
  const unique = new Set(arrayOfLinks.map((link) => link.href)).size;
  return {
      total,
      unique
    };
};

const brokenStats = (arrayOfLinks) => {
  const total = arrayOfLinks.length;
  const unique = new Set(arrayOfLinks.map((link) => link.href)).size;
  const broken = arrayOfLinks.filter(link => link.status != 200).length
  //console.log(unique,'unikkk')
  return {
      total,
      unique,
      broken
    };
};

//console.log(statsUrl(scanLinks('./prueba/link1.md')),'stat')

// RECURSIVIDAD PARA OBTENER LOS ARCHIVOS
const recursionToGetFilesPath = (ispath) => {
  const arrayFiles = [];
  if (isFile(ispath)) {
    return [ispath];
  }
  const readFile = openDir(ispath)
  readFile.forEach((file) => {
    const newPath = path.join(ispath, file);
    console.log(newPath)
    arrayFiles.push(recursionToGetFilesPath(newPath));
  });
  return arrayFiles.flat();
};


console.log(recursionToGetFilesPath('./prueba'), 'recursion')

function scanFile(path, config) {
  return new Promise((resolve) => {
    // const isFile = isFile(path)
    const listLinks = scanLinks(path)
    // console.log(listFoundLinks)
  
    if (config.validate === true) {
      const promisesArray = listLinks.map(async (items) => {
        try {
          const resultItem = await validateLinks(items.href)
          return { ...items, ...resultItem }
        } catch (error) {
          return {
            ...items,
            url: items.href,
            status: error.response.status,
            message: error.response.statusText
          }
        }
      })
      Promise.all(promisesArray).then((result) => {
        if (config.stats === true){
         resolve(brokenStats(result)) 
        }
        resolve(result)
      })

    } else {
      if (config.stats === true){
        resolve(totalStats(listLinks))
      }
      resolve(listLinks)
    }
  })

}


const mdLinks = (path, options = { validate: false }) => {
  return new Promise((resolve, reject) => {
    const pathAbsolute = isAbsolutePath(path)
    if (!existPath(pathAbsolute)) {
     return  reject(new Error('no existe la ruta'))
    }
    if (isFile(pathAbsolute)) {
      scanFile(pathAbsolute, options).then((arrayObject) => {
        resolve(arrayObject)
      })
    }

    if (routeIsDir(pathAbsolute)) {
     const arrayPromise =  recursionToGetFilesPath(path).map(filepath => {
        return scanFile(filepath)
      })
      Promise.all(arrayPromise).then((arrayObject)=>{
        resolve(arrayObject)
      })
    }



  })
  }

mdLinks('./prueba/link1.md', {stats:true}).then((data)=>{
console.log(data,'hola')
})