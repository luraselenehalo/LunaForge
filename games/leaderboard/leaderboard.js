import { getData, updateData } from "../../core/storage.js";

const MAX_SCORES = 5;

export const getLeaderboard = (gameId) => {
  const data = getData();
  return data.leaderboards[gameId] || [];
};

export const saveScore = (gameId, score) => {
  return updateData((data) => {
    const current = data.leaderboards[gameId] || [];
    const next = [...current, { score, date: new Date().toISOString() }]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_SCORES);
    data.leaderboards[gameId] = next;
    return data;
  });
};

export const clearLeaderboard = (gameId) => {
  return updateData((data) => {
    data.leaderboards[gameId] = [];
    return data;
  });
};
