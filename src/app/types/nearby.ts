export interface Nearby {
  dutyAddr: string; 
  dutyName?: string | number;  
  distance?: string | number; 
}

export interface NearbyApiResponse {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      items: { item: Nearby[] | Nearby };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}