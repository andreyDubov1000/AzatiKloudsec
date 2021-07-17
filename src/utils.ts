export const useQuery = (searchString: string) => {
  return new URLSearchParams(searchString);
};
