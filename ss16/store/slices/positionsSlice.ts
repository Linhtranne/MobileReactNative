import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Position } from '../../types';

const API_URL = 'https://nest-api-public.ixe-agent.io.vn/api/v1/positions';

export const fetchPositions = createAsyncThunk<Position[], string | undefined>(
  'positions/fetch',
  async (token) => {
    const res = await axios.get(API_URL, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return res.data.data as Position[];
  }
);

export const deletePosition = createAsyncThunk<number, { id: number; token?: string }>(
  'positions/delete',
  async ({ id, token }) => {
    await axios.delete(`${API_URL}/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return id;
  }
);

export const getPositionDetail = createAsyncThunk<Position, { id: number; token?: string }>(
  'positions/detail',
  async ({ id, token }) => {
    const res = await axios.get(`${API_URL}/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return res.data.data as Position;
  }
);

export const createPosition = createAsyncThunk<Position, { data: Omit<Position, 'id' | 'createdAt'>; token?: string }>(
  'positions/create',
  async ({ data, token }) => {
    const res = await axios.post(API_URL, data, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return res.data.data as Position;
  }
);

export const updatePosition = createAsyncThunk<Position, { id: number; data: Partial<Omit<Position, 'id' | 'createdAt'>>; token?: string }>(
  'positions/update',
  async ({ id, data, token }) => {
    const res = await axios.put(`${API_URL}/${id}`, data, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    return res.data.data as Position;
  }
);

type PositionsState = {
  positions: Position[];
  positionDetail?: Position | null;
  loading: boolean;
  error?: string | null;
  createSuccess?: boolean;
  updateSuccess?: boolean;
};

const initialState: PositionsState = {
  positions: [],
  positionDetail: null,
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
};

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    setPositions(state, action: PayloadAction<Position[]>) {
      state.positions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPositions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.positions = action.payload;
      })
      .addCase(fetchPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch positions';
      })
      .addCase(getPositionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.positionDetail = null;
      })
      .addCase(getPositionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.positionDetail = action.payload;
      })
      .addCase(getPositionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch position detail';
      })
      .addCase(createPosition.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createPosition.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = true;
        state.positions.push(action.payload);
      })
      .addCase(createPosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create position';
        state.createSuccess = false;
      })
      .addCase(updatePosition.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updatePosition.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = true;
        state.positions = state.positions.map((p) => p.id === action.payload.id ? action.payload : p);
        state.positionDetail = action.payload;
      })
      .addCase(updatePosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update position';
        state.updateSuccess = false;
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.positions = state.positions.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setPositions } = positionsSlice.actions;
export default positionsSlice.reducer;
