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

  const logoSize =  isMobile ? "5vw" : "4vw"; 
  const iconSize =  isMobile ? "3vw" : "2vw"; 
  const iconSizeHome = isMobile ? "3vw" : "2vw"; 
  const navbarSize = isMobile ? "8vw" : "4vw"; 

  // Margens e espaçamentos ajustados
  const marginLeft = isMobile ? '0' : '2%'; 
  const marginTop = isMobile ? '1%' : '2%';

  return { isMobile, logoSize, iconSize, iconSizeHome, navbarSize, marginLeft, marginTop };
}

export default useScreenSizeController;
