import { css, Interpolation } from 'emotion';
import { pxToEm, pxToRem } from './convertors';

export {
  pxToEm,
  pxToRem
};

/**
 * Default media breakpoints
 * @type {Object}
 */
export const defaultBreakpoints = {
  huge: '1440px',
  large: '1170px',
  medium: '768px',
  small: '450px',
};

function getSizeFromBreakpoint(breakpointName: string | number, breakpoints: { [key: string]: string | number } = {}) {
  if (breakpoints[breakpointName]) {
    const val = breakpoints[breakpointName];
    if (typeof val === 'number') {
      return `${val}px`;
    }
    return val;
  } else if (parseInt(breakpointName as string, 10)) {
    return breakpointName;
  } else {
    console.error('emotion-media-query: No valid breakpoint or size specified for media.');
    return '0';
  }
}

/**
 * Media query generator
 * @param {Object} [defaultBreakpoints] breakpoints - Map labels to breakpoint sizes
 * @return {Object} - Media generators for each breakpoint
 */
export function generateMedia(breakpoints: { [key: string]: string | number } = defaultBreakpoints) {
  const lessThan = (breakpoint: string) => (...args: Interpolation[]) => css`
    @media (max-width: ${getSizeFromBreakpoint(breakpoint, breakpoints)}) {
      ${css(...args)}
    }
  `;

  const greaterThan = (breakpoint: string) => (...args: Interpolation[]) => css`
    @media (min-width: ${getSizeFromBreakpoint(breakpoint, breakpoints)}) {
      ${css(...args)}
    }
  `;

  const between = (firstBreakpoint: string, secondBreakpoint: string) => (...args: Interpolation[]) => css`
    @media (min-width: ${getSizeFromBreakpoint(firstBreakpoint, breakpoints)}) and
      (max-width: ${getSizeFromBreakpoint(secondBreakpoint, breakpoints)}) {
      ${css(...args)}
    }
  `;

  // const oldStyle = Object
  //   .keys(breakpoints)
  //   .reduce((acc, label) => {
  //     const size = breakpoints[label];

  //     acc.to[label] = (...args) => {
  //       console.warn(`emotion-media-query: Use media.lessThan('${label}') instead of old media.to.${label} (Probably we'll deprecate it)`);
  //       return css`
  //         @media (max-width: ${size}) {
  //           ${css(...args)}
  //         }
  //       `;
  //     };

  //     acc.from[label] = (...args) => {
  //       console.warn(`emotion-media-query: Use media.greaterThan('${label}') instead of old media.from.${label} (Probably we'll deprecate it)`);
  //       return css`
  //         @media (min-width: ${size}) {
  //           ${css(...args)}
  //         }
  //       `;
  //     };

  //     return acc;
  //   },
  //     { to: {}, from: {} }
  //   );

  return {
    lessThan,
    greaterThan,
    between,
    // ...oldStyle,
  };
}

/**
 * Media object with default breakpoints
 * @return {object} - Media generators for each size
 */
export const emotionMedia = generateMedia();

/**
 * Usage: emotion.div` ${media.lessThan('medium')`background: #000;`} `;
 * With this code, background for small and medium sizes will be `default` and for more than medium, will be `#000`
 */
