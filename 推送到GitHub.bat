@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo   英语萌宠乐园 · 一键推送到 GitHub
echo ============================================
echo.
echo 先确认：你已在 GitHub 网页上建好一个 Public 空仓库
echo （右上角 + → New repository → 名字随意 → Public → 不要勾 README）
echo.
set /p USERNAME=GitHub 用户名:
set /p REPONAME=仓库名（如 ket-park）:
echo.
echo 需要 Personal Access Token（不是密码）：
echo   GitHub 网页 → 右上角头像 → Settings
echo   → Developer settings → Personal access tokens → Tokens (classic)
echo   → Generate new token (classic) → 勾选 repo → 生成 → 复制
echo.
set /p TOKEN=粘贴 Token（ghp_ 开头）:

echo.
echo [1/4] 配置仓库地址...
git remote remove origin >nul 2>&1
git remote add origin https://%TOKEN%@github.com/%USERNAME%/%REPONAME%.git

echo [2/4] 提交文件...
git add -A
git commit -m "update ket-park" -q 2>nul || echo （没有新改动）

echo [3/4] 推送（文件较大，请耐心等待）...
git branch -M main
git push -u origin main

echo.
echo [4/4] 开启 Pages：
echo   打开 https://github.com/%USERNAME%/%REPONAME%/settings/pages
echo   Source 选 Deploy from a branch，Branch 选 main，文件夹选 / (root)，点 Save
echo   等 2-3 分钟，链接就是：
echo   https://%USERNAME%.github.io/%REPONAME%/
echo.
pause
