export interface IReservation {
  id?: number;
  first_name: string;
  last_name: string;
  date: Date | string;
  email: string;
  document_type: string;
  document_number: number | null;
  type_reservation: string;
  number_people: number | null;
  description: string;
  status: boolean;
}
