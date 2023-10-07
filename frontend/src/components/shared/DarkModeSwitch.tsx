import React from 'react'
import {useTheme} from "next-themes"
import {BsMoonStars,BsSun} from "react-icons/bs";
const DarkModeSwitch = () => {
    const {theme,setTheme} = useTheme()
  return (
    <div>
        {theme === "dark" ? <BsMoonStars size={25} className='text-slate-400' onClick={()=>setTheme("light")} /> : <BsSun size={30} className='text-yellow-400' onClick={()=>setTheme("dark")} />}
    </div>
  )
}

export default DarkModeSwitch