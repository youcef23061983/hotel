import { useQueries } from "@tanstack/react-query";
const UseFetchQueries = (url1, key1, url2, Key2) => {
  const Fn1 = async () => {
    const res = await fetch(url1);
    if (!res.ok) {
      throw Error("there is no first data");
    }
    return res.json();
  };
  const Fn2 = async () => {
    const res = await fetch(url2);
    if (!res.ok) {
      throw Error("there is no second data");
    }
    return res.json();
  };
  const results = useQueries({
    queries: [
      {
        queryKey: [key1],
        queryFn: Fn1,
      },
      {
        queryKey: [Key2],
        queryFn: Fn2,
      },
    ],
  });
  return {
    data1: results[0].data,
    isPending1: results[0].isLoading,
    error1: results[0].error,
    data2: results[1].data,
    isPending2: results[1].isLoading,
    error2: results[1].error,
  };
};

export default UseFetchQueries;
