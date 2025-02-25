import { Outlet } from "react-router-dom"
import "./uiLayout.css"
import { useEffect } from "react"

const UILayout = () => {

    return (
        <div className="uiLayout">
            <Outlet />
        </div>
    )
}

export default UILayout