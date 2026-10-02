import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Helper to commit and update files directly on GitHub via REST API
async function updateGitHubFile(filePath: string, contentStr: string, token: string, commitMsg: string) {
  const repo = process.env.GITHUB_REPO || 'darshu1808/darshportfolio'
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`

  // 1. Get current file sha if it exists
  const getRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Admin'
    }
  })

  let sha: string | undefined = undefined
  if (getRes.ok) {
    const data = await getRes.json()
    sha = data.sha
  }

  // 2. Put file update
  const contentBase64 = Buffer.from(contentStr).toString('base64')
  const putRes = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Admin',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: commitMsg,
      content: contentBase64,
      sha
    })
  })

  if (!putRes.ok) {
    const errData = await putRes.json()
    throw new Error(errData.message || 'GitHub API commit failed')
  }
}

export async function POST(request: Request) {
  try {
    const { content, pushToGit } = await request.json()

    if (!content) {
      return NextResponse.json({ error: 'No content provided' }, { status: 400 })
    }

    const formattedJson = JSON.stringify(content, null, 2)
    const isVercel = process.env.VERCEL === '1'
    const githubToken = process.env.GITHUB_TOKEN

    // ==========================================
    // CASE 1: Running on Vercel (Production)
    // ==========================================
    if (isVercel) {
      if (!githubToken) {
        return NextResponse.json({
          success: true,
          message: 'Saved to your browser cache! To enable 1-click publishing directly from the live Vercel URL, add a GITHUB_TOKEN in your Vercel Environment Variables. Alternatively, make edits on your local PC and click "Save & Push to GitHub".',
          gitWarning: true
        })
      }

      const commitMsg = `Update portfolio content via Vercel Admin [${new Date().toISOString().replace('T', ' ').slice(0, 19)}]`
      await updateGitHubFile('src/data/content.json', formattedJson, githubToken, commitMsg)
      await updateGitHubFile('public/data/content.json', formattedJson, githubToken, commitMsg)

      return NextResponse.json({
        success: true,
        message: 'Changes committed directly to GitHub! Vercel is now automatically rebuilding and deploying your updated live site.'
      })
    }

    // ==========================================
    // CASE 2: Running Locally on your PC
    // ==========================================
    // 1. Direct file write to src/data/content.json
    const srcPath = path.join(process.cwd(), 'src', 'data', 'content.json')
    await fs.writeFile(srcPath, formattedJson, 'utf-8')

    // 2. Direct file write to public/data/content.json
    const publicDir = path.join(process.cwd(), 'public', 'data')
    await fs.mkdir(publicDir, { recursive: true })
    const publicPath = path.join(publicDir, 'content.json')
    await fs.writeFile(publicPath, formattedJson, 'utf-8')

    let gitMessage = ''

    // 3. Optional Git Push directly from local admin panel
    if (pushToGit) {
      try {
        const commitMsg = `Update portfolio content via Admin [${new Date().toISOString().replace('T', ' ').slice(0, 19)}]`
        await execAsync(`git add src/data/content.json public/data/content.json`)
        await execAsync(`git commit -m "${commitMsg}"`)
        await execAsync(`git push origin main`)
        gitMessage = ' and pushed to GitHub! Vercel will deploy the update shortly.'
      } catch (gitErr: any) {
        console.error('Git push failed:', gitErr)
        return NextResponse.json({
          success: true,
          message: `Saved to content.json! (Git notice: ${gitErr?.message || 'Push via push-to-github.bat'})`,
          gitWarning: true
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Content saved to content.json${gitMessage}`
    })
  } catch (error: any) {
    console.error('Error saving content:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to save content' },
      { status: 500 }
    )
  }
}
