// movieSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../../types/movie.d';
import { addMovie, fetchMovies, updateMovie } from '../../utils/moviesApi';

interface MovieState {
  movies: Movie[];
  loading: boolean;
  currentPage: number;
  totalMovies: number;
}

const initialState: MovieState = {
  movies:[
    {
        id: "5768cd8d-8439-404d-84df-5af32d866102",
        title: "ldwdklsdkls",
        year: 87678,
        poster: "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GxcXF0eXIyIiIiI3KQV2EREREREnpjnsIiIiIiJOTIFdRERERMSJKbCLiIiIiDgxBXYRERERESemwC4iIiIi4sQU2EVEREREnJgCu4iIiIiIE1NgFxERERFxYgrsIiIiIiJOTIFdRERERMSJKbCLiIiIiDgxBXYRERERESemwC4iIiIi4sQU2EVEREREnJgCu4iIiIiIE1NgFxERERFxYgrsIiIiIiJOTIFdRERERMSJKbCLiIiIiDgxBXYRERERESemwC4iIiIi4sQU2EVEREREnJgCu4iIiIiIE1NgFxERERFxYgrsIiIiIiJOTIFdRERERMSJKbCLiIiIiDgxBXYRERERESemwC4iIiIi4sQU2EVEREREnJgCu4iIiIiIE1NgFxERERFxYgZHF3Az+/TTnTR68CFHlyEiIiJyVdwMNbjrrjscXYZcIwX2G+DmVoPatXQKRUREROTX42K3F51zdBEiIiIiIlI5zWEXEREREXFiCuwiIiIiIk5MgV1ERERExIkpsIuIiIiIODEFdhERERERJ6bALiIiIiLixBTYRUREREScmAK7iIiIiIgTU2AXEREREXFiCuwiIiIiIk5MgV1ERERExIkpsIuIiIiIODEFdhERERERJ6bALiIiIiLixBTYRUREREScmAK7iIiIiIgTU2AXEREREXFiCuwiIiIiIk5MgV1ERERExIkpsIuIiIiIODEFdhERERERJ6bALiIiIiLixBTYRUREREScmMHRBYg4K1vhWc6ePcvZs0UUFxdRXHzO0SWJiFQ7FxcXatSogcFQg5puNalZ00CNGhrPE3EmLnZ7kVKIyHnFxcWcOVOArfAsBoMBY0033NxK/udVo4YLLi4uji5RRKRaFRUVU1xcTFFRMbbCQmy2s7gZXKlVy4ibm5ujyxMRFNhFSp0+XcDpMwXUru1OHY9aCucictsqKCjEmn8SNzc36njU0oi7iIMpsMttr7j4HPknT3LuHPzOsy6urvofk4jIuXPnyD95moKCQurW9aCmm2bRijiKArvc1oqKijlhPYmbmyuepjoaVRcRucTp0wVY809hqlsHo1FTZEQcQZfLctsqLi7Gmn8Ko9ENU10PR5cjIuKUatd2x9XVleO/WPF0qUPNmgrtIr81ffYvt638k6dxda2hsC4icgUXBjbyT56mqKjY0eWI3HYU2OW2dKbARnFx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"
    }],
  loading: false,
  currentPage: 1,
  totalMovies: 0,
};

export const fetchMoviesWithPagination = createAsyncThunk(
  'movie/fetchMoviesWithPagination',
  async ({ page, limit }: { page: number; limit: number }) => {
    const data = await fetchMovies(page, limit);
    return data;
  }
);

export const addNewMovie = createAsyncThunk(
  'movie/addNewMovie',
  async (movieData: { title: string; year: string; poster: File | null }) => {
    const response = await addMovie(movieData);
    return response.data;
  }
);

export const editMovie = createAsyncThunk(
  'movie/editMovie',
  async (movieData: { id: string; title: string; year: string; poster: File | null }) => {
    const response = await updateMovie(movieData.id, movieData); // API call to edit movie
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesWithPagination.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesWithPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        // state.totalMovies = action.payload.totalMovies;
      })
      .addCase(fetchMoviesWithPagination.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addNewMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(editMovie.fulfilled, (state, action) => {
      }); 
  },
});

export const { setPage } = movieSlice.actions;

export default movieSlice.reducer;