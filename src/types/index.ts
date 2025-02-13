export interface DecentroResponse<T> {
  decentroTxnId: string;
  status: string;
  responseCode: string;
  message: string;
  data: T;
  responseKey: string;
}
