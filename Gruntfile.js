// Copyright 2020, University of Colorado Boulder

'use strict';

const test = require( './test')

module.exports = function ( grunt ) {
  grunt.registerTask( 'test',
    'Resizes an image',
    async () => {
      console.log('Resizing');
      await test();
    }
   )

};
