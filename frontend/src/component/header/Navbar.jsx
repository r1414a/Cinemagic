import logo from "../../assets/logo.png"

export default function Navbar(){
    return(
        <header className="bg-primary">
           <div className="flex justify-center item-center  text-white p-4 max-w-screen-xl mx-auto">
                <div className="w-1/3 text-center">
                    <img src={logo} alt="site_logo" className=""/>
                </div>
                <div className="w-1/3 my-auto">
                    <ul className="flex gap-10 justify-between text-md">
                        <li className="cursor-pointer hover:text-secondary transition-text duration-500 ease-in-out">About</li>
                        <li className="cursor-pointer hover:text-secondary transition-text duration-500 ease-in-out">Services</li>
                        <li className="cursor-pointer hover:text-secondary transition-text duration-500 ease-in-out">Pricing</li>
                        <li className="cursor-pointer hover:text-secondary transition-text duration-500 ease-in-out">Blog</li>
                    </ul>
                </div >
                <div className="w-1/3 text-end">
                    <button className="text-sm border border-white bg-transparent py-3 px-6 rounded-md cursor-pointer hover:bg-secondary hover:border-secondary transition-all duration-500 ease-in-out tracking-widest">CONTACT</button>
                </div>
           </div>
        </header>
    )
}