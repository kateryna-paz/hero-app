import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE + "/superheroes";

export const getHeroes = () => axios.get(API_BASE);

export const getHeroById = (id) => axios.get(`${API_BASE}/${id}`);

export const createHero = (heroData) =>
  axios.post(`${API_BASE}`, heroData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateHero = (id, updatedHero) =>
  axios.put(`${API_BASE}/${id}`, updatedHero);

export const deleteHero = (id) => axios.delete(`${API_BASE}/${id}`);
