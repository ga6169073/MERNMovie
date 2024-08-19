import React, { useEffect, useState } from 'react'
import Drawer from "rc-drawer"
function MainDrawer({ children, drawerOpen, closeDrawer }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    function reportWindowSize() {
      setWindowWidth(window.innerWidth)
      // console.log(window.innerHeight, window.innerWidth)
    }
    // Trigger this function on resize
    window.addEventListener('resize', reportWindowSize)
    //  Cleanup for componentWillUnmount
    return () => window.removeEventListener('resize', reportWindowSize)
  }, [])
  return (
    <Drawer open={drawerOpen} onClose={closeDrawer} level={null} prefixCls='drawer' handler={false} width={windowWidth > 480 ? "50%" : "100%"}
      placement="right">
      {children}
    </Drawer>
  )
}

export default MainDrawer