# Quickstart: Round function

Validation guide to prove `Round` works end-to-end. Implementation details live in
`tasks.md`; the behavioral reference is in `contracts/round-function.md`.

## Prerequisites

- Node deps installed: `cd src/Middleware/Drapo && npm install`
- .NET SDK per `global.json`

## Build & lint

```powershell
cd src/Middleware/Drapo ; npx tslint --project tsconfig/production/   # zero errors
cd ../../.. ; dotnet build src/Drapo.sln                              # compiles (rebuilds drapo.js)
```

## Manual smoke test

Add to any DrapoPage and load it:

```html
<div d-datakey="n" d-datatype="object" d-dataproperty-v="2.567"></div>
<span d-model="Round({{n.v}})"></span>            <!-- 3   -->
<span d-model="Round({{n.v}}, 2)"></span>         <!-- 2.57 -->
<span d-model="Round({{n.v}}, 0, floor)"></span>  <!-- 2   -->
<span d-model="Round({{n.v}}, 0, ceiling)"></span><!-- 3   -->
```

## Automated test

1. Feature page: `src/Web/WebDrapo/wwwroot/DrapoPages/Round.html` exercising every case in
   `contracts/round-function.md` (all modes, digits, negatives, midpoints, `Cast` and
   `UpdateItemField` composition).
2. Expected snapshot: `src/Test/WebDrapo.Test/Pages/Round.Test.html` (Embedded Resource),
   captured from the real rendered DOM after `drapo._isLoaded`.
3. Test method `RoundTest()` in `src/Test/WebDrapo.Test/ReleaseTest.cs` calling
   `ValidatePage("Round")`.

Run the suite against a running WebDrapo:

```powershell
dotnet test src/Test/WebDrapo.Test --settings src/Test/WebDrapo.Test/Test.Debug.runsettings
```

**Expected**: `RoundTest` passes and the full suite stays green.

## Docs validation (separate `spadrapo/docs` repo)

- New folder `src/WebDocs/wwwroot/app/functions/Round/` with `description.html`,
  `parameters.json`, and `samples/001/`.
- Run WebDocs locally; confirm `Round` appears under Functions with a working sample.
