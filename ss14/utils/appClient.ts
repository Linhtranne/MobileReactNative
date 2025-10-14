import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQzLCJyb2xlIjoiUXXhuqNuIGzDvSIsInN0YXR1cyI6IkFDVElWRSIsImRldmljZUlkIjoiMTIzNDU2IiwiaWF0IjoxNzYwMzI3Nzk4LCJleHAiOjE3NjAzMjg2OTh9.L1dFi-FbvTn2yI1wosxd74i6nPpXf4v2vgPKEVNe-q0";

export const appClient = axios.create({
  baseURL: "https://nest-api-public.ixe-agent.io.vn",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
});
