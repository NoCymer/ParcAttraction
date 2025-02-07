export interface ReviewInterface {
  id: number | null,
  attraction_id: number,
  name: string | null,
  surname: string | null, 
  rating: number,
  comment: string | null
}