import api from "../apiService";

export  const fetchData = async (pageNum,limit,query) => {
    
      let url = `/boks?_page=${pageNum}&_limit=${limit}`;
      if (query) url += `&q=${query}`;
      const res = await api.get(url);
      return res;
  };