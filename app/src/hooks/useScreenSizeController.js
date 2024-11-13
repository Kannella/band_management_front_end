import { useState, useEffect } from 'react';

function useScreenSizeController() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 600);
      setIsTablet(window.innerWidth >= 600 && window.innerWidth < 920);
    };

    window.addEventListener('resize', updateSize); updateSize(); 

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const logoSize = isTablet ? "30px" : "60px";
  const iconSize = isTablet ? "28px" : "36px";
  const iconSizeHome = isTablet ? "24px" : "36px";
  const navbarSize = isTablet ? "8vh": "10vh"

  // global
  const marginLeft = isMobile ? '0' : isTablet ? '4%' : '4%';
  const marginTop = '2vw';

  return { isMobile, isTablet, logoSize, iconSize, iconSizeHome, navbarSize, marginLeft, marginTop };
}

export default useScreenSizeController;
