import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

export const ButtonOut = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  const { isLoggedIn, setisLoggedIn } = useStateContext();
  
  return (
    <button 
      type="button"
      onClick={() => setisLoggedIn(false)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};


