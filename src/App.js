import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import {useState } from 'react';
import AIroutineMaker from './pages/AIroutineMaker'
import {Login} from './pages/Login'
import Aiform from './components/Aiform'
import SupabaseTest from './pages/Supabase';
const App = () => {
  
  

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings,activeDash,isLoggedIn,setisLoggedIn } = useStateContext();
  //const [isLoggedIn, setisLoggedIn] = useState(false);
  //const onClick = (LoggedIn) => setisLoggedIn({ ...initialState, [LoggedIn]: false });

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');


    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }

  }, []);

  return (

          <div >
            {isLoggedIn ?  (
               <div className={currentMode === 'Dark' ? 'dark' : ''}>
               <BrowserRouter>
                 <div className="flex relative dark:bg-main-dark-bg">
                   <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                     <TooltipComponent
                       content="Settings"
                       position="Top"
                     >
                       <button
                         type="button"
                         onClick={() => setThemeSettings(true)}
                         style={{ background: currentColor, borderRadius: '50%' }}
                         className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                       >
                         <FiSettings />
                       </button>
         
                     </TooltipComponent>
                   </div>
                   {activeMenu ? (
                     <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                       <Sidebar />
                     </div>
                   ) : (
                     <div className="w-0 dark:bg-secondary-dark-bg">
                       <Sidebar />
                     </div>
                   )}
                   <div
                     className={
                       activeMenu
                         ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                         : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                     }
                   >
                     <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                       <Navbar />
                     </div>
                     <div>
                       {themeSettings && (<ThemeSettings />)}
         
                       <Routes>
                         {/* dashboard  */}
                         <Route path="/syncfusionDashboard/ecommerce" element={(<Ecommerce />)} />
                         <Route path="/syncfusionDashboard/Principal" element={(<Ecommerce />)} />
         
                         {/* pages  */}
                         <Route path="/syncfusionDashboard/orders" element={<Orders />} />
                         <Route path="/syncfusionDashboard/Entrenadores" element={<Employees />} />
                         <Route path="/syncfusionDashboard/Clientes" element={<Customers />} />
                         <Route path="/syncfusionDashboard/airoutineMaker" element={<AIroutineMaker />} />
                         <Route path="/syncfusionDashboard/AI-Routine" element={<Aiform />}/>
                     
 

                         {/* apps  */}
                         <Route path="/syncfusionDashboard/kanban" element={<Kanban />} />
                         <Route path="/syncfusionDashboard/Blog-Editor" element={<Editor />} />
                         <Route path="/syncfusionDashboard/Calendario" element={<Calendar />} />
                         <Route path="/syncfusionDashboard/color-picker" element={<ColorPicker />} />
         
                         {/* charts  */}
                         <Route path="/syncfusionDashboard/line" element={<Line />} />
                         <Route path="/syncfusionDashboard/area" element={<Area />} />
                         <Route path="/syncfusionDashboard/bar" element={<Bar />} />
                         <Route path="/syncfusionDashboard/pie" element={<Pie />} />
                         <Route path="/syncfusionDashboard/financial" element={<Financial />} />
                         <Route path="/syncfusionDashboard/color-mapping" element={<ColorMapping />} />
                         <Route path="/syncfusionDashboard/pyramid" element={<Pyramid />} />
                         <Route path="/syncfusionDashboard/stacked" element={<Stacked />} />

         
                       </Routes>
                     </div>
                     <Footer />
                   </div>
                 </div>
               </BrowserRouter>
             </div>
            ) : (
              <Login/>
            )}
          </div>

  );
};

export default App;
