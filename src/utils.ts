import { v4 as uuidv4 } from "uuid";

export const useQuery = (searchString: string) => {
  return new URLSearchParams(searchString);
};

export const uuid = uuidv4;
