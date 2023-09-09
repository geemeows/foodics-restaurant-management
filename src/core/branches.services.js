import httpClient from "./httpClient";
import { modelingBranches } from './branches.modeling'

export const getBranches = async () => {
  const { data } = await httpClient.get('/branches?include[0]=sections&include[1]=sections.tables')
  return modelingBranches(data.data)
}

export const updateBranches = async (id, payload) => {
  const { data } = await httpClient.put(`/branches/${id}`, payload)
  return data;
}