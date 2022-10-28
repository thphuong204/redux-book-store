import api from "../apiService";

export  const fetchData = async (pageNum,limit,query) => {
    
      let url = `/books?_page=${pageNum}&_limit=${limit}`;
      if (query) url += `&q=${query}`;
      const res = await api.get(url);
      return res;
  };

export const addFavorite = async (addingBook) => {
    const res = await api.post(`/favorites`, addingBook);
    return res;
};

export const fetchFavorite = async () => {
      const res = await api.get(`/favorites`);
      return res;
  };

