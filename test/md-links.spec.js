//import {existPath,isAbsolutePath,extensionPath,} from '../index.js';
//const mdLinks = require('../');
const {
  existPath,
  isAbsolutePath,
  extensionPath,
  routeIsDir,
  isFile,
  openDir,
  readFile,totalStats,
  scanLinks,
  brokenStats,
  validateLinks,
  recursionToGetFilesPath,
  scanFile
} = require('../index.js');
const axios = require('axios')
jest.mock('axios')

const arrayObject = {
  href: 'https://nodejs.org/es/',
  text: 'Node.js',
  file: 'C:\\Users\\Usuario\\Documents\\LIM018\\mdn-links\\LIM018-md-links\\prueba\\link1.md',
}

const arrayResult = {
  href: 'https://developers.google/v8/',
  text: 'motor de JavaScript V8 de Chrome',
  file: 'C:\\Users\\Usuario\\Documents\\LIM018\\mdn-links\\LIM018-md-links\\prueba\\link1.md',
  url: 'https://developers.google/v8/',
  status: 400,
  message: 'fail'
}

describe('existPath', () => {
  it('should verify if the path exist', () => {
    const myAbsolutePth = 'C:/Users/Usuario/Documents/LIM018/mdn-links/LIM018-md-links/prueba/link1.md';
    expect(existPath(myAbsolutePth)).toBe(true);
  });
  it('should return false if the path does not exist', () => {
    const onePath = './prueba/link.md';
    expect(existPath(onePath)).toBe(false);
  });
});

describe('toAbsolutePath', () => {
  it('should convert a path in absolute if it is a relative path', () => {
    const myAbsolutePth = 'C:/Users/Usuario/Documents/LIM018/mdn-links/LIM018-md-links/prueba/link1.md';
    const onePath = './prueba/link1.md';
    const exp = 'C:\\Users\\Usuario\\Documents\\LIM018\\mdn-links\\LIM018-md-links\\prueba\\link1.md';
    expect(isAbsolutePath(onePath)).toBe(exp);
    expect(isAbsolutePath(myAbsolutePth)).toBe('C:/Users/Usuario/Documents/LIM018/mdn-links/LIM018-md-links/prueba/link1.md');
  });
});

describe('extensionPath', () => {
  it('Should verified extension of the document', () => {
    const myPth = './prueba/link1.md';
    const text = './prueba/text1.text';
    expect(extensionPath(myPth)).toBeTruthy();
    expect(extensionPath(text)).toBeFalsy();
  });
});

describe('routeIsDir', () => {
  it('Should verified if is a directory',() =>{
    const path= '../LIM018-md-links';
    const file = './prueba/link1.md';
    expect(routeIsDir(path)).toBeTruthy();
    expect(routeIsDir(file)).toBeFalsy();
  })
})

describe('isFile',() => {
  it('Should verified if is a file', () => {
    const path= '../LIM018-md-links';
    const file = './prueba/link1.md';
    expect(isFile(file)).toBeTruthy();
    expect(isFile(path)).toBeFalsy();
  })
})

describe('openDir',() => {
  it('Should verify that it reads the directory', () =>{
    const path = './prueba';
    const result = [ 'link1.md','nivel2', 'text1.text']
    expect(openDir(path)).toEqual(result)
  })
})

describe('readFile',() => {
  it('Should verify that it reads the file',() =>{
    const file = './prueba/nivel2/nivel2.md'
    expect(readFile(file)).toEqual('Estos archivos Markdown normalmente contienen links, vínculos y ligas.')
  })
})

describe('stats', () => {
  it('should return the statistics of the path -validate false', () => {
    const arrayObject = [
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'prueba/link1.md'
      },
    ]
    const result = { total: 1, unique: 1 }
    expect(totalStats(arrayObject, { validate: false, stas: true })).toStrictEqual(result)
  })
})

describe('stats', () => {
  it('should return the statistics of the path -validate true', () => {
    const arrayObject = [
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'storage/file.md'
      },
    ]
    const result = { total: 1, unique: 1, broken: 1 }
    expect(brokenStats(arrayObject, { validate: true, stats: true })).toStrictEqual(result)
  
  })})

describe('scanLinks', () => {
  const links = [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: 'prueba/link1.md'
    },
    {
      href: 'https://developers.google/v8/',
      text: 'motor de JavaScript V8 de Chrome',
      file: 'prueba/link1.md'
    }
  ];
  it('should return an array of links', () => {
    expect(scanLinks('prueba/link1.md')).toEqual(links)
  })
})

describe('validateLinks',()=>{
  it('should return an object with a status of ok', () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ status: 200 }))
    validateLinks('https://nodejs.org/').then((data) => {
      expect(data).toEqual({ element: 'https://nodejs.org/', status: 200, message: 'ok' })
    })
  })

  it('should return an object with a status of fail', () => {
    axios.get.mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }))


    validateLinks('https://www.geeksforgeeks.org/node-js-fs-readfilesync-method2/', { validate: true }).catch((error) => {
      expect(error).toEqual({ response: { status: 404 } })
    })
  })
})

describe('recursionToGetFilesPath',() => {
  it('Should return an array of directory paths',()=>{
    const arrayPath = [
      'prueba\\link1.md',
      'prueba\\nivel2\\nivel2.md',
      'prueba\\nivel2\\nivel3\\nivel3.md'
    ]
    expect(recursionToGetFilesPath('./prueba')).toEqual(arrayPath)
  })
})

describe('scan file', () => {

  it('should return an array of objects with 6 items if true', () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ status: 200 }))
    axios.get.mockImplementationOnce(() => Promise.reject({ status: 400 }))
  
    const trueValidate = [
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: './prueba/link1.md',
        element: 'https://nodejs.org/es/',
        status: 200,
        message: 'ok'
      },
      {
        href: 'https://developers.google/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: './prueba/link1.md',
        element: 'https://developers.google/v8/',
        status: 400,
        message: 'fail'
      }
    ]
    scanFile('./prueba/link1.md', { validate: true }).then((result) => {
      expect(result).toEqual(trueValidate)
    })
  })
})

