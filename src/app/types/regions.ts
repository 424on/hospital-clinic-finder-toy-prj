export interface Regions {
  dutyAddr: string; 
  dutyName?: string | number;   
}

export interface RegionApiResponse {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      items: { item: Regions[] | Regions };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}