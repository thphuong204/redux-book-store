import api from "../apiService";

export  const fetchData = async (pageNum,limit,query) => {
    
      let url = `/books?_page=${pageNum}&_limit=${limit}`;
      if (query) url += `&q=${query}`;
      const res = await api.get(url);
      return res;
  };