import { Outlet } from "react-router-dom"
import SideNavigationTab from "./assets/components/SideNavigationTab/SideNavigatonTab"


function App() {

  return (
    <>
     <SideNavigationTab></SideNavigationTab>
     <Outlet></Outlet>
    </>
  )
}

export default App
