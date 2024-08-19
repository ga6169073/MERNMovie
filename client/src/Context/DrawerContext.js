import React, { createContext, useMemo, useState } from "react";

export const SidebarContext = createContext();

function DrawerContext({ children }) {
    const [mobileDrawer, setMobileDrawer] = useState(false);
    const [progress, setProgress] = useState(0);

    const toggleDrawer = () => setMobileDrawer(!mobileDrawer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = useMemo(() => ({ mobileDrawer, toggleDrawer, progress, setProgress }), [mobileDrawer, progress]);
    return (
        <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
    );
}

export default DrawerContext;
