const en  = require('./en');
const he = require('./he');

const i18n_strings = {
    en,
    he,
};

let language = 'en';

const setLanguage = (_language) => {
    language = _language;

    if (_language === 'he' && typeof document !== 'undefined') {
        document.body.className += ' rtl';
    }
};

const strings = () => {

    if (!i18n_strings[language]) {
        language = 'en';
    }

    return i18n_strings[language];
};

 const getEmptyContract = () => {
    return strings()['emptyContract'];
};

module.exports = {
    setLanguage,
    strings,
}