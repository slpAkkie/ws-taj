const gulp = require( 'gulp' )

const imageMinify = require( './imageMinify' )
const styles = require( './styles' )
const pug2html = require( './pug2html' )
const script = require( './script' )

const bs = require( 'browser-sync' ).create()

function readyReload( cb ) {
  bs.reload()
  cb()
}

module.exports = function server( cb ) {
  bs.init( {
    server: 'build',
    notify: false,
    open: true,
    cors: true
  } )

  gulp.watch( 'src/img/**/*.{gif,png,jpg,svg,webp}', gulp.series( imageMinify, readyReload ) )
  gulp.watch( 'src/styles/**/*.scss', gulp.series( styles, cb => gulp.src( 'build/css' ).pipe( bs.stream() ).on( 'end', cb ) ) )
  gulp.watch( 'src/js/**/*.js', gulp.series( script, readyReload ) )
  gulp.watch( 'src/pages/**/*.pug', gulp.series( pug2html, readyReload ) )

  return cb()
}
