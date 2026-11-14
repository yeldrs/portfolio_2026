# scripts/agent.ps1
# Usage: .\scripts\agent.ps1 opencode <tache> [--prompt '<texte>'] [-Continue] [-Install] [-Force]
param(
    [Parameter(Mandatory = $true, Position = 0)][ValidateSet('opencode')][string]$Tool,
    [Parameter(Position = 1)][string]$Task,
    [switch]$Continue,
    [switch]$Install,
    [switch]$Force,
    [Parameter(ValueFromRemainingArguments = $true)][string[]]$Rest
)

$ErrorActionPreference = 'Stop'

$PromptText = $null
for ($i = 0; $i -lt $Rest.Count; $i++) {
    if ($Rest[$i] -eq '--prompt' -and $i + 1 -lt $Rest.Count) { $PromptText = $Rest[$i + 1]; $i++ }
    else { throw "Argument inconnu: $($Rest[$i])" }
}

$root = (git rev-parse --show-toplevel).Trim()
Set-Location $root

if (-not $Task) { $Task = 'tache-' + (Get-Date -Format 'yyyyMMdd-HHmm') }
$Task = ($Task.ToLower() -replace '[^a-z0-9-]', '-').Trim('-')
if (-not $Task) { throw 'Nom de tache invalide.' }

$branch = "agent/$Tool-$Task"
$wtRel = ".worktrees/$Tool-$Task"
$wtPath = Join-Path $root $wtRel

if (-not (Test-Path $wtPath)) {
    $current = (git branch --show-current).Trim()
    if (-not $current) { throw 'HEAD detache: place-toi sur une branche avant de lancer.' }
    if ($current -like 'agent/*') { throw "Tu es deja sur $current. Lance depuis la branche du principal." }

    $dirty = git status --porcelain --untracked-files=no
    if ($dirty -and -not $Force) {
        Write-Host $dirty
        throw 'Changements non commites sur la branche courante: le worktree partirait du dernier commit sans eux. Commite, ou relance avec -Force.'
    }

    git show-ref --verify --quiet "refs/heads/$branch"
    if ($LASTEXITCODE -eq 0) {
        git worktree add $wtRel $branch
    } else {
        git worktree add -b $branch $wtRel $current
    }
    if ($LASTEXITCODE -ne 0) { throw 'Creation du worktree impossible.' }
    Write-Host "Worktree cree: $wtRel (branche $branch, base $current)"
} else {
    Write-Host "Worktree retrouve: $wtRel"
}

Push-Location $wtPath
try {
    if ($Install -and -not (Test-Path 'node_modules')) { npm ci }
    elseif (-not (Test-Path 'node_modules')) { Write-Host 'node_modules absent: relance avec -Install avant build/check.' }

    $toolArgs = @()
    if ($Continue) { $toolArgs += '--continue' }
    if ($PromptText) { $toolArgs += '--prompt'; $toolArgs += ($PromptText -replace '"', '\"') }
    & $Tool @toolArgs
} finally {
    Pop-Location
}
