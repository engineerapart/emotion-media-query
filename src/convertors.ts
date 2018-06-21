/**
 * Converts breakpoint units in px to rem or em
 * @param {Object} breakpoints - an object containing breakpoint names as keys and the width as value
 * @param {number} [16] ratio - size of 1 rem in px. What is your main font-size in px?
 * @param {'rem' | 'em'} unit
 */
function pxToEmOrRem(breakpoints: { [key: string]: string | number }, ratio = 16, unit: string) {
  const newBreakpoints: { [key: string]: any } = {};

  for (let key in breakpoints) {
    const point = breakpoints[key];

    if (typeof point === 'string' && point.includes('px')) {
      newBreakpoints[key] = +(parseInt(point, 10) / ratio) + unit;
      continue;
    }

    newBreakpoints[key] = point;
  }

  return newBreakpoints;
}

/**
 * Converts breakpoint units in px to em
 * @param {Object} breakpoints - an object containing breakpoint names as keys and the width as value
 * @param {number} [16] ratio - size of 1em in px. What is your main font-size in px?
 */
export function pxToEm(breakpoints: { [key: string]: string | number }, ratio = 16) {
  return pxToEmOrRem(breakpoints, ratio, 'em');
}

/**
 * Converts breakpoint units in px to rem
 * @param {Object} breakpoints - an object containing breakpoint names as keys and the width as value
 * @param {number} [16] ratio - size of 1rem in px. What is your main font-size in px?
 */
export function pxToRem(breakpoints: { [key: string]: string | number }, ratio = 16) {
  return pxToEmOrRem(breakpoints, ratio, 'rem');
}
