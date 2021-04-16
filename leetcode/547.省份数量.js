/*
 * @lc app=leetcode.cn id=547 lang=javascript
 *
 * [547] 省份数量
 */

// @lc code=start
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
  let ans = 0;

  if (!isConnected || isConnected.length === 0) return ans;

  const N = isConnected.length;
  const visited = new Array(N).fill(false);

  const dfs = (isConnected, visited, start) => {
    for (let i = 0; i < N; i++) {
      if (isConnected[start][i] === 1 && !visited[i]) {
        visited[i] = true;
        dfs(isConnected, visited, i);
      }
    }
  };

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      ans++;
      dfs(isConnected, visited, i);
    }
  }

  return ans;
};
// @lc code=end
