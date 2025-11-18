// Define the interface for the data we expect from the API
export interface TodoApiResponse {
  items: { id: number; content: string; }[];
  hasMore: boolean;
}
