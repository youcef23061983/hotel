import { useQueries, useQueryClient } from "@tanstack/react-query";

const DetailUseFetchQueries = (url1, key1, id) => {
  const queryClient = useQueryClient();

  const Fn1 = async () => {
    const res = await fetch(url1);
    if (!res.ok) {
      throw Error("there is no first data");
    }
    return res.json();
  };
  const Fn2 = async () => {
    const res = await fetch(`${url1}/${id}`);
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
        queryKey: [key1, id],
        queryFn: Fn2,
        initialData: () => {
          const data = queryClient.getQueryData([key1]);

          return data ? data.find((d) => d.id === parseInt(id)) : undefined;
        },
        // The enabled: !!id ensures that the query only runs if id is defined. This is a good practice to avoid unnecessary fetches.
        enabled: !!id,
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

export default DetailUseFetchQueries;
