import { initFlowbite } from "flowbite";
import { useEffect, useState, useMemo } from "react";
import Loading from "../../loading/Loading";
import TicketCard from "./TicketCard";

export default function UserAllTicketsTABS({ userAllReservations }) {
  const [activeTab, setActiveTab] = useState("coming");

  useEffect(() => {
    initFlowbite();
  }, []);


  const filteredUserAllReservations = useMemo(() => {
    const filter = userAllReservations.filter(
      (reservation) => reservation.status === activeTab
    );
    return filter;
  },[activeTab,userAllReservations])

  const handletabChange = (tab) => {
    setActiveTab(tab);
    console.log(tab);
  };

  console.log(userAllReservations, activeTab, filteredUserAllReservations);

  if (userAllReservations === null || filteredUserAllReservations === null) {
    return <Loading />;
  }

  return (
    <>
      <div className="mb-4">
        <ul
          className="flex flex-wrap -mb-px text-md tracking-wider font-medium text-center justify-center"
          id="usertickets-styled-tab"
          data-tabs-toggle="#usertickets-styled-tab-content"
          data-tabs-active-classes="userallticketstabsactive"
          data-tabs-inactive-classes="userallticketstabsinactive"
          role="tablist"
        >
          <li
            className="relative me-2"
            role="presentation"
            onClick={(e) => handletabChange("coming")}
          >
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg"
              id="coming-styled-tab"
              data-tabs-target="#styled-coming"
              type="button"
              role="tab"
              aria-controls="styled-coming"
              aria-selected="false"
            >
              Coming
            </button>
          </li>
          <li
            className="relative me-2"
            role="presentation"
            onClick={(e) => handletabChange("past")}
          >
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg"
              id="past-styled-tab"
              data-tabs-target="#styled-past"
              type="button"
              role="tab"
              aria-controls="styled-past"
              aria-selected="false"
            >
              Past
            </button>
          </li>
          <li
            className="relative me-2"
            role="presentation"
            onClick={(e) => handletabChange("cancelled")}
          >
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg"
              id="cancelled-styled-tab"
              data-tabs-target="#styled-cancelled"
              type="button"
              role="tab"
              aria-controls="styled-cancelled"
              aria-selected="false"
            >
              Cancelled
            </button>
          </li>
        </ul>
      </div>
      <div id="usertickets-styled-tab-content">
        <div
          className="hidden p-4 rounded-lg"
          id="styled-coming"
          role="tabpanel"
          aria-labelledby="coming-styled-tab"
        >
          <div className="w-full">
            <TicketCard
              filteredUserAllReservations={filteredUserAllReservations}
              status={"coming"}
            />
          </div>
        </div>

        <div
          className="hidden p-4 rounded-lg"
          id="styled-past"
          role="tabpanel"
          aria-labelledby="past-styled-tab"
        >
          <div className="w-full">
            <TicketCard
              filteredUserAllReservations={filteredUserAllReservations}
              status={"past"}
            />
          </div>
        </div>
        <div
          className="hidden p-4 rounded-lg"
          id="styled-cancelled"
          role="tabpanel"
          aria-labelledby="cancelled-styled-tab"
        >
          <div className="w-full">
            <TicketCard
              filteredUserAllReservations={filteredUserAllReservations}
              status={"cancelled"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// export default function UserAllTicketsTABS({ userAllReservations }) {
//    const [activeTab, setActiveTab] = useState("coming");
//      const [filteredUserAllReservations,setFilteredUserAllReservations] = useState(null);
//   useEffect(() => {
//     initFlowbite();
//     const filter = userAllReservations.filter(
//       (reservation) => reservation.status === activeTab
//     );
//     setFilteredUserAllReservations(filter);
//   }, [activeTab]);

//   const handletabChange = (tab) => {
//     setActiveTab(tab);
//     console.log(tab);
//   };
//  if (userAllReservations === null) {
//     return <Loading />;
//   }

//   return (
//     <>
//       <div className="mb-4 ">
//         <ul
//           className="flex flex-wrap -mb-px text-sm font-medium text-center"
//           id="default-styled-tab"
//           data-tabs-toggle="#default-styled-tab-content"
//           data-tabs-active-classes="userallticketstabsactive"
//           data-tabs-inactive-classes="userallticketstabsinactive"
//           role="tablist"
//         >
//           <li className="relative me-2" role="presentation" onClick={(e) => handletabChange("coming")}>
//             <button
//               className="inline-block p-4 border-b-2 rounded-t-lg"
//               id="profile-styled-tab"
//               data-tabs-target="#styled-profile"
//               type="button"
//               role="tab"
//               aria-controls="styled-profile"
//               aria-selected="true"
//             >
//               Coming
//             </button>
//           </li>
//           <li className="relative me-2" role="presentation" onClick={(e) => handletabChange("past")}>
//             <button
//               className="inline-block p-4 border-b-2 rounded-t-lg"
//               id="dashboard-styled-tab"
//               data-tabs-target="#styled-dashboard"
//               type="button"
//               role="tab"
//               aria-controls="styled-dashboard"
//               aria-selected="false"
//             >
//               Past
//             </button>
//           </li>
//           <li className="relative me-2" role="presentation" onClick={(e) => handletabChange("cancelled")}>
//             <button
//               className="inline-block p-4 border-b-2 rounded-t-lg"
//               id="settings-styled-tab"
//               data-tabs-target="#styled-settings"
//               type="button"
//               role="tab"
//               aria-controls="styled-settings"
//               aria-selected="false"
//             >
//               Cancelled
//             </button>
//           </li>
//         </ul>
//       </div>

//       <div id="default-styled-tab-content">
//         <div
//           className="hidden p-4 rounded-lg "
//           id="styled-profile"
//           role="tabpanel"
//           aria-labelledby="profile-styled-tab"
//         >
//           <div className="w-full flex gap-6">
//             <TicketCard filteredUserAllReservations={filteredUserAllReservations} status={"coming"}/>
//           </div>
//         </div>
//         <div
//           className="hidden p-4 rounded-lg"
//           id="styled-dashboard"
//           role="tabpanel"
//           aria-labelledby="dashboard-styled-tab"
//         >
//           <div className="w-full flex gap-6">
//             <TicketCard filteredUserAllReservations={filteredUserAllReservations} status={"coming"}/>
//           </div>
//         </div>
//         <div
//           className="hidden p-4 rounded-lg"
//           id="styled-settings"
//           role="tabpanel"
//           aria-labelledby="settings-styled-tab"
//         >
//           <div className="w-full flex gap-6">
//             <TicketCard filteredUserAllReservations={filteredUserAllReservations} status={"coming"}/>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
