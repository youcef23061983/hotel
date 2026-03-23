// hooks/useFetchWithRetry.js
import { useQuery } from "@tanstack/react-query";

const useFetchWithRetry = (url, key, options = {}) => {
  const {
    retry = 5, // Number of retries
    retryDelay = 2000, // Initial delay in ms
    enabled = true, // Whether to run the query
  } = options;

  const fetchWithRetry = async () => {
    let lastError;

    for (let attempt = 1; attempt <= retry; attempt++) {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          // If 404, it might mean order not ready yet
          if (res.status === 404 && attempt < retry) {
            throw new Error(`Order not ready (attempt ${attempt}/${retry})`);
          }
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        // Check if data exists and is valid
        if (!data || Object.keys(data).length === 0) {
          throw new Error("Empty response");
        }

        return data;
      } catch (error) {
        lastError = error;

        if (attempt < retry) {
          // Exponential backoff
          const delay = retryDelay * Math.pow(2, attempt - 1);
          console.log(`Retry ${attempt}/${retry} in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError;
  };

  const { data, error, isPending, refetch } = useQuery({
    queryKey: [key, url],
    queryFn: fetchWithRetry,
    enabled: enabled && !!url,
    retry: false, // We handle retry in fetchWithRetry
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  });

  return { data, error, isPending, refetch };
};

export default useFetchWithRetry;
