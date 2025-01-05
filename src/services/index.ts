import { URLS } from "../constants/url";

export const api = {
  fetchProjects: async (): Promise<any> => {
    const response = await fetch(URLS.projectsInsights);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  },
};
