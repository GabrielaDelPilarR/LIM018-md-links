//import {existPath,isAbsolutePath,extensionPath,} from '../index.js';
//const mdLinks = require('../');
const {
  existPath,
  isAbsolutePath,
  extensionPath,
  routeIsDir,
  isFile,
  openDir,
  readFile
} = require('../index.js');
const axios = require('axios')
jest.mock('axios')

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
    const result = [ 'link1.md', 'text1.text']
    expect(openDir(path)).toEqual(result)
  })
})

describe('readFile',() => {
  it('Should verify that it reads the file',() =>{
    const file = './prueba/link1.md'
    expect(readFile(file)).toEqual('Estos archivos Markdown normalmente contienen links, vínculos y ligas.')
  })
})

