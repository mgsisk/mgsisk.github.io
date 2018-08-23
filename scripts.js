/* eslint-env node */
/* eslint-disable no-implicit-globals */

run(process.argv[2], {
  makeCss,
  watch,
})

/**
 * Run a task.
 *
 * @param {string} task The task to run.
 * @param {object} tasks The available tasks.
 * @return {void}
 */
function run(task, tasks) {
  if (!Object.prototype.hasOwnProperty.call(tasks, task)) {
    return process.stdout.write(`Unknown task - ${task}\n`)
  }

  tasks[task]()
}

/**
 * Process CSS with postcss.
 *
 * @return {void}
 */
function makeCss() {
  const fastGlob = require('fast-glob')
  const fs = require('fs')
  const postcss = require('postcss')
  const config = require('./.postcss.js')

  fastGlob(['_css/style.css'], {
    absolute: true,
    dot: true,
  }).then((files)=> {
    for (const path of files) {
      fs.readFile(path, (readError, file)=> {
        const output = path.replace('/_css/', '/srv/')

        postcss(config.plugins)
          .process(file, {
            from: path,
            to: output,
          })
          .then(result=> fs.writeFile(output, result.css, er=> er))
      })
    }
  })
}

/**
 * Watch for file changes and process files as needed.
 *
 * @return {void}
 */
function watch() {
  const chokidar = require('chokidar')

  process.stdout.write('watching...\n')

  chokidar.watch([
    '_css/**/*.css',
  ]).on('change', (path)=> {
    process.stdout.write('working...\n')

    if (path.match(/\.css$/)) {
      makeCss()
    }

    process.stdout.write('watching...\n')
  })
}
