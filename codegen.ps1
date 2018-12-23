# The WarWithJoshAPIMessages.proto includes the google well knwon types in the proto imports
# the following should point to a location where the well known types are located
$wellKnownTypesPath = "D:\Proto"

$tsPluginPath = [IO.Path]::Combine($PSScriptRoot, "www", "node_modules", ".bin", "protoc-gen-ts.cmd")

$protoFile = Join-Path $PSScriptRoot "WarWithJoshAPIMessages.proto"
$tsOutDir = [IO.Path]::Combine($PSScriptRoot, "www", "src", "logic", "api")
$goOutDir = [IO.Path]::Combine($PSScriptRoot, "api", "web")

$wwwPath = Join-Path $PSScriptRoot "www"
$apiPath = Join-Path $PSScriptRoot "api"

# Dut to a limitation with proto-gen-ts plugin the current directory must be set to the node project root directory for the .d.ts file to be generated properly
Push-Location $wwwPath
& protoc -I $wellKnownTypesPath `
         -I $PSScriptRoot `
         --plugin="protoc-gen-ts=$tsPluginPath" `
         --js_out=import_style=es6,binary:$tsOutDir `
         --ts_out="$tsOutDir" `
         $protoFile
Pop-Location

& protoc -I $wellKnownTypesPath `
         -I $PSScriptRoot `
         --go_out=$goOutDir `
         $protoFile