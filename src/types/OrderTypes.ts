export interface OrderData {
  date: string;
  dealer_id: string;
  start_at: string;
  end_at: string;
  master_id: string;
  client_name: string;
  client_phone: string;
  services: string[];
  car_mark?: string;
  car_mileage?: string;
  car_model?: string;
  car_number?: string;
  car_year?: string;
  comment?: string;
}
