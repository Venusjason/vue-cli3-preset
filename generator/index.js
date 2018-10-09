const fs = require('fs')
const path = require('path')

module.exports = (api, options, rootOptions) => {
    // 修改 `package.json` 里的字段
    api.extendPackage({
        dependencies: {
            'vue-router': '^3.0.1',
            'vuex': '^3.0.1'
        }
    })

    // 复制并用 ejs 渲染 `./template` 内所有的文件
    api.render('./template')

    if (options.foo) {
        // 有条件地生成文件
    }

    // {fileName: fileValue}
    api.postProcessFiles(function (files) {

    })

    // 借助此回调函数删除 vue-cli 创建的多余入口文件
    // 1. src/main.js
    // 2. src/App.vue
    api.onCreateComplete(() => {
        const cliEntryFile = `${api.resolve(api.entryFile)}`
        const cliDefaultVue = cliEntryFile.replace(/main\.js$/, 'App.vue')

        if (/\/src\/main\.js$/.test(cliEntryFile) &&
        fs.existsSync(cliEntryFile)) {
            try {
                fs.unlinkSync(cliEntryFile)
            } catch (e) {
                console.log(e.message)
            }
        }

        if (/\/src\/App\.vue$/.test(cliDefaultVue) &&
        fs.existsSync(cliDefaultVue)) {
            try {
                fs.unlinkSync(cliDefaultVue)
            } catch (e) {
                console.log(e)
            }
        }
    })
}