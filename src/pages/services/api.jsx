import axios from "axios";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjU0MDVjYTJiYTE4YmY0YzUzNTY4MTZhOGQ4YzU0NyIsIm5iZiI6MTcyNDQ4MTY5OS42NTQ5NSwic3ViIjoiNjZjOTdhMTdlNzlmMTNiN2NiYTcwNTdhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.UdYlgArEhKxxy3TmveAZNO99s4Q-LoVf5EgVWf2J93Y",
  },
};

export const fetchTrendingMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const response = await axios.get(url, options);

  return response.data.results;
};

export const fetchMoviesDetails = async (moviesId) => {
  const url = `https://api.themoviedb.org/3/movie/${moviesId}`;
  const response = await axios.get(url, options);

  return response.data;
};

export const fetchMoviesCredits = async (moviesId) => {
  const url = `https://api.themoviedb.org/3/movie/${moviesId}/credits`;
  const response = await axios.get(url, options);

  return response.data;
};

export const fetchMoviesReviews = async (moviesId) => {
  const url = `https://api.themoviedb.org/3/movie/${moviesId}/reviews`;
  const response = await axios.get(url, options);

  return response.data;
};
