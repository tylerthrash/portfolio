import { CSSProperties } from "react";

export function isDefined(value: any, zeroIsDefined: boolean = true, falseIsDefined: boolean = true): boolean {
  if (value == null) {
    return false;
  }

  if (typeof value === "string") {
    const isEmptyOrWhitespace: boolean = new RegExp(/^\s*$/).test(value);

    if (isEmptyOrWhitespace === true) {
      return false;
    }
  }
  else if (typeof value === "boolean" && falseIsDefined === false && value === false) {
    return false;
  }
  else if (isNaN(value) === true && zeroIsDefined === false && +value === 0) {
    return false;
  }
  else if (Array.isArray(value) && value.length < 1) {
    return false;
  }

  return true;
}

export function isNumeric(value: any): boolean {
  return isNaN(value) === false;
}

export function isMapDefined(map: Map<any, any>) {
  return isDefined(map) && map.size > 0;
}
