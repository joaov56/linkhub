import axios from "axios";

import { parseCookies } from 'nookies';

const cookies = parseCookies(undefined);

export const  linktreeApi = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        Authorization: `Bearer ${cookies['token']}`
    }
})