// Copyright 2020, University of Colorado Boulder

const grunt = require( 'grunt' );
const jimp = require( 'jimp' );

const resizeImage = ( imageName, width, height, mime ) => {
  console.log( 'running resize task' );
  return new Promise( (resolve, reject ) => {
    jimp.read( imageName )
      .then( image => {
        console.log( 'jimp.read success' );
        image.resize( width, height )
          .getBuffer( mime, buffer => {
            console.log( 'image processing success!' );
            resolve( buffer );
          } );
        } )
      .catch( error => {
        console.error( 'jim.read error: ', error );
        reject( error );
      } );
    } );
};

const imageName = './test.png';

module.exports = async function() {
  console.log( 'attempting resize' );
  await resizeImage( imageName, 600, 400, jimp.MIME_PNG )
    .then( buffer => {
      console.log( 'received buffer, great news!' );
    } )
    .catch( error => {
      console.error( 'jimp failed, bad news!')
    } );
}
