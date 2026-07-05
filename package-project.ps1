$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$archiveName = 'StudentHubAI_Source.zip'
$archivePath = Join-Path $projectRoot $archiveName
$stagingRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("StudentHubAI_Source_Stage_" + [System.Guid]::NewGuid().ToString('N'))

function Get-RelativePath {
    param(
        [string]$BasePath,
        [string]$TargetPath
    )

    $baseFull = [System.IO.Path]::GetFullPath($BasePath)
    $targetFull = [System.IO.Path]::GetFullPath($TargetPath)

    $baseSegments = $baseFull.TrimEnd('\', '/').Split([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar)
    $targetSegments = $targetFull.TrimEnd('\', '/').Split([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar)

    $commonLength = [Math]::Min($baseSegments.Length, $targetSegments.Length)
    $commonIndex = 0

    while ($commonIndex -lt $commonLength -and $baseSegments[$commonIndex] -eq $targetSegments[$commonIndex]) {
        $commonIndex++
    }

    $relativeSegments = @()

    for ($i = $commonIndex; $i -lt $baseSegments.Length; $i++) {
        $relativeSegments += '..'
    }

    for ($i = $commonIndex; $i -lt $targetSegments.Length; $i++) {
        $relativeSegments += $targetSegments[$i]
    }

    return ($relativeSegments -join [System.IO.Path]::DirectorySeparatorChar)
}

function Test-IsExcludedItem {
    param(
        [System.IO.FileSystemInfo]$Item,
        [string]$RelativePath
    )

    $name = $Item.Name
    $segments = $RelativePath -split '[\\/]'

    foreach ($segment in $segments) {
        if ($segment -in @('node_modules', 'dist', '.git', '.vscode', 'coverage')) {
            return $true
        }
    }

    if ($name -like '*.log') {
        return $true
    }

    if ($name -like '.env*') {
        return $true
    }

    return $false
}

if (Test-Path $archivePath) {
    Remove-Item $archivePath -Force
}

if (Test-Path $stagingRoot) {
    Remove-Item $stagingRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $stagingRoot -Force | Out-Null

$items = Get-ChildItem -LiteralPath $projectRoot -Force
foreach ($item in $items) {
    if ($item.Name -eq [System.IO.Path]::GetFileName($stagingRoot)) {
        continue
    }

    $relativePath = Get-RelativePath -BasePath $projectRoot -TargetPath $item.FullName
    if (Test-IsExcludedItem -Item $item -RelativePath $relativePath) {
        continue
    }

    $targetPath = Join-Path $stagingRoot $relativePath

    if ($item.PSIsContainer) {
        New-Item -ItemType Directory -Path $targetPath -Force | Out-Null
    }
    else {
        $targetDirectory = Split-Path -Parent $targetPath
        if (-not (Test-Path $targetDirectory)) {
            New-Item -ItemType Directory -Path $targetDirectory -Force | Out-Null
        }
        Copy-Item -LiteralPath $item.FullName -Destination $targetPath -Force
    }
}

Compress-Archive -Path (Join-Path $stagingRoot '*') -DestinationPath $archivePath -Force

$sizeInBytes = (Get-Item $archivePath).Length
$sizeText = if ($sizeInBytes -ge 1MB) {
    '{0:N2} MB' -f ($sizeInBytes / 1MB)
}
else {
    '{0:N0} bytes' -f $sizeInBytes
}

Write-Host "Created $archiveName successfully ($sizeText)."

Remove-Item $stagingRoot -Recurse -Force
