const mapping: Record<string, string> = {
  candidates: 'candidate',
  companies: 'company',
  feedbacks: 'feedback',
  interviews: 'interview',
  projects: 'project',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
