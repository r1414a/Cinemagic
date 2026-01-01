import { useEffect,useState } from "react";
import HeroSection from "../../component/herosection/HeroSection"
import TypeMovies from "../../component/typemovies/TypeMovies"



const BASE_TMDB_URL = 'https://api.themoviedb.org/3/movie/'

export default function Home(){
  
    const [data, setData] = useState({
        trending: null,
        upcoming: null
    });



  useEffect(() => {
    const fetchSome = async () => {
      try{
        const res = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/api/movies/fetchSome`);
        const data = await res.json();
        console.log("fetchSome",data);
      }catch(err){
        console.log("fetchSOme error", err);
      }
    }
    const fetchTrendingMovies = async () => {
      try {
        // const url = `https://api.themoviedb.org/3/movie/${type === 'trending' ? 'popular' : 'upcoming'}?api_key=1aee3a34d219b4b6213fc8d93c1c07f5`;
        
        const [trendingRes,upcomingRes] = await Promise.all([
            fetch('https://api.themoviedb.org/3/' + 'trending/movie/day' + `?api_key=${import.meta.env.VITE_TMDB_APIKEY}`),
            fetch(BASE_TMDB_URL + 'upcoming' + `?api_key=${import.meta.env.VITE_TMDB_APIKEY}`),
        ])

        const [trending,upcoming] = await Promise.all([
            trendingRes.json(),upcomingRes.json()
        ])


        if (trendingRes.ok && upcomingRes.ok) {
            setData({trending: trending.results,upcoming: upcoming.results})
   
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTrendingMovies();
    fetchSome();

  }, []);
    return(
        <>
            <HeroSection/>
            <TypeMovies type={"trending"} data={data.trending}/>
            <TypeMovies type={"comingsoon"} data={data.upcoming}/>
        </>
    )
}