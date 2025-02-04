const Services = {
  refresh: "auth/refresh/",

  login: "auth/login/",
  logout: "auth/logout/",

  getGames: "api/football-games/",
  updateScore: "api/update-score/",
} as const;

export default Services;
