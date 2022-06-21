#addin nuget:?package=Cake.FileHelpers&version=5.0.0
#addin nuget:?package=Cake.Incubator&version=7.0.0
#addin nuget:?package=Microsoft.Extensions.DependencyInjection.Abstractions&version=2.1.1
#addin nuget:?package=Microsoft.Extensions.DependencyInjection&version=2.1.1
#addin nuget:?package=dotless.Core&version=1.6.7

var target = Argument("target", "Default");

Task("Debug")
    .Does(() =>
{
     var fileContent = "";
     fileContent = fileContent + FileReadText("../../Middleware/Drapo/node_modules/jquery/dist/jquery.min.js");
     fileContent = fileContent + "\n" + FileReadText("../../Middleware/Drapo/node_modules/es6-promise/dist/es6-promise.auto.min.js");
     fileContent = fileContent + "\n" + FileReadText("../../Middleware/Drapo/node_modules/@microsoft/signalr/dist/browser/signalr.min.js");
     IEnumerable<FilePath> files = GetFiles("../../Middleware/Drapo/js/*.js");
     foreach(FilePath file in files)
       fileContent = fileContent + "\n" + FileReadText(file);
     FileWriteText("../../Middleware/Drapo/lib/drapo.js", fileContent);
});

Task("Release")
    .Does(() =>
{
     var fileContent = "";
     fileContent = fileContent + FileReadText("../../Middleware/Drapo/node_modules/jquery/dist/jquery.min.js");
     fileContent = fileContent + "\n" + FileReadText("../../Middleware/Drapo/node_modules/es6-promise/dist/es6-promise.auto.min.js");
     fileContent = fileContent + "\n" + FileReadText("../../Middleware/Drapo/node_modules/@microsoft/signalr/dist/browser/signalr.min.js");
     IEnumerable<FilePath> files = GetFiles("../../Middleware/Drapo/js/*.js");
     foreach(FilePath file in files)
       fileContent = fileContent + "\n" + FileReadText(file);
     //TODO: Uglify fileContent here
     FileWriteText("../../Middleware/Drapo/lib/drapo.min.js", fileContent);
});

Task("Type")
    .Does(() =>
{
});

Task("Lint")
.Does(() => {
    StartProcess("powershell", new ProcessSettings{ Arguments = "npm run lint" });
});

Task("BootstrapCSS")
    .Does(() =>
{
    var fileContent = FileReadText("./node_modules/bootstrap/dist/css/bootstrap.min.css");
    FileWriteText("./wwwroot/css/bootstrap.min.css", fileContent);
});

Task("BootstrapJS")
    .Does(() =>
{
    var fileContent = FileReadText("./node_modules/bootstrap/dist/js/bootstrap.min.js");
    FileWriteText("./wwwroot/js/bootstrap.min.js", fileContent);
});

Task("BootstrapFonts")
    .Does(() =>
{
     IEnumerable<FilePath> files = GetFiles("./node_modules/bootstrap/dist/fonts/*.*");
     CopyFiles(files, "./wwwroot/fonts/");
});

Task("CopyToOutput")
    .IsDependentOn("BootstrapCSS")
    .IsDependentOn("BootstrapJS")
    .IsDependentOn("BootstrapFonts")
    .Does(() =>
{
});

Task("Default")
    .IsDependentOn("CopyToOutput")
    .IsDependentOn("Lint")
    .IsDependentOn("Release")
    .IsDependentOn("Debug")
    .IsDependentOn("Type");

RunTarget(target);