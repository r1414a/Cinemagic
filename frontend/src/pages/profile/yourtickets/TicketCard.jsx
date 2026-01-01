import moment from "moment";

export default function TicketCard({filteredUserAllReservations, status}){
    if(filteredUserAllReservations.length === 0){
        return(
            <div className="w-full pt-20 text-white font-medium text-center">
                    <h1>No {status} reservations.</h1>
            </div>
        )
    }else{
         return(
        <div className="flex flex-wrap gap-6 justify-center">
        {
              filteredUserAllReservations.map((reservation) => (
                <div
                  key={reservation._id}
                  className="bg-white w-[350px] flex flex-col justify-between rounded-md"
                >
                  <div className="relative space-y-2 p-6 border-b-2 border-dashed">
                    <h3 className="text-lg">
                      <span className="font-semibold">Movie:</span> The Dark
                      Knight
                    </h3>
                    <div>
                      <h3 className="text-md font-medium">Date & Time:</h3>
                      <p className="text-sm">
                        {moment(reservation.createdAt).format(
                          "dddd, MMMM Do YYYY, hh:mm A"
                        )}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-md font-medium">Seat Info:</h3>
                      <div className="flex gap-2">
                        {reservation.seats.map((item) => (
                          <div
                            key={item}
                            className="p-1 rounded-md inline-block text-white bg-gray"
                          >
                            <p className="text-xs">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-md font-medium">Cinema</h3>
                      <p className="text-sm">
                        {reservation.theater.chain} | {reservation.theater.name}{" "}
                        | {reservation.theater.location} | {reservation.city}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-md font-medium">Total Amount</h3>
                      <p className="text-sm">₹ 500</p>
                    </div>

                    <div className="absolute -bottom-6 -right-4 rounded-full w-8 h-8 bg-blue"></div>
                    <div className="absolute -bottom-4 -left-4 rounded-full w-8 h-8 bg-blue"></div>
                  </div>
                  <div className="px-4 pt-12 pb-4">
                    {
                        status === "coming"
                        ?
                        <button onClick={() => alert("click")} className={`w-full bg-dyellow hover:bg-red-600 hover:text-white cursor-pointer font-semibold text-sm py-3.5 rounded-md`}>
                        Cancel Booking
                        </button>
                        :
                        <div className={`w-full ${status === "past" ? "bg-gray" : "bg-red-600"} text-center font-semibold text-sm py-3.5 rounded-md`}>{status === "past" ? "Past Booking" : "Cancelled Booking"}</div>
                    }
                  </div>
                </div>
              ))}
        
        </div>
    )
    }
   
}