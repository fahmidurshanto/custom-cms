import { Outlet } from "react-router-dom"
import SideNavigationTab from "./assets/components/SideNavigationTab/SideNavigatonTab"


function App() {

  return (
    <>
     <div className="">
     <SideNavigationTab></SideNavigationTab>
     </div>
     <Outlet></Outlet>
    </>
  )
}

export default App
