const wrapWithI18nProvider = require('./src/components/withI18n').wrapWithI18nProvider;
exports.wrapPageElement = wrapWithI18nProvider;

export function onServiceWorkerUpdateReady() { window.location.reload(true) };
