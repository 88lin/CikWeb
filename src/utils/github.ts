/*
 * @Description: GitHub API 工具函数
 * @Author: Cik
 * @Date: 2026-02-27
 */

/**
 * 获取 GitHub 用户信息
 * @param username GitHub 用户名
 * @returns 用户信息
 */
export async function fetchGitHubUser(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub user')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching GitHub user:', error)
    return null
  }
}

/**
 * 获取 GitHub 仓库信息
 * @param owner 仓库所有者
 * @param repo 仓库名称
 * @returns 仓库信息
 */
export async function fetchGitHubRepo(owner: string, repo: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repo')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching GitHub repo:', error)
    return null
  }
}

/**
 * 获取用户的 GitHub 仓库列表
 * @param username GitHub 用户名
 * @param limit 限制数量
 * @returns 仓库列表
 */
export async function fetchGitHubRepos(username: string, limit = 10) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}
