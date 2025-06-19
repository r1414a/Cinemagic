import { FaRegCopyright } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

export default function  Footer(){
    return(
        <footer className="bg-dyellow py-20 space-y-5">
            <div >
                <ul className="flex justify-center gap-4">
                    <li className="bg-blue p-2"><FaLinkedin className="text-xl text-white"/></li>
                    <li className="bg-blue p-2"><FaGithub className="text-xl text-white"/></li>
                    <li className="bg-blue p-2"><FaLink className="text-xl text-white"/></li>
                </ul>
            </div>
            <div>
                <p className="flex gap-2 items-center justify-center"><FaRegCopyright/>2025 Cinemagic. All rights reserved.</p>
            </div>
        </footer>
    )
}