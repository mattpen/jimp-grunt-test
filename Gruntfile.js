// Copyright 2020, University of Colorado Boulder

'use strict';

const test = require( './test')

module.exports = function ( grunt ) {

  /**
   * Wraps a promise's completion with grunt's asynchronous handling, with added helpful failure messages (including
   * stack traces, regardless of whether --stack was provided).
   * @public
   *
   * @param {Promise} promise
   */
  async function wrap( promise ) {
    const done = grunt.task.current.async();

    try {
      await promise;
    }
    catch ( e ) {
      if ( e.stack ) {
        grunt.fail.fatal( `Task failed:\n${e.stack}\nFull Error details:\n${JSON.stringify( e, null, 2 )}` );
      }

      // The toString check handles a weird case found from an Error object from puppeteer that doesn't stringify with
      // JSON or have a stack, JSON.stringifies to "{}", but has a `toString` method
      else if ( typeof e === 'string' || ( JSON.stringify( e ).length === 2 && e.toString ) ) {
        grunt.fail.fatal( `Task failed: ${e}` );
      }
      else {
        grunt.fail.fatal( `Task failed with unknown error: ${JSON.stringify( e, null, 2 )}` );
      }
    }

    done();
  }

  /**
   * Wraps an async function for a grunt task. Will run the async function when the task should be executed. Will
   * properly handle grunt's async handling, and provides improved error reporting.
   * @public
   *
   * @param {async function} asyncTaskFunction
   */
  function wrapTask( asyncTaskFunction ) {
    return () => {
      wrap( asyncTaskFunction() );
    };
  }

  grunt.registerTask( 'test-wrap',
    'Resizes an image, wrapped in an async task',
    wrapTask( async () => {
      console.log('Resizing async');
      await test();
    } ) );

  grunt.registerTask( 'test',
    'Resizes an image',
    () => {
      console.log('Resizing');
      test();
    }
   )

};
