import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import AdminHome from "./components/adminHome"
import ViewServiceRequests from "./components/ViewServiceRequests"
import ViewUsers from "./components/ViewUsers"


function App() {

  return (
    <>
    <BrowserRouter>
    <Toaster/>
     <Routes path="/*">
     
      <Route path='/' element={<AdminHome/>}/>
    
     <Route path="service-requests" element={<ViewServiceRequests />} />
         <Route path="users" element={<ViewUsers />} />
     </Routes>

     </BrowserRouter>
    </>
  )
}

export default App
