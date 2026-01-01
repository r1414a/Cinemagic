import { FaRegCopyright } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { Link } from "react-router";

export default function  Footer(){
    return(
        <footer className="bg-dyellow py-20 space-y-5">
            <div >
                <ul className="flex justify-center gap-4">
                    <Link to={'https://www.linkedin.com/in/rupesh-chincholkar-08bb7612b/'} target="_blank" className="bg-blue p-2"><FaLinkedin className="text-xl text-white"/></Link>
                    <Link to={'https://github.com/r1414a/'} target="_blank" className="bg-blue p-2"><FaGithub className="text-xl text-white"/></Link>
                    <Link to={'https://r1414a.github.io/portfolio-website/'} target="_blank" className="bg-blue p-2"><FaLink className="text-xl text-white"/></Link>
                </ul>
            </div>
            <div>
                <p className="flex gap-2 items-center justify-center"><FaRegCopyright/>2025 Cinemagic. All rights reserved.</p>
            </div>
        </footer>
    )
}