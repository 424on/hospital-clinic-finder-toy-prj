export interface Region {
  dutyName: string;      
  dutyAddr: string;      
  dutyTel1: string;      
  dutyDivNam?: string | number;   
  dutyTime1s?: string | number; 
  dutyTime1c?: string | number; 
  dutyTime2s?: string | number;
  dutyTime2c?: string | number;
  dutyTime3s?: string | number;
  dutyTime3c?: string | number;
  dutyTime4s?: string | number;
  dutyTime4c?: string | number;
  dutyTime5s?: string | number;
  dutyTime5c?: string | number;
  dutyTime6s?: string | number;
  dutyTime6c?: string | number;
  dutyTime7s?: string | number;
  dutyTime7c?: string | number;
  dutyTime8s?: string | number; 
  dutyTime8c?: string | number; 
}

export interface RegionApiResponse {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      items: { item: Region[] | Region };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}