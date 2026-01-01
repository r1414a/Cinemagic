import { NavLink } from "react-router"


export default function BookTicketButton({id}){
    return(
        <>
        <NavLink to={`/movie/book/${id}`} className="py-3 px-6 rounded-sm font-semibold border-2 border-dyellow bg-dyellow">
                        Book Tickets
                      </NavLink>
        </>
    )
}