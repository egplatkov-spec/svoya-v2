# Builds the site and publishes dist/ to the gh-pages branch of origin.
$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")
npm run build
New-Item -ItemType File dist\.nojekyll -Force | Out-Null
$remote = git remote get-url origin
Push-Location dist
try {
  git init -q -b gh-pages
  git add -A
  git -c user.name="egplatkov-spec" -c user.email="354958687+egplatkov-spec@users.noreply.github.com" commit -q -m "Готовый сайт $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
  git push -q -f $remote gh-pages
} finally {
  Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
  Pop-Location
}
Write-Host "Выложено: https://egplatkov-spec.github.io/svoya-v2/"
