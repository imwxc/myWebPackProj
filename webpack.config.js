const path = require('path');
module.exports = {
   mode: 'development',
   entry: './src/index.js', // 打包的入口文件
   output: {
    filename: 'index.js', // 输出的文件名
    path: path.resolve(__dirname, 'dist') // 输出的文件地址
   } 
}