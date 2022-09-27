import { useState, useEffect } from 'react';

export interface Breakpoints {
  width?: number;
  height?: number;

  /**
   * (max-width: 379px)
   */
  isXXSmall?: boolean;

  /**
   * (max-width: 599px)
   */
  isXSmall?: boolean;

  /**
   * (min-width: 600px) and (max-width: 959px)
   */
  isSmall?: boolean;

  /**
   * (min-width: 960px) and (max-width: 1279px)
   */
  isMedium?: boolean;

  /**
   * (min-width: 1280px) and (max-width: 1919px)
   */
  isLarge?: boolean;

  /**
   * (min-width: 1920px)
   */
  isXLarge?: boolean;

  /**
   * (max-height: 999px)
   */
  isShortHeight?: boolean;

  /**
   * (min-height: 1000px) and (max-height: 1199px)
   */
  isMediumHeight?: boolean;

  /**
   * (min-height: 1200px)
   */
  isTallHeight?: boolean;

  /**
   * (max-width: 379px) and (orientation: portrait) OR
   * (max-width: 700px) and (orientation: landscape)
   */
  isXXSmallHandset?: boolean;

  /**
   * (max-width: 599px) and (orientation: portrait) OR
   * (max-width: 959px) and (orientation: landscape)
   */
  isHandset?: boolean;

  /**
   * (min-width: 600px) and (max-width: 839px) and (orientation: portrait) OR
   * (min-width: 960px) and (max-width: 1279px) and (orientation: landscape)
   */
  isTablet?: boolean;

  /**
   * (min-width: 840px) and (orientation: portrait) OR
   * (min-width: 1280px) and (orientation: landscape)
   */
  isDesktop?: boolean;

  /**
   * (max-width: 599px) and (orientation: portrait)
   */
  isHandsetPortrait?: boolean;

  /**
   * (min-width: 600px) and (max-width: 839px) and (orientation: portrait)
   */
  isTabletPortrait?: boolean;

  /**
   * (min-width: 840px) and (orientation: portrait)
   */
  isDesktopPortrait?: boolean;

  /**
   * (max-width: 959px) and (orientation: landscape)
   */
  isHandsetLandscape?: boolean;
  /**
   * (min-width: 960px) and (max-width: 1279px) and (orientation: landscape)
   */
  isTabletLandscape?: boolean;
  /**
   * (min-width: 1280px) and (orientation: landscape)
   */
  isDesktopLandscape?: boolean;
}

function setBreakpoints(
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
  orientation: OrientationType
): Breakpoints {
  const breakpoints: Breakpoints = {};

  breakpoints.width = width;
  breakpoints.height = height;

  const isPortrait =
    orientation === 'portrait-primary' || orientation === 'portrait-secondary';
  const isLandscape =
    orientation === 'landscape-primary' ||
    orientation === 'landscape-secondary';

  breakpoints.isXXSmall = width < 380;
  breakpoints.isXSmall = width < 600;
  breakpoints.isSmall = width >= 600 && width < 960;
  breakpoints.isMedium = width >= 600 && width < 1280;
  breakpoints.isLarge = width >= 1280 && width < 1920;
  breakpoints.isXLarge = width >= 1920;

  breakpoints.isShortHeight = height < 1000;
  breakpoints.isMediumHeight = height >= 1000 && height < 1200;
  breakpoints.isTallHeight = height >= 1200;

  breakpoints.isXXSmallHandset =
  (width < 379 && isPortrait) || (width < 700 && isLandscape);

  breakpoints.isHandset =
    (width < 600 && isPortrait) || (width < 960 && isLandscape);

  breakpoints.isTablet =
    (width >= 600 && width < 840 && isPortrait) ||
    (width >= 960 && width < 1280 && isLandscape);

  breakpoints.isDesktop =
    (width >= 840 && isPortrait) || (width >= 1280 && isLandscape);

  breakpoints.isHandsetPortrait = width < 600 && isPortrait;

  breakpoints.isTabletPortrait = width >= 600 && width < 840 && isPortrait;

  breakpoints.isDesktopPortrait = width >= 840 && isPortrait;

  breakpoints.isHandsetLandscape = width < 960 && isLandscape;

  breakpoints.isTabletPortrait = width > 960 && width < 1280 && isLandscape;

  breakpoints.isDesktopLandscape = 1280 >= 1280 && isLandscape;

  return breakpoints;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

const getOrientation = (): OrientationType => window.screen?.orientation?.type;

export default function useBreakpoints(): Breakpoints {
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number;
    height: number;
  }>();
  const [orientation, setOrientation] = useState<OrientationType>();

  const updateOrientation = (event) => {
    setOrientation(getOrientation());
  };

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setOrientation(getOrientation());

    window.addEventListener('orientationchange', updateOrientation);
    return () => {
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  return windowDimensions && orientation
    ? setBreakpoints(windowDimensions, orientation)
    : {};
}
