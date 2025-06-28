import { FetchMethod } from "@/data/fetch/methods";
import { API_ENDPOINTS } from "@/data/endpoints";
import type { ApiResponse, OverviewData } from "@/types";

export class FetchData {
  private method: FetchMethod;
  constructor() {
    this.method = new FetchMethod();
  }
  floormap = {
    overview: ({ exhibition, year }: { exhibition: string; year: string }) =>
      this.method
        .get<ApiResponse<OverviewData>>(
          `${API_ENDPOINTS.FP_OVERVIEW}/${exhibition}/${year}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch floormap overview data\n${err}`);
        }),
  };
}
