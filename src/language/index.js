import Vue from 'vue' // 引入vue实例
import VueI18n from 'vue-i18n' // 引入vue-i18n多语言包
// 引入element ui自带语言包
import ElementUILocale from 'element-ui/lib/locale' 
import enLocale from 'element-ui/lib/locale/lang/en' 
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n) // vue使用vue-i18n

const DEFAULT_LANG = 'en' // 默认语言为英文
const LOCALE_KEY = 'DemoLanguage' // localStorage来存放的key，名字随便定，接下来会用到。

const locales = { // 引入zh.json以及en.json
    zh: require('./zh.json'),
    en: require('./en.json')
}

const i18n = new VueI18n({ // 创建带有选项的 VueI18n 实例
    locale: DEFAULT_LANG, // 语言标识，在这里默认为en,即为英文
    messages : locales // 语言包，上边创建的json文件
})

const UIlocales = {
    zh: zhLocale,
    en: enLocale
  }
  
  // 通过判断lang语言标志符来return先对应的语言
  const setUIlocales = lang =>{
    switch (lang) {
      case 'zh': return UIlocales.zh
      case 'en': return UIlocales.en
    }
  }
  

export const setup = lang => { //切换语言的函数，lang为语言标识，en或者zh
  　// 在此判断lang的值，如果未定义，则让lang默认为DEFAULT_LANG，目的是为了让用户在未选择语言的时候默认为英文。
    if(lang == undefined){
        lang = localStorage.getItem(LOCALE_KEY)
        if ( locales[lang] == undefined ) {
            lang = DEFAULT_LANG
        }
    }
　　// 若lang有值，那么存入localStorage中，key为LOCALE_KEY,value为lang。
    localStorage.setItem(LOCALE_KEY, lang)
    Object.keys(locales).forEach(item => {
        document.body.classList.remove(`lang-${item}`)
    })
    document.body.classList.add(`lang-${lang}`)
    document.body.setAttribute('lang', lang)

    Vue.config.lang = lang
    i18n.locale = lang
    ElementUILocale.use(setUIlocales(lang)) // element ui 切换语言
}

setup()
export default i18n