import { FetchMethod } from "@/data/fetch/methods";
import { API_ENDPOINTS } from "@/data/endpoints";
import type {
  ApiResponse,
  Elem,
  Exhibitor,
  ExpoEvent,
  FloormapParams,
  Realsize,
  SoldBooth,
} from "@/types";

export class FetchData {
  private method: FetchMethod;
  constructor() {
    this.method = new FetchMethod();
  }
  floormap = {
    realsize: ({ lang, exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<Realsize[]>>(
          `${API_ENDPOINTS.FP_REALSIZE}/${exhibition}/${year}?lang=${lang}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch floormap real size data\n${err}`);
        }),
    elems: ({ lang, exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<Elem[]>>(
          `${API_ENDPOINTS.FP_ELEMS}/${exhibition}/${year}?lang=${lang}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch floormap elements data\n${err}`);
        }),
    soldBooths: ({ lang, exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<SoldBooth[]>>(
          `${API_ENDPOINTS.FP_SOLD_BOOTHS}/${exhibition}/${year}?lang=${lang}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch sold booths data\n${err}`);
        }),
    exhibitors: ({ lang, exhibition, year }: FloormapParams) =>
      this.method
        .get<ApiResponse<Exhibitor[]>>(
          `${API_ENDPOINTS.FP_EXHIBITORS}/${exhibition}/${year}?lang=${lang}`
        )
        .catch((err) => {
          throw new Error(`Failed to fetch exhibitors data\n${err}`);
        }),
    events: ({
      lang,
      exhibition,
      year,
      id,
    }: FloormapParams & { id: SoldBooth["id"] }) =>
      this.method.get<ApiResponse<ExpoEvent[]>>(
        `${API_ENDPOINTS.FP_EVENTS}/${exhibition}/${year}?lang=${lang}&id=${id}`
      ),
  };
}
