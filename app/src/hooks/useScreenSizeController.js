import { useState, useEffect } from 'react';

function useScreenSizeController() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener('resize', updateSize); updateSize(); 

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const logoSize =  isMobile ? "32px" : "40px"; 
  const iconSize =  isMobile ? "12px" : "28px"; 
  const iconSizeHome = isMobile ? "12px" : "28px"; 
  const navbarSize = isMobile ? "64px" : "56px"; 

  // Margens e espaçamentos ajustados
  const marginLeft = '2%';
  const marginRight = '2%';
  const marginTop = '2%';

  return { isMobile, logoSize, iconSize, iconSizeHome, navbarSize, marginLeft, marginRight,marginTop };
}

export default useScreenSizeController;
