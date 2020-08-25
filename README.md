# Introduction 
Drapo is a spa framework. Spa Drapo

[Live Demo](http://drapo.azurewebsites.net/)

Build ![alt text](https://powerplanning.visualstudio.com/_apis/public/build/definitions/9a8d97bc-da81-44f5-9988-e2a03c19cdcf/2/badge "build badge")

# Getting Started
1.	Pre-requisites

    nodejs and npm
    https://nodejs.org/en/

    Typescript
    npm install -g typescript

2.	API references

## Composition 

| Name | Description |
|------|:-------------|
| d-parent | Defines the default parent for this partial page |
| d-parentSector | Defines the default sector of the parent that this child must fit |
| d-child | Defines the default child for a sector |
| d-childSector | Defines a default child sector |

## Data
| Name | Description |
|------|:-------------|
| d-dataKey | Defines the data key |
| d-dataUrl | Defines the url of the data |

## Flow Control

| Name | Description |
|------|:-------------|
| [d-for](doc/dfor.md) | for |
| d-if | if |

# Testing

## Structure

- **Pages Folder:** contains the respective pages from DrapoPages, with the expected evaluated HTML

- **ReleaseTest Class:** initializes the WebDriver used to navigate through pages, defines all Test Cases and validation methods

- **Test.runsettings File:** keeps all settings used at runtime, including the URL for a published WebDrapo

## Usage

For each page added to DrapoPages, a Test Case must be created following these steps:

1. Run without debugging WebDrapo and check if the portal name and port match the URL in `Test.Debug.runsettings` file

2. Select the above file as Test Settings on Visual Studio Test Menu

3. Add a new HTML file at `Pages` folder with this naming format: _DrapoPageName_.Test.html and configure it to be a Embedded Resource

4. Create a method at `ReleaseTest.cs` named DrapoPageNameTest with `TestCase` attribute and a call to `ValidatePage` passing _DrapoPageName_

5. Run in debug the created test and after `Driver` navigation, copy the content of `PageSource` and paste it to the added HTML file without formatting

6. Save the file, run the test again and confirm it passes






