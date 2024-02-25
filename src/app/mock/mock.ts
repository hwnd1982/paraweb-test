import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export const mockAxios = axios.create();
export const mock = new MockAdapter(mockAxios, { delayResponse: 2000 });

mock.onGet("/api/form").reply(() => axios.get('/mock-api/form.json'));
