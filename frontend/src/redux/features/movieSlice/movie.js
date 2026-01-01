import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_APIKEY;

export const fetchMovieDetailCrewAndCast = createAsyncThunk(
  "movie/fetchMovieDetailCrewAndCast",
  async (movieId) => {
    try {
      const [detailRes, creditRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
        ),
      ]);

      const [detail, credit] = await Promise.all([detailRes.json(), creditRes.json()]);
  
      return { detail, credit };
    } catch (err) {
      console.log(err);
      throw new Error("error while fetching hero section movie details");
    }
  }
);


export const fetchMovieVideoAndSimilarAndReviews = createAsyncThunk(
  "movie/fetchMovieVideoAndSimilarAndReviews",
  async(movieId) => {
    const [videoRes,similarRes,reviewRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`),
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&api_key=${TMDB_API_KEY}`),
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`)
    ])
    const [video,similar,review] = await Promise.all([videoRes.json(), similarRes.json(), reviewRes.json()])

    return {video,similar: similar.results, review: review.results};
  }
)



const movieSlice = createSlice({
  name: "movie",
  initialState: {
    isLoading: false,
    isError: false,
    details: [],
    credits: [],
    video: null,
    similarMovies: null,
    movieReview: null,
  },
  reducers: {
     resetMovieState: (state) => {
      state.details = [];
      state.credits = [];
      state.video = null;
      state.similarMovies = null;
      state.movieReview = null;
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetailCrewAndCast.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchMovieVideoAndSimilarAndReviews.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchMovieDetailCrewAndCast.fulfilled, (state, action) => {
        state.isLoading = false;
        const alreadyPresent = state.details.find((movie) => movie.id == action.payload.detail.id)
        if(!alreadyPresent){
          state.details.push(action.payload.detail);
          state.credits.push(action.payload.credit);
        }
      })
      .addCase(fetchMovieVideoAndSimilarAndReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.video = action.payload.video;
        state.similarMovies = action.payload.similar;
        state.movieReview = action.payload.review;
      })
      .addCase(fetchMovieDetailCrewAndCast.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchMovieVideoAndSimilarAndReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});



export const { resetMovieState } = movieSlice.actions;
export default movieSlice.reducer;
