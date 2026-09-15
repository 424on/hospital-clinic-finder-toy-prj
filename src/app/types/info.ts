export interface Info {
  dgidIdName: string; 
  dutyName?: string | number;
  dutyInf?: string | number;   
}

export interface InfoApiResponse {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      items: { item: Info[] | Info };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}