import profilelogo from "../../assets/boy1.png" 
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";


const drawerLinks = ["Your Tickets", "Favorites", "Log Out"]


export default function HeaderDrawer() {
  const { userProfile, authStaus } = useSelector((state) => state.user);

  return createPortal(
    <div
        id="drawer-right-example"
        className="fixed top-0 right-0 z-[9999] h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-blue w-80 rounded-tl-4xl px-12"
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <button
          type="button"
          data-drawer-hide="drawer-right-example"
          aria-controls="drawer-right-example"
          className="absolute cursor-pointer top-5 end-5 inline-flex items-center justify-center"
        >
          <IoMdClose className="text-white text-2xl hover:rotate-180 transition-rotate duration-500 ease-in-out"/>
        </button>

        <div className="mt-18">
            <div className="flex items-center gap-4">
                <img src={userProfile?.profilePic} alt="user profile pic" className="w-11 rounded-full border-2 border-white" loading="lazy"/>
                <h2 className="text-white font-semibold text-lg">{userProfile?.username}</h2>
            </div>
            <div className="h-2 w-full bg-white rounded-full mt-10"></div>
        </div>
        <div className="mt-12">
            <ul className="space-y-6 text-white">

                {
                    drawerLinks.map((link) => (
                        <li key={link} className="group cursor-pointer flex flex-col font-medium text-lg">{link} <span className="w-0 h-1 rounded-full group-hover:w-12 transition-all duration-500 ease-in-out bg-white inline-block"></span></li>
                    ))
                }
            </ul>
        </div>
        
      </div>,
    document.body
  );
}
