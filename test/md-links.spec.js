//import {existPath,isAbsolutePath,extensionPath,} from '../index.js';
//const mdLinks = require('../');
const {
  isFile,
  routeIsDir,
  openFile,
  openDir,
  scanLinks,
  validateLink,
  processFile,
  getPathsDirectory,

} = require('../index.js');
//const axios = require('axios')
//jest.mock('axios')



describe('is File', () => {
  it('should be a file ./prueba/link1.md', () => {
    expect(isFile('./prueba/link1.md')).toBeTruthy()
  });
  it('not should be a directory ./prueba/link1.md', () => {
    expect(isFile('./prueba')).toBeFalsy();
  });
});

describe('is Directory', () => {
  it('should be a directory ./prueba', () => {
    expect(routeIsDir('./prueba')).toBeTruthy()
  });
  it('not should be a file ./prueba', () => {
    expect(isDirectory('./prueba/link1.md')).toBeFalsy();
  });
});
