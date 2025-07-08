import { FetchMethod } from "@/data/fetch/methods";
import { API_ENDPOINTS } from "@/data/endpoints";
import type {
  ApiResponse,
  BoothPos,
  Elem,
  FloormapParams,
  OverviewData,
  Realsize,
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
    elems: ({ exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<Elem[]>>(
          `${API_ENDPOINTS.FP_ELEMS}/${exhibition}/${year}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch floormap elements data\n${err}`);
        }),
    boothPos: ({ exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<BoothPos[]>>(
          `${API_ENDPOINTS.FP_BOOTH_POS}/${exhibition}/${year}`
        )
        .catch((err) => {
          throw new Error(
            `Failed to fetch floormap booth position data\n${err}`
          );
        }),
    realsize: ({ exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<Realsize[]>>(
          `${API_ENDPOINTS.FP_REALSIZE}/${exhibition}/${year}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch floormap real size data\n${err}`);
        }),
  };
}
