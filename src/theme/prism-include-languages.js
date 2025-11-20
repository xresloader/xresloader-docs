import siteConfig from '@generated/docusaurus.config';

const prismConfig = siteConfig.themeConfig?.prism ?? {};

export default function prismIncludeLanguages(PrismObject) {
  if (!PrismObject) {
    return;
  }

  // Ensure Prism is globally accessible before loading extra components.
  globalThis.Prism = PrismObject;

  const additional = prismConfig.additionalLanguages || [];
  additional.forEach((lang) => {
    if (!lang || PrismObject.languages[lang]) {
      return;
    }
    try {
      require(`prismjs/components/prism-${lang}`);
    } catch (error) {
      console.warn(`[prism] Failed to load language "${lang}":`, error);
    }
  });

  if (PrismObject.languages.protobuf && !PrismObject.languages.proto) {
    PrismObject.languages.proto = PrismObject.languages.protobuf;
  }
}
