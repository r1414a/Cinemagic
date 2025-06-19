import { matchPath, Outlet, useLocation } from "react-router"
import Navbar from "../component/header/Navbar"
import Footer from "../component/footer/Footer"
import { useState,useEffect } from "react"
import { checkUserAuth } from "../redux/features/userSlice/user";
import { useDispatch } from "react-redux";

export default function AppLayout(){
    const [includeHeadFoot, setIncludeHeadFoot] = useState(false);

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

    const location = useLocation();
    let do_not_include_header_footer_for = ['/authentication','/authentication/verify'];

    useEffect(() => {
        setIncludeHeadFoot(do_not_include_header_footer_for.includes(location.pathname));
    },[location.pathname]);



    return(
        <>
        {includeHeadFoot ? null :  <Navbar/>}
        <Outlet/>
        {includeHeadFoot ? null : <Footer/>}
        </>
    )
}