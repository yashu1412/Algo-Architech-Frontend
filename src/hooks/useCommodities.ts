import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useCommodities(interval: string) {
  return useQuery({
    queryKey: ["commodities", interval],
    queryFn: async () => {
      const { data } = await api.get("/commodities", {
        params: { interval },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
