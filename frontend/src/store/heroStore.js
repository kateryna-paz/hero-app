import { create } from "zustand";
import * as heroApi from "../services/apis/superhero";

export const useHeroStore = create((set) => ({
  heroes: [],
  currentHero: null,
  loading: false,
  error: null,

  fetchHeroes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await heroApi.getHeroes();
      set({ heroes: res.data });
    } catch (err) {
      set({ error: err });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  getHeroById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await heroApi.getHeroById(id);
      set({ currentHero: res.data });
    } catch (err) {
      set({ error: err });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  addHero: async (newHero) => {
    set({ loading: true, error: null });
    try {
      const res = await heroApi.createHero(newHero);
      set((state) => ({ heroes: [...state.heroes, res.data] }));
    } catch (err) {
      set({ error: err });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateHero: async (id, updatedHero) => {
    set({ loading: true, error: null });
    try {
      await heroApi.updateHero(id, updatedHero);
    } catch (err) {
      set({ error: err });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteHero: async (id) => {
    set({ loading: true, error: null });
    try {
      await heroApi.deleteHero(id);
      set((state) => ({
        heroes: state.heroes.filter((h) => h.id !== id),
      }));
    } catch (err) {
      set({ error: err });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
