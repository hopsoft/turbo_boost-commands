import * as esbuild from 'esbuild'
import fs from 'fs'

const debug = process.argv.includes('--debug')

const context = await esbuild.context({
  entryPoints: ['app/javascript/index.js'],
  external: ['@hotwired/turbo'],
  bundle: true,
  format: 'esm',
  logLevel: 'debug',
  metafile: true,
  minify: !debug,
  outfile: 'app/assets/builds/@turbo-boost/commands.js',
  sourcemap: true,
  target: ['chrome79', 'edge44', 'es2020', 'firefox71', 'opera65', 'safari13']
})

const watch = process.argv.includes('--watch')

if (watch) {
  context.logLevel = 'verbose'
  await context.watch()
} else {
  const result = await context.rebuild()
  const metafile = 'app/assets/builds/@turbo-boost/commands.metafile.json'

  fs.writeFile(metafile, JSON.stringify(result.metafile), ex => {
    if (ex) {
      console.error('Build failed!❗️')
      conosle.error(ex)
    } else {
      const fileSize = fs.statSync('app/assets/builds/@turbo-boost/commands.js').size
      const fileSizeInKB = Math.round(fileSize / 1024)
      const message = [
        'Build succeeded! 🚀',
        `|- Metafile saved to ... → ${metafile} (${fileSizeInKB}KB)`,
        '|- Analyze the bundle at → https://esbuild.github.io/analyze/'
      ]
      console.log(message.join('\n'))
    }
    context.dispose()
  })
}
