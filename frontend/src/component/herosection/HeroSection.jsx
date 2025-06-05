import boy1 from "../../assets/boy1.png"
import herosectionimg1 from "../../assets/herosectionimg1.png"
import herosectionimg2 from "../../assets/herosectionimg2.svg"

export default function HeroSection(){
    return(
        <section className="bg-primary pt-4 pb-6">
            <div className="flex items-between max-w-screen-xl mx-auto">
                <div className="w-1/2 space-y-6 p-10 relative">
                <img src={herosectionimg2} alt="hero section z-10 rotating image " className="absolute top-10 right-50 animate-spining"/>
                    <h3 className="text-secondary text-sm tracking-widest">MODERN STUDIO</h3>
                    <h1 className="text-white text-6xl max-w-md font-bold z-20 relative">We're Help To Build Your Dream Project</h1>
                    <p className="text-md text-ternary max-w-md leading-8 tracking-wide">Agency provides a full service range including technical skills,design, business understanding</p>
                    <div className="flex gap-4">
                        <button className="cursor-pointer bg-secondary text-md py-3 px-5 font-semibold text-white rounded-md hover:-translate-y-2 transition-all duration-500 ease-in-out">HOW WE WORK</button>
                        <button className="cursor-pointer text-white text-md py-3 px-5 hover:-translate-y-2 transition-all duration-500 ease-in-out">Contact Us</button>
                    </div>
                     <div>
                    <div className="mt-20 flex gap-4">
                        <div className="flex items-center">
                            <img src={boy1} alt="founder_image" className="w-10"/>
                        </div>
                        <div className="text-white ">
                            <h3 className="text-ternary tracking-wide">"Put themeselves in the merchant's shoes"</h3>
                            <h3 className="text-white ps-2 tracking-wide"> Meta Inc.</h3>
                        </div>
                    </div>
                </div>
                </div>
               
                <div className="w-1/2 flex items-center justify-center">
                    <img src={herosectionimg1} alt="herosectionimage" className="w-[75%]"/>
                </div>
            </div>
        </section>
    )
}