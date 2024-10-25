import axios from 'axios';

const API_URL = 'https://localhost:5000/movies';

export const fetchMovies = async (page: number, limit: number) => {
  const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  return response.data;
};

export const addMovie = async (movie: { title: string; year: string; poster: File | null }) => {
  const formData = new FormData();
  formData.append('title', movie.title);
  formData.append('year', movie.year);
  if (movie.poster) formData.append('poster', movie.poster);

  const response = await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateMovie = async (id: string, movie: { title: string; year: string; poster: File | null }) => {
  const formData = new FormData();
  formData.append('title', movie.title);
  formData.append('year', movie.year);
  if (movie.poster) formData.append('poster', movie.poster);

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
