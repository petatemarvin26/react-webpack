const fs = require('fs');

class ServiceWorkerPlugin {
  PUBLIC_PATH = './public';

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'ServiceWorkerPlugin',
      (compilation, callback) => {
        // const isProd = compiler.options.mode === 'production';

        const raw_files = Object.keys(compilation.assets);

        console.log('STATIC_FILES', raw_files);
        const static_files = `var static_files = ${JSON.stringify(raw_files)}`;

        fs.readFile(this.PUBLIC_PATH + '/main.sw.js', 'utf-8', (err, data) => {
          const read_data = data.split('\n');
          const chunk = read_data.slice(1);
          const refined_data = chunk.join('\n');

          if (err) new Error(err);
          fs.writeFile(
            this.PUBLIC_PATH + '/sw.js',
            `${static_files}\n${refined_data}`,
            (err) => {
              if (err) throw err;
            }
          );
        });

        // console.log('\n📦 Webpack Output Files:\n');

        // Object.keys(compilation.assets).forEach((filename) => {
        //   console.log(filename);
        // });

        // console.log('\n========================\n');
        callback();
      }
    );
  }
}

module.exports = ServiceWorkerPlugin;
