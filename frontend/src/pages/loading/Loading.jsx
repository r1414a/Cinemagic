export default function Loading(){
    return(
        <section className="flex justify-center items-center gap-4 w-full h-dvh bg-blue">
            <div className="w-10 h-10 rounded-full bg-dyellow animate-bounce "></div>
            <div className="w-10 h-10 rounded-full bg-dyellow animate-bounce delay-150"></div>
            <div className="w-10 h-10 rounded-full bg-dyellow animate-bounce delay-150"></div>
        </section>
    )
}