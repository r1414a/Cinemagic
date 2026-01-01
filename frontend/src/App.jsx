import { Suspense, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Loading from "./pages/loading/Loading";


const BookMovieLayout = lazy(() => import('./layout/BookMovieLayout'));
const AppLayout = lazy(() => import('./layout/AppLayout'));
const Home = lazy(() => import('./pages/home/Home'));
const MoreAboutMovie = lazy(() => import('./pages/more/MoreAboutMovie'));
const BookMovie = lazy(() => import('./pages/bookMovie/BookMovie'));
const ShowSeatLayout = lazy(() => import('./pages/bookMovie/ShowSeatLayout'));
const Authentication = lazy(() => import('./pages/Auth/Authentication'))
const NotFound = lazy(() => import('./pages/notFound/NotFound'));
const PaymentSuccess = lazy(() => import('./pages/payment/PaymentSuccess'));
const UserAllTickets = lazy(() => import("./pages/profile/yourtickets/UserAllTickets"));


function App() {
  return (
    <>
      <Suspense
        fallback={
          <Loading/>
        }
      >
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<MoreAboutMovie />} />
            <Route path="movie/book/success" element={<PaymentSuccess/>}/>
            <Route
              path="movie/book/:id" 
              element={<BookMovieLayout/>}
            >
                <Route index element={<BookMovie/>}/>
                <Route path="seatLayout" element={<ShowSeatLayout/>}/>
            </Route>
            <Route path="authentication" element={<Authentication/>}/>
            <Route path="authentication/verify" element={<Authentication/>}/>
            <Route path="profile/allreservations" element={<UserAllTickets/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
