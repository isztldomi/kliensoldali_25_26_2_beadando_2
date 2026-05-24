const createEndpoint = (path: string) => `auth/${path}`;

export const authRoutes = {
  register: createEndpoint("register"),
  login: createEndpoint("login"),
  logout: createEndpoint("logout"),
  me: createEndpoint("me"),
};
