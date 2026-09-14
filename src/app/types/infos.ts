export interface Infos {
  dgidIdName: string; 
  dutyName?: string | number;
  dutyInf?: string | number;   
}

export interface InfoApiResponse {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      items: { item: Infos[] | Infos };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}