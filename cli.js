#!/usr/bin/env node
const { mdLinks } = require("./index.js");
const chalk = require("chalk");
const { options } = require("marked");

const args = process.argv;
const config = process.argv.slice(2);
const route = args[2];
const isValidate = config.includes('--validate')
const isStats = config.includes('--stats')
// process.argv muestra los argumentos pasados por consola
// args[0] es la ruta node
// args[1] ruta de md-links
// args[2] ruta del archivo
// args[3] opción --validate o --stats

if (route === undefined) {
  console.log(chalk.blue.italic(`

     ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒

  ▒ ▒ Por favor ingrese la ruta al archivo o directorio que desea analizar ▒ ▒

     ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒ ▒
     
     `));
  console.log(chalk.magentaBright.italic('* Para mayor información escriba --help, para revisar las opciones *'));
} else {
  if (args.includes('--help')) {
    console.log(`
        ${chalk.yellowBright(`${chalk.bgMagenta('*** md-links-GabyRojas ***')}
  
        
          *****************HELP*********************
                                             
          ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
            md-links  path  --validate              
           *                                        
             Para saber el status de los links      
             haciendo consultas HTTP con axios   
          ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
             md-links  path  --stats             
            * 
             Para obtener estadísticas de los links    
             totales, únicos                                                                                                                                                                         
          ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
           md-links  path  --validate --stats                  
           *                                        
             Para obtener estadísticas de los links    
             totales, únicos y rotos encontrados                     
          ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        `)}  
        `);
  }
}


if(isValidate){
  mdLinks(route, { validate: isValidate})
  .then((result) => {
      console.log(chalk.cyan.italic(`
          *************VALIDATE *************`
      ))
      console.log('')
      console.log(result)
  }).catch((error) => {
    if (error.message === 'no existe la ruta') {
      console.log(chalk.red.bold.italic(`
          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
                     ESTA RUTA NO EXISTE 
          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
          `))
    }
  })
}

if(isStats){
  mdLinks(route, { stats:isStats})
  .then((result) => {
      console.log(chalk.cyan.italic(`
          *************STATS *************`
      ))
      console.log('')
      console.log(result)
  }).catch((error) => {
    if (error.message === 'no existe la ruta') {
      console.log(chalk.red.bold.italic(`
          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
                     ESTA RUTA NO EXISTE 
          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
          `))
    }
  })
}

if(isValidate && isStats){
  mdLinks(route, { validate: isValidate , stats:isStats})
  .then((result) => {
      console.log(chalk.cyan.italic(`
          *************STATS FINAL  *************`
      ))
      console.log('')
      console.log(result)
  }).catch((error) => {
    if (error.message === 'no existe la ruta') {
      console.log(chalk.red.bold.italic(`
          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
                     ESTA RUTA NO EXISTE 
          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
          `))
    }
  })
}