import { useQuery } from "@tanstack/react-query";

const UseFetch = (url, key) => {
  const productFun = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw Error("There is no product data");
    }
    return res.json();
  };
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: () => productFun(),
  });
  return { data, error, isPending };
};

export default UseFetch;
