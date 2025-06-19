import { useEffect,useState } from "react";
import UserAllTicketsTABS from "./UserAllTicketsTABS";
import allapis from "../../../util/allapis";
import { useSelector } from "react-redux";
import Loading from "../../loading/Loading";


export default function UserAllTickets(){
    const {userProfile} = useSelector((state) => state.user);
    const [userAllReservations, setUserAllReservations] = useState(null);
    console.log(userProfile);

    useEffect(() => {
        const getUserReservations = async() => {
            allapis(
                "/api/user/getUserReservations",
                "POST",
                {userID: userProfile._id},
                "Error while fetching user's all reservations.",
                (result) => {
                    setUserAllReservations(result.reservations);
                }
            )
        }
        if(userProfile){
            getUserReservations();
        }
    },[userProfile])

    if(!userAllReservations){
        return <Loading/>
    }

    return(
        <section className="min-h-screen flex justify-center py-32">
                <div className=" h-full w-full max-w-7xl mx-auto px-4 xl:px-0">
                    <UserAllTicketsTABS userAllReservations={userAllReservations}/>
                </div>
        </section>
    )
}