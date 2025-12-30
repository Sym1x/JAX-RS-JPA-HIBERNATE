import axios from "axios";

const API = "http://localhost:8080/people-system/api/users";

export interface Person {
  id: number;
  name: string;
  age: number;
}

export interface ApiResponse {
  state: string;
}

export async function getAllUsers(): Promise<Person[]> {
  const res = await axios.get(`${API}/affiche`);
  return res.data;
}

export async function addUser(name: string, age: number): Promise<ApiResponse> {
  const res = await axios.put(`${API}/add/${age}/${name}`);
  return res.data;
}

export async function deleteUser(id: number): Promise<ApiResponse> {
  const res = await axios.delete(`${API}/remove/${id}`);
  return res.data;
}

export async function updateUser(id: number, name: string, age: number): Promise<ApiResponse> {
  const res = await axios.put(`${API}/update/${id}/${name}/${age}`);
  return res.data;
}