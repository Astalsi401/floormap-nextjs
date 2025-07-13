import { FetchMethod } from "@/data/fetch/methods";
import { API_ENDPOINTS } from "@/data/endpoints";
import type {
  ApiResponse,
  Area,
  Elem,
  FloormapParams,
  OverviewData,
  Realsize,
  SoldBooth,
} from "@/types";

export class FetchData {
  private method: FetchMethod;
  constructor() {
    this.method = new FetchMethod();
  }
  floormap = {
    overview: ({ exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<OverviewData[]>>(
          `${API_ENDPOINTS.FP_OVERVIEW}/${exhibition}/${year}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch floormap overview data\n${err}`);
        }),
    realsize: ({ exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<Realsize[]>>(
          `${API_ENDPOINTS.FP_REALSIZE}/${exhibition}/${year}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch floormap real size data\n${err}`);
        }),
    elems: ({ exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<Elem[]>>(
          `${API_ENDPOINTS.FP_ELEMS}/${exhibition}/${year}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch floormap elements data\n${err}`);
        }),
    soldBooths: ({ exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<SoldBooth[]>>(
          `${API_ENDPOINTS.FP_SOLD_BOOTHS}/${exhibition}/${year}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch sold booths data\n${err}`);
        }),
    areas: ({ exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<Area[]>>(
          `${API_ENDPOINTS.FP_AREAS}/${exhibition}/${year}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch areas data\n${err}`);
        }),
  };
}
