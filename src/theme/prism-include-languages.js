import siteConfig from '@generated/docusaurus.config';

const prismConfig = siteConfig.themeConfig?.prism ?? {};

export default function prismIncludeLanguages(PrismObject) {
  if (!PrismObject) {
    return;
  }

  const globalScope =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof global !== 'undefined'
      ? global
      : typeof window !== 'undefined'
      ? window
      : {};
  globalScope.Prism = PrismObject;

  try {
    require('prismjs/components/prism-markup-templating');
  } catch (error) {
    console.warn('[prism] Failed to load helper language "markup-templating":', error);
  }

  const additional = prismConfig.additionalLanguages || [];
  additional.forEach((lang) => {
    if (!lang || PrismObject.languages[lang]) {
      return;
    }
    const alias = lang === 'ruleslanguage' ? 'python' : lang;
    try {
      require(`prismjs/components/prism-${alias}`);
      if (alias !== lang && PrismObject.languages[alias]) {
        PrismObject.languages[lang] = PrismObject.languages[alias];
      }
    } catch (error) {
      console.warn(`[prism] Failed to load language "${lang}":`, error);
    }
  });

  if (PrismObject.languages.protobuf && !PrismObject.languages.proto) {
    PrismObject.languages.proto = PrismObject.languages.protobuf;
  }
}
