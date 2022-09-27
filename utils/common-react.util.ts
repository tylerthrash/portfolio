import { CSSProperties } from "react";
import { isDefined } from "./common.util";

export function getStylesObj(styles: string): CSSProperties {
  const obj = {};

  if (isDefined(styles) === true) {
    styles = styles.trim();

    const stylesArr = styles.split(";");

    for (let style of stylesArr) {
      style = style.trim();
      const styleArr = style.split(":");

      let styleKey = styleArr[0]?.trim();
      const styleProp = styleArr[1]?.trim();

      // camel case key
      if (styleKey.includes("-")) {
        const styleKeyWords = styleKey.split("-");

        styleKey = styleKeyWords[0];

        for (const word of styleKeyWords.slice(1, styleKeyWords.length)) {
          const newWord = word[0].toLocaleUpperCase() + word.substring(1, word.length);
          styleKey += newWord;
        }
      }

      obj[styleKey] = styleProp;
    }
  }

  return obj;
}
