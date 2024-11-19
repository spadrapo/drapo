using System.IO;
using System.Reflection;
using OpenQA.Selenium.Chrome;
using NUnit.Framework;
using System.Text.RegularExpressions;
using OpenQA.Selenium;
using System.Text;
using System.Collections.Generic;

namespace WebDrapo.Test
{
    [TestFixture]
    public class ReleaseTest
    {
        #region Setup
        private string VirtualDirectory { get; set; }
        private ChromeDriver Driver { get; set; }

        [OneTimeSetUp]
        public void Setup()
        {
            //HACK: Config is not loading anymore. Its only my machine ?
            VirtualDirectory = TestContext.Parameters["WebDrapoURL"] ?? "http://localhost:9991/";
            ChromeOptions options = new ChromeOptions();
            //Configure location for x64 or x86
            List<string> locations = new List<string>()
            {
                @"C:\Program Files\Google\Chrome\Application\chrome.exe",
                @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
            };
            foreach (string location in locations) {
                if (!System.IO.File.Exists(location))
                    continue;
                options.BinaryLocation = location;
                break;
            }
            options.AddArgument("--no-sandbox");
            Driver = new ChromeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), options);
        }


        [OneTimeTearDown]
        public void CloseBrowser()
        {
            Driver.Dispose();
        }

        private void ValidatePage(string pageName)
        {
            // Expected
            string htmlExpected = string.Empty;
            using (StreamReader reader = new StreamReader(Assembly.GetExecutingAssembly().GetManifestResourceStream(GetResourceName(pageName)), Encoding.UTF8))
            {
                htmlExpected = reader.ReadToEnd();
            }
            // Evaluated
            Driver.Navigate().GoToUrl(string.Format("{0}DrapoPages/{1}.html", VirtualDirectory, pageName));
            IJavaScriptExecutor js = (IJavaScriptExecutor)Driver;
            int retrys = 20; // Nothing can take more than 2s (20 x 100)
            for (int i = 0; i < retrys; i++)
            {
                bool result = (bool)js.ExecuteScript("return(drapo._isLoaded);");
                if (result)
                    break;
                System.Threading.Thread.Sleep(100);
            }
            //Unit Test Click
            var elClickUnitTest = Driver.FindElementsByXPath("//input[@driverunittest='click']");
            if ((elClickUnitTest != null) && (elClickUnitTest.Count > 0))
            {
                foreach (IWebElement el in elClickUnitTest)
                    if(el.Displayed) el.Click();
                System.Threading.Thread.Sleep(5000);
            }
            if (pageName.Contains("Async"))
                System.Threading.Thread.Sleep(500);
            string htmlEvaluated = Driver.PageSource;
            // Components can have full url file source, we remove it before comparison
            string urlPattern = @"\w+:\/\/[\w@][\w.:@]+\/?[\w\.?=%&=\-@/$,]*";
            foreach (Match match in Regex.Matches(htmlEvaluated, @"<script[^>]*>[\s\S]*?</script>|<link [\s\S]*?/>"))
                if (Regex.IsMatch(match.Value, urlPattern))
                    htmlEvaluated = htmlEvaluated.Replace(match.Value, Regex.Replace(match.Value, urlPattern, string.Empty));
            //Dynamic Sectors
            foreach (Match match in Regex.Matches(htmlEvaluated, @"d-sector=""(\d|\w|\-)+"""))
                htmlEvaluated = htmlEvaluated.Replace(match.Value, @"d-sector=""@""");
            // Src attribute
            string htmlExpectedCleanAttributeSrc = CleanSource(htmlExpected);
            string htmlEvaluatedCleanAttributeSrc = CleanSource(htmlEvaluated);
            //Clean
            string htmlExpectedClean = CleanHtml(htmlExpectedCleanAttributeSrc);
            string htmlEvaluatedClean = CleanHtml(htmlEvaluatedCleanAttributeSrc);
            Assert.AreEqual(htmlExpectedClean, htmlEvaluatedClean, "Evaluated: {0}", htmlEvaluatedClean);
        }

        private string GetResourceName(string pageName)
        {
            return string.Format("WebDrapo.Test.Pages.{0}.Test.html", pageName);
        }

        private string CleanSource(string html)
        {
            foreach (Match match in Regex.Matches(html, @"src=\""(\w|\s|\d|\:|\?|\&|\.|\/|\=|\%|\;)+\"""))
                html = html.Replace(match.Value, @"src=""""");
            html = html.Replace(@"<script src=""""></script>", string.Empty);
            html = html.Replace(@"<link href="""" rel=""stylesheet"" />", string.Empty);
            return (html);
        }

        private string CleanHtml(string html)
        {
            StringBuilder htmlClean = new StringBuilder(html.Length);
            bool isInsideTag = false;
            foreach (char chr in html)
            {
                if ((isInsideTag) || (IsValidChar(chr)))
                    htmlClean.Append(chr);
                if (chr == '>')
                    isInsideTag = false;
                else if (chr == '<')
                    isInsideTag = true;
            }
            return (htmlClean.ToString());
        }

        private bool IsValidChar(char chr)
        {
            if (chr == ' ')
                return (false);
            if (chr == '\r')
                return (false);
            if (chr == '\n')
                return (false);
            if (chr == '\t')
                return (false);
            return (true);
        }
        #endregion

        #region Tests
        [TestCase]
        public void ArithmeticTest()
        {
            ValidatePage("Arithmetic");
        }
        [TestCase]
        public void AttrExpressionTest()
        {
            ValidatePage("AttrExpression");
        }
        [TestCase]
        public void AttributeTest()
        {
            ValidatePage("Attribute");
        }
        [TestCase]
        public void AttributeFormatTest()
        {
            ValidatePage("AttributeFormat");
        }
        [TestCase]
        public void AttributeForMustacheTest()
        {
            ValidatePage("AttributeForMustache");
        }
        [TestCase]
        public void AttributeMinTest()
        {
            ValidatePage("AttributeMin");
        }
        [TestCase]
        public void AttributeMinContextTest()
        {
            ValidatePage("AttributeMinContext");
        }
        [TestCase]
        public void AttributeMustacheTest()
        {
            ValidatePage("AttributeMustache");
        }
        [TestCase]
        public void AttributeMustacheEmbeddedTest()
        {
            ValidatePage("AttributeMustacheEmbedded");
        }
        [TestCase]
        public void AuthenticationTest()
        {
            ValidatePage("Authentication");
        }
        [TestCase]
        public void BadRequestTest()
        {
            ValidatePage("BadRequest");
        }
        [TestCase]
        public void ClassTest()
        {
            ValidatePage("Class");
        }
        [TestCase]
        public void ClassComplexTest()
        {
            ValidatePage("ClassComplex");
        }
        [TestCase]
        public void ClassConditionalTest()
        {
            ValidatePage("ClassConditional");
        }
        [TestCase]
        public void ClassFalseTest()
        {
            ValidatePage("ClassFalse");
        }
        [TestCase]
        public void ClassForMustacheTest()
        {
            ValidatePage("ClassForMustache");
        }
        [TestCase]
        public void ClassMustacheOverwrittenTest()
        {
            ValidatePage("ClassMustacheOverwritten");
        }
        [TestCase]
        public void ClassForTest()
        {
            ValidatePage("ClassFor");
        }
        [TestCase]
        public void ClassMustacheTest()
        {
            ValidatePage("ClassMustache");
        }
        [TestCase]
        public void ClassObjectValidatorTest()
        {
            ValidatePage("ClassObjectValidator");
        }
        [TestCase]
        public void CloakTest()
        {
            ValidatePage("Cloak");
        }
        [TestCase]
        public void ComponentContentTest()
        {
            ValidatePage("ComponentContent");
        }
        [TestCase]
        public void ComponentContextRestoreAsyncTest()
        {
            ValidatePage("ComponentContextRestoreAsync");
        }
        [TestCase]
        public void ComponentCompositeAsyncTest()
        {
            ValidatePage("ComponentCompositeAsync");
        }
        [TestCase]
        public void ComponentDataValueTest()
        {
            ValidatePage("ComponentDataValue");
        }
        [TestCase]
        public void ComponentDataValueContextTest()
        {
            ValidatePage("ComponentDataValueContext");
        }
        [TestCase]
        public void ComponentForTest()
        {
            ValidatePage("ComponentFor");
        }
        [TestCase]
        public void ComponentLabelContextTest()
        {
            ValidatePage("ComponentLabelContext");
        }
        [TestCase]
        public void ComponentLabelContextForEmbeddedTest()
        {
            ValidatePage("ComponentLabelContextForEmbedded");
        }
        [TestCase]
        public void ComponentLabelContextIndexTest()
        {
            ValidatePage("ComponentLabelContextIndex");
        }
        [TestCase]
        public void ComponentLabelContextIndexIFTest()
        {
            ValidatePage("ComponentLabelContextIndexIF");
        }
        [TestCase]
        public void ComponentLabelContextInlineForTest()
        {
            ValidatePage("ComponentLabelContextInlineFor");
        }
        [TestCase]
        public void ComponentLabelContextIteratorTest()
        {
            ValidatePage("ComponentLabelContextIterator");
        }
        [TestCase]
        public void ComponentLabelContextSectorTest()
        {
            ValidatePage("ComponentLabelContextSector");
        }
        [TestCase]
        public void ComponentLabelInputTest()
        {
            ValidatePage("ComponentLabelInput");
        }
        //[TestCase]
        //public void ComponentLabelInputSubscribeTest()
        //{
        //    ValidatePage("ComponentLabelInputSubscribe");
        //}
        //[TestCase]
        //public void ComponentLabelInputSubscribeMustacheTest()
        //{
        //    ValidatePage("ComponentLabelInputSubscribeMustache");
        //}        
        [TestCase]
        public void ComponentLinkedCubeAddTest()
        {
            ValidatePage("ComponentLinkedCubeAdd");
        }
        [TestCase]
        public void ComponentLinkedCubeRemoveTest()
        {
            ValidatePage("ComponentLinkedCubeRemove");
        }
        [TestCase]
        public void ComponentMenuApplicationComponentTest()
        {
            ValidatePage("ComponentMenuApplicationComponent");
        }
        [TestCase]
        public void ComponentStateTest()
        {
            ValidatePage("ComponentState");
        }
        [TestCase]
        public void ComponentStylistTest()
        {
            ValidatePage("ComponentStylist");
        }
        [TestCase]
        public void ConditionalBooleanTest()
        {
            ValidatePage("ConditionalBoolean");
        }
        [TestCase]
        public void ConditionalCharactersTest()
        {
            ValidatePage("ConditionalCharacters");
        }
        [TestCase]
        public void ConditionalComplexTest()
        {
            ValidatePage("ConditionalComplex");
        }
        [TestCase]
        public void ConditionalSpaceTextTest()
        {
            ValidatePage("ConditionalSpaceText");
        }
        [TestCase]
        public void ConditionalTokenizerComparatorTest()
        {
            ValidatePage("ConditionalTokenizerComparator");
        }
        [TestCase]
        public void ConditionalTokenizerGUIDTest()
        {
            ValidatePage("ConditionalTokenizerGUID");
        }
        [TestCase]
        public void ConditionalTokenizerOperationTest()
        {
            ValidatePage("ConditionalTokenizerOperation");
        }
        [TestCase]
        public void ConditionalTokenizerOperationEqualsTest()
        {
            ValidatePage("ConditionalTokenizerOperationEquals");
        }
        [TestCase]
        public void ConditionalTokenizerTrimTest()
        {
            ValidatePage("ConditionalTokenizerTrim");
        }
        [TestCase]
        public void ContainerTest()
        {
            ValidatePage("Container");
        }
        [TestCase]
        public void ContainerContextTest()
        {
            ValidatePage("ContainerContext");
        }
        [TestCase]
        public void ContentTest()
        {
            ValidatePage("Content");
        }
        [TestCase]
        public void ContextMappingLayoutTest()
        {
            ValidatePage("ContextMappingLayout");
        }
        [TestCase]
        public void ControlFlowComponentsClassTest()
        {
            ValidatePage("ControlFlowComponentsClass");
        }
        [TestCase]
        public void ControlFlowForArrayTest()
        {
            ValidatePage("ControlFlowForArray");
        }
        [TestCase]
        public void ControlFlowForArrayNotifyTest()
        {
            ValidatePage("ControlFlowForArrayNotify");
        }
        [TestCase]
        public void ControlFlowForAttributeTest()
        {
            ValidatePage("ControlFlowForAttribute");
        }
        [TestCase]
        public void ControlFlowForAttributeExpressionTest()
        {
            ValidatePage("ControlFlowForAttributeExpression");
        }
        [TestCase]
        public void ControlFlowForComponentMultipleSourcesTest()
        {
            ValidatePage("ControlFlowForComponentMultipleSources");
        }
        [TestCase]
        public void ControlFlowForComponentMultipleSourcesCompositeTest()
        {
            ValidatePage("ControlFlowForComponentMultipleSourcesComposite");
        }
        [TestCase]
        public void ControlFlowForComponentMultipleSourcesCompositeRangeTest()
        {
            ValidatePage("ControlFlowForComponentMultipleSourcesCompositeRange");
        }
        [TestCase]
        public void ControlFlowForComponentMultipleSourcesRangeTest()
        {
            ValidatePage("ControlFlowForComponentMultipleSourcesRange");
        }
        [TestCase]
        public void ControlFlowForDataFieldTest()
        {
            ValidatePage("ControlFlowForDataField");
        }
        [TestCase]
        public void ControlFlowForDictionaryTest()
        {
            ValidatePage("ControlFlowForDictionary");
        }
        [TestCase]
        public void ControlFlowForEmbeddedConditionalTest()
        {
            ValidatePage("ControlFlowForEmbeddedConditional");
        }
        [TestCase]
        public void ControlFlowForIfTest()
        {
            ValidatePage("ControlFlowForIf");
        }
        [TestCase]
        public void ControlFlowForIfInternalTest()
        {
            ValidatePage("ControlFlowForIfInternal");
        }
        [TestCase]
        public void ControlFlowForIFIteratorTest()
        {
            ValidatePage("ControlFlowForIFIterator");
        }
        [TestCase]
        public void ControlFlowForJsonTest()
        {
            ValidatePage("ControlFlowForJson");
        }
        [TestCase]
        public void ControlFlowForModelExpressionTest()
        {
            ValidatePage("ControlFlowForModelExpression");
        }
        [TestCase]
        public void ControlFlowForMultipleSourcesTest()
        {
            ValidatePage("ControlFlowForMultipleSources");
        }
        [TestCase]
        public void ControlFlowForMustacheNestedTest()
        {
            ValidatePage("ControlFlowForMustacheNested");
        }
        [TestCase]
        public void ControlFlowForMustacheNestedDelayTest()
        {
            ValidatePage("ControlFlowForMustacheNestedDelay");
        }
        [TestCase]
        public void ControlFlowForObjectTest()
        {
            ValidatePage("ControlFlowForObject");
        }
        [TestCase]
        public void ControlFlowForRangeTest()
        {
            ValidatePage("ControlFlowForRange");
        }
        [TestCase]
        public void ControlFlowForRangeDescTest()
        {
            ValidatePage("ControlFlowForRangeDesc");
        }
        [TestCase]
        public void ControlFlowForRangeFirstTest()
        {
            ValidatePage("ControlFlowForRangeFirst");
        }
        [TestCase]
        public void ControlFlowForRangeLastTest()
        {
            ValidatePage("ControlFlowForRangeLast");
        }
        [TestCase]
        public void ControlFlowForRangeMiddleTest()
        {
            ValidatePage("ControlFlowForRangeMiddle");
        }
        [TestCase]
        public void ControlFlowForRangeMiddleDescTest()
        {
            ValidatePage("ControlFlowForRangeMiddleDesc");
        }
        [TestCase]
        public void ControlFlowForNestedTest()
        {
            ValidatePage("ControlFlowForNested");
        }
        [TestCase]
        public void ControlFlowForNestedArrayTest()
        {
            ValidatePage("ControlFlowForNestedArray");
        }
        [TestCase]
        public void ControlFlowForNestedConditionalTest()
        {
            ValidatePage("ControlFlowForNestedConditional");
        }
        [TestCase]
        public void ControlFlowForRecursiveTest()
        {
            ValidatePage("ControlFlowForRecursive");
        }
        [TestCase]
        public void ControlFlowForRecursiveComponentTest()
        {
            ValidatePage("ControlFlowForRecursiveComponent");
        }
        [TestCase]
        public void ControlFlowForRecursiveIFTest()
        {
            ValidatePage("ControlFlowForRecursiveIF");
        }
        [TestCase]
        public void ControlFlowForRecursiveIndexTest()
        {
            ValidatePage("ControlFlowForRecursiveIndex");
        }
        [TestCase]
        public void ControlFlowForRecursiveIndexRelativeTest()
        {
            ValidatePage("ControlFlowForRecursiveIndexRelative");
        }
        [TestCase]
        public void ControlFlowForRecursiveLevelTest()
        {
            ValidatePage("ControlFlowForRecursiveLevel");
        }
        [TestCase]
        public void ControlFlowForSelectTest()
        {
            ValidatePage("ControlFlowForSelect");
        }
        [TestCase]
        public void ControlFlowForSelectChainTest()
        {
            ValidatePage("ControlFlowForSelectChain");
        }
        [TestCase]
        public void ControlFlowForTemplateIfInternalTest()
        {
            ValidatePage("ControlFlowForTemplateIfInternal");
        }
        [TestCase]
        public void ControlFlowForTemplateIfInternalAttributeTest()
        {
            ValidatePage("ControlFlowForTemplateIfInternalAttribute");
        }
        [TestCase]
        public void ControlFlowForTemplateUsingParentKeyAttributeTest()
        {
            ValidatePage("ControlFlowForTemplateUsingParentKeyAttribute");
        }
        [TestCase]
        public void ControlFlowForTemplateIfInternalComplexTest()
        {
            ValidatePage("ControlFlowForTemplateIfInternalComplex");
        }
        [TestCase]
        public void ControlFlowForTemplateIfInternalNodesTest()
        {
            ValidatePage("ControlFlowForTemplateIfInternalNodes");
        }
        [TestCase]
        public void ControlFlowForUlTest()
        {
            ValidatePage("ControlFlowForUl");
        }
        [TestCase]
        public void ControlFlowForUlEmptyTest()
        {
            ValidatePage("ControlFlowForUlEmpty");
        }
        [TestCase]
        public void ControlFlowForUlNullableTest()
        {
            ValidatePage("ControlFlowForUlNullable");
        }
        //We need to enable this again in the future
        //[TestCase]
        //public void ControlFlowForViewportTest()
        //{
        //    ValidatePage("ControlFlowForViewport");
        //}
        //[TestCase]
        //public void ControlFlowForViewportHeightBeforeTest()
        //{
        //    ValidatePage("ControlFlowForViewportHeightBefore");
        //}
        //[TestCase]
        //public void ControlFlowForViewportNotifyTest()
        //{
        //    ValidatePage("ControlFlowForViewportNotify");
        //}
        [TestCase]
        public void ControlFlowIfSelectTest()
        {
            ValidatePage("ControlFlowIfSelect");
        }
        [TestCase]
        public void ControlFlowIfUlTest()
        {
            ValidatePage("ControlFlowIfUl");
        }
        [TestCase]
        public void ControlFlowModelArrayReferenceTest()
        {
            ValidatePage("ControlFlowModelArrayReference");
        }
        [TestCase]
        public void ControlFlowModelForMustacheNestedDelayTest()
        {
            ValidatePage("ControlFlowModelForMustacheNestedDelay");
        }
        [TestCase]
        public void ControlFlowModelInputCheckboxTest()
        {
            ValidatePage("ControlFlowModelInputCheckbox");
        }
        [TestCase]
        public void ControlFlowModelInputNumberTest()
        {
            ValidatePage("ControlFlowModelInputNumber");
        }
        [TestCase]
        public void ControlFlowModelInputPasswordTest()
        {
            ValidatePage("ControlFlowModelInputPassword");
        }
        [TestCase]
        public void ControlFlowModelInputRangeTest()
        {
            ValidatePage("ControlFlowModelInputRange");
        }
        [TestCase]
        public void ControlFlowModelInputRangeMaxTest()
        {
            ValidatePage("ControlFlowModelInputRangeMax");
        }
        [TestCase]
        public void ControlFlowModelInputTextTest()
        {
            ValidatePage("ControlFlowModelInputText");
        }
        [TestCase]
        public void ControlFlowModelNestedTest()
        {
            ValidatePage("ControlFlowModelNested");
        }
        [TestCase]
        public void ControlFlowModelSelectTest()
        {
            ValidatePage("ControlFlowModelSelect");
        }
        [TestCase]
        public void ControlFlowModelTextAreaTest()
        {
            ValidatePage("ControlFlowModelTextArea");
        }
        [TestCase]
        public void CultureTest()
        {
            ValidatePage("Culture");
        }
        [TestCase]
        public void DataAccessTest()
        {
            ValidatePage("DataAccess");
        }
        [TestCase]
        public void DataArrayFromObjectTest()
        {
            ValidatePage("DataArrayFromObject");
        }
        [TestCase]
        public void DataBadRequestTest()
        {
            ValidatePage("DataBadRequest");
        }
        [TestCase]
        public void DataChannelTest()
        {
            ValidatePage("DataChannel");
        }
        [TestCase]
        public void DataChannelMustacheTest()
        {
            ValidatePage("DataChannelMustache");
        }
        [TestCase]
        public void DataDelayLoadTest()
        {
            ValidatePage("DataDelayLoad");
        }
        [TestCase]
        public void DataFieldHeaderGetTest()
        {
            ValidatePage("DataFieldHeaderGet");
        }
        [TestCase]
        public void DataFileTest()
        {
            ValidatePage("DataFile");
        }
        [TestCase]
        public void DataFileUnicodeTest()
        {
            ValidatePage("DataFileUnicode");
        }
        [TestCase]
        public void DataFullLoadTest()
        {
            ValidatePage("DataFullLoad");
        }
        [TestCase]
        public void DataHasChangesTest()
        {
            ValidatePage("DataHasChanges");
        }
        [TestCase]
        public void DataHeaderGetTest()
        {
            ValidatePage("DataHeaderGet");
        }
        [TestCase]
        public void DataHeaderGetNullTest()
        {
            ValidatePage("DataHeaderGetNull");
        }
        [TestCase]
        public void DataHeaderSetTest()
        {
            ValidatePage("DataHeaderSet");
        }
        [TestCase]
        public void DataHeaderSetCharsetTest()
        {
            ValidatePage("DataHeaderSetCharset");
        }
        [TestCase]
        public void DataIncrementalLoadTest()
        {
            ValidatePage("DataIncrementalLoad");
        }
        [TestCase]
        public void DataIncrementalLoadLimitedTest()
        {
            ValidatePage("DataIncrementalLoadLimited");
        }
        [TestCase]
        public void DataIncrementalLoadTemplateLimitedTest()
        {
            ValidatePage("DataIncrementalLoadTemplateLimited");
        }
        [TestCase]
        public void DataLocalStorageNoCacheTest()
        {
            ValidatePage("DataLocalStorageNoCache");
        }
        [TestCase]
        public void DataMappingTest()
        {
            ValidatePage("DataMapping");
        }
        [TestCase]
        public void DataMappingFieldTest()
        {
            ValidatePage("DataMappingField");
        }
        [TestCase]
        public void DataMappingFieldEmptyTest()
        {
            ValidatePage("DataMappingFieldEmpty");
        }
        [TestCase]
        public void DataMappingFieldMustacheTest()
        {
            ValidatePage("DataMappingFieldMustache");
        }
        [TestCase]
        public void DataMappingFieldMustacheParameterTest()
        {
            ValidatePage("DataMappingFieldMustacheParameter");
        }
        [TestCase]
        public void DataMappingMustacheTest()
        {
            ValidatePage("DataMappingMustache");
        }
        [TestCase]
        public void DataMappingSubscribeTest()
        {
            ValidatePage("DataMappingSubscribe");
        }
        [TestCase]
        public void DataOnAfterLoadTest()
        {
            ValidatePage("DataOnAfterLoad");
        }
        [TestCase]
        public void DataParentTest()
        {
            ValidatePage("DataParent");
        }
        [TestCase]
        public void DataParentReferenceTest()
        {
            ValidatePage("DataParentReference");
        }
        [TestCase]
        public void DataParentSectorParentTest()
        {
            ValidatePage("DataParentSectorParent");
        }
        [TestCase]
        public void DataParentSectorSideTest()
        {
            ValidatePage("DataParentSectorSide");
        }
        [TestCase]
        public void DataPointerTest()
        {
            ValidatePage("DataPointer");
        }
        [TestCase]
        public void DataPointerNotifyTest()
        {
            ValidatePage("DataPointerNotify");
        }
        [TestCase]
        public void DataPostGetTest()
        {
            ValidatePage("DataPostGet");
        }
        [TestCase]
        public void DataPostGetMustacheTest()
        {
            ValidatePage("DataPostGetMustache");
        }
        [TestCase]
        public void DataQueryAggregationFunctionTest()
        {
            ValidatePage("DataQueryAggregationFunction");
        }
        [TestCase]
        public void DataQueryAggregationFunctionMaxTest()
        {
            ValidatePage("DataQueryAggregationFunctionMax");
        }
        [TestCase]
        public void DataQueryArrayTest()
        {
            ValidatePage("DataQueryArray");
        }
        [TestCase]
        public void DataQueryChainTest()
        {
            ValidatePage("DataQueryChain");
        }
        [TestCase]
        public void DataQueryCoalesceWithPropertiesTest()
        {
            ValidatePage("DataQueryCoalesceWithProperties");
        }
        [TestCase]
        public void DataQueryCoalesceWithMustacheTest()
        {
            ValidatePage("DataQueryCoalesceWithMustache");
        }
        [TestCase]
        public void DataQueryDuplicateTest()
        {
            ValidatePage("DataQueryDuplicate");
        }
        [TestCase]
        public void DataQueryEmptyTest()
        {
            ValidatePage("DataQueryEmpty");
        }
        [TestCase]
        public void DataQueryInnerJoinTest()
        {
            ValidatePage("DataQueryInnerJoin");
        }
        [TestCase]
        public void DataQueryInnerJoinMustacheTest()
        {
            ValidatePage("DataQueryInnerJoinMustache");
        }
        [TestCase]
        public void DataQueryLeftJoinTest()
        {
            ValidatePage("DataQueryLeftJoin");
        }
        [TestCase]
        public void DataQueryOptionsListTest()
        {
            ValidatePage("DataQueryOptionsList");
        }
        [TestCase]
        public void DataQueryOuterJoinTest()
        {
            ValidatePage("DataQueryOuterJoin");
        }
        [TestCase]
        public void DataQueryOuterJoinCoalesceTest()
        {
            ValidatePage("DataQueryOuterJoinCoalesce");
        }
        [TestCase]
        public void DataQueryOutputArrayTest() 
        {
            ValidatePage("DataQueryOutputArray");
        }
        [TestCase]
        public void DataQuerySimpleTest()
        {
            ValidatePage("DataQuerySimple");
        }
        [TestCase]
        public void DataQueryStringValueTest()
        {
            ValidatePage("DataQueryStringValue");
        }
        [TestCase]
        public void DataQueryWhereTest()
        {
            ValidatePage("DataQueryWhere");
        }
        [TestCase]
        public void DataQueryWhereBooleanTest()
        {
            ValidatePage("DataQueryWhereBoolean");
        }
        [TestCase]
        public void DataQueryWhereLikeTest()
        {
            ValidatePage("DataQueryWhereLike");
        }
        [TestCase]
        public void DataQueryWhereLikeMustacheTest()
        {
            ValidatePage("DataQueryWhereLikeMustache");
        }
        [TestCase]
        public void DataQueryWhereMustacheTest()
        {
            ValidatePage("DataQueryWhereMustache");
        }
        [TestCase]
        public void DataQueryWhereNullTest()
        {
            ValidatePage("DataQueryWhereNull");
        }
        [TestCase]
        public void DataSameKeyTest()
        {
            ValidatePage("DataSameKey");
        }
        [TestCase]
        public void DataSimpleLoadTest()
        {
            ValidatePage("DataSimpleLoad");
        }
        [TestCase]
        public void DataStartupFunctionNoCacheInsideSectorTest()
        {
            ValidatePage("DataStartupFunctionNoCacheInsideSector");
        }
        [TestCase]
        public void DataSwitchTest()
        {
            ValidatePage("DataSwitch");
        }
        [TestCase]
        public void DataUrlArrayEmptyTest()
        {
            ValidatePage("DataUrlArrayEmpty");
        }
        [TestCase]
        public void DataUrlParameterMissingTest()
        {
            ValidatePage("DataUrlParameterMissing");
        }
        [TestCase]
        public void DataUrlSelfTest()
        {
            ValidatePage("DataUrlSelf");
        }
        [TestCase]
        public void DataValueTest()
        {
            ValidatePage("DataValue");
        }
        [TestCase]
        public void DynamicContentRedirectTest()
        {
            ValidatePage("DynamicContentRedirect");
        }
        [TestCase]
        public void EncodeAttributeSourceTest()
        {
            ValidatePage("EncodeAttributeSource");
        }
        [TestCase]
        public void EncodeAttributeSourceUsingEncodeUrlTest()
        {
            ValidatePage("EncodeAttributeSourceUsingEncodeUrl");
        }
        [TestCase]
        public void EncodeUrlMustacheTest()
        {
            ValidatePage("EncodeUrlMustache");
        }
        [TestCase]
        public void EventLoadSectorTest()
        {
            ValidatePage("EventLoadSector");
        }
        [TestCase]
        public void FormatTest()
        {
            ValidatePage("Format");
        }
        [TestCase]
        public void FormatNumberSizeTest()
        {
            ValidatePage("FormatNumberSize");
        }
        [TestCase]
        public void FormatObjectTest()
        {
            ValidatePage("FormatObject");
        }
        [TestCase]
        public void FormatObjectContextTest()
        {
            ValidatePage("FormatObjectContext");
        }
        [TestCase]
        public void FormatObjectCultureTest()
        {
            ValidatePage("FormatObjectCulture");
        }
        [TestCase]
        public void FormatTimespanTest()
        {
            ValidatePage("FormatTimespan");
        }
        [TestCase]
        public void FormatTimezoneTest()
        {
            ValidatePage("FormatTimezone");
        }
        [TestCase]
        public void FunctionAcceptDataChangesTest()
        {
            ValidatePage("FunctionAcceptDataChanges");
        }
        [TestCase]
        public void FunctionAddDataItemMustacheTest()
        {
            ValidatePage("FunctionAddDataItemMustache");
        }
        [TestCase]
        public void FunctionAddDataItemPropertyCreateTest()
        {
            ValidatePage("FunctionAddDataItemPropertyCreate");
        }
        [TestCase]
        public void FunctionAddDataItemReferenceTest()
        {
            ValidatePage("FunctionAddDataItemReference");
        }
        [TestCase]
        public void FunctionAddDateTest()
        {
            ValidatePage("FunctionAddDate");
        }
        [TestCase]
        public void FunctionAddRequestHeaderTest()
        {
            ValidatePage("FunctionAddRequestHeader");
        }
        [TestCase]
        public void FunctionAsyncTest()
        {
            ValidatePage("FunctionAsync");
        }
        [TestCase]
        public void FunctionCastNumberTest()
        {
            ValidatePage("FunctionCastNumber");
        }
        [TestCase]
        public void FunctionCastNumberBlockTest()
        {
            ValidatePage("FunctionCastNumberBlock");
        }
        [TestCase]
        public void FunctionClearDataTest()
        {
            ValidatePage("FunctionClearData");
        }
        [TestCase]
        public void FunctionClearValidationTest()
        {
            ValidatePage("FunctionClearValidation");
        }
        //TODO: Cant find a way to allow the permission cliboardread in chromedriver
        //[TestCase]
        //public void FunctionClipboardAsync()
        //{
        //    ValidatePage("FunctionClipboardAsync");
        //}
        [TestCase]
        public void FunctionCloseWindowHiddenTest()
        {
            ValidatePage("FunctionCloseWindowHidden");
        }
        [TestCase]
        public void FunctionContainsDataItemTest()
        {
            ValidatePage("FunctionContainsDataItem");
        }
        [TestCase]
        public void FunctionContainsDataItemComplexObjectTest()
        {
            ValidatePage("FunctionContainsDataItemComplexObject");
        }
        [TestCase]
        public void FunctionContainsDataItemValueWithoutContextTest()
        {
            ValidatePage("FunctionContainsDataItemValueWithoutContext");
        }
        [TestCase]
        public void FunctionCreateDataTest()
        {
            ValidatePage("FunctionCreateData");
        }
        [TestCase]
        public void FunctionCreateReferenceTest()
        {
            ValidatePage("FunctionCreateReference");
        }
        [TestCase]
        public void FunctionCreateReferenceObjectTest()
        {
            ValidatePage("FunctionCreateReferenceObject");
        }
        [TestCase]
        public void FunctionCreateReferenceOnNotifyTest()
        {
            ValidatePage("FunctionCreateReferenceOnNotify");
        }
        [TestCase]
        public void FunctionCreateTimerAsyncTest()
        {
            ValidatePage("FunctionCreateTimerAsync");
        }
        [TestCase]
        public void FunctionDetectViewTest()
        {
            ValidatePage("FunctionDetectView");
        }
        [TestCase]
        public void FunctionDownloadDataBinaryTest()
        {
            ValidatePage("FunctionDownloadDataBinary");
        }
        //[TestCase]
        //public void FunctionExecuteComponentFunctionTest()
        //{
        //    ValidatePage("FunctionExecuteComponentFunction");
        //}
        [TestCase]
        public void FunctionExecuteDataItemTest()
        {
            ValidatePage("FunctionExecuteDataItem");
        }
        [TestCase]
        public void FunctionExecuteDataItemDataPathTest()
        {
            ValidatePage("FunctionExecuteDataItemDataPath");
        }
        [TestCase]
        public void FunctionExecuteDataItemExpressionTest()
        {
            ValidatePage("FunctionExecuteDataItemExpression");
        }
        [TestCase]
        public void FunctionExecuteDataItemHierarchyTest()
        {
            ValidatePage("FunctionExecuteDataItemHierarchy");
        }
        [TestCase]
        public void FunctionExecuteDataItemRangeTest()
        {
            ValidatePage("FunctionExecuteDataItemRange");
        }
        [TestCase]
        public void FunctionExecuteInstanceFunctionTest()
        {
            ValidatePage("FunctionExecuteInstanceFunction");
        }
        [TestCase]
        public void FunctionExecuteSectorTest()
        {
            ValidatePage("FunctionExecuteSector");
        }
        [TestCase]
        public void FunctionExecuteValidationTest()
        {
            ValidatePage("FunctionExecuteValidation");
        }
        [TestCase]
        public void FunctionFilterDataTest()
        {
            ValidatePage("FunctionFilterData");
        }
        [TestCase]
        public void FunctionFocusTest()
        {
            ValidatePage("FunctionFocus");
        }
        [TestCase]
        public void FunctionGetSectorTest()
        {
            ValidatePage("FunctionGetSector");
        }
        [TestCase]
        public void FunctionGetWindowTest()
        {
            ValidatePage("FunctionGetWindow");
        }
        [TestCase]
        public void FunctionHasDataChangesTest()
        {
            ValidatePage("FunctionHasDataChanges");
        }
        [TestCase]
        public void FunctionHasTokenTest()
        {
            ValidatePage("FunctionHasToken");
        }
        [TestCase]
        public void FunctionHideWindowTest()
        {
            ValidatePage("FunctionHideWindow");
        }
        [TestCase]
        public void FunctionHideWindowAutoCloseTest()
        {
            ValidatePage("FunctionHideWindowAutoClose");
        }
        [TestCase]
        public void FunctionMoveItemTest()
        {
            ValidatePage("FunctionMoveItem");
        }
        [TestCase]
        public void FunctionParametersPlicasTest()
        {
            ValidatePage("FunctionParametersPlicas");
        }
        [TestCase]
        public void FunctionPostDataItemTest()
        {
            ValidatePage("FunctionPostDataItem");
        }
        [TestCase]
        public void FunctionRemoveDataItemLookupTest()
        {
            ValidatePage("FunctionRemoveDataItemLookup");
        }
        [TestCase]
        public void FunctionRemoveDataItemLookupDataKeyMustacheTest()
        {
            ValidatePage("FunctionRemoveDataItemLookupDataKeyMustache");
        }
        [TestCase]
        public void FunctionRemoveDataItemLookupMappingTest()
        {
            ValidatePage("FunctionRemoveDataItemLookupMapping");
        }
        [TestCase]
        public void FunctionRemoveDataItemMustacheTest()
        {
            ValidatePage("FunctionRemoveDataItemMustache");
        }
        [TestCase]
        public void FunctionRemoveDataItemWithoutContextTest()
        {
            ValidatePage("FunctionRemoveDataItemWithoutContext");
        }
        [TestCase]
        public void FunctionSwitchSectorIframeTest()
        {
            ValidatePage("FunctionSwitchSectorIframe");
        }
        [TestCase]
        public void FunctionToggleItemFieldTest()
        {
            ValidatePage("FunctionToggleItemField");
        }
        [TestCase]
        public void FunctionToggleItemFieldDataTest()
        {
            ValidatePage("FunctionToggleItemFieldData");
        }
        [TestCase]
        public void FunctionUpdataDataUrlSetTest()
        {
            ValidatePage("FunctionUpdataDataUrlSet");
        }
        [TestCase]
        public void FunctionUpdateDataTest()
        {
            ValidatePage("FunctionUpdateData");
        }
        [TestCase]
        public void FunctionUpdateDataFieldTest()
        {
            ValidatePage("FunctionUpdateDataField");
        }
        [TestCase]
        public void FunctionUpdateDataFieldLookupTest()
        {
            ValidatePage("FunctionUpdateDataFieldLookup");
        }
        [TestCase]
        public void FunctionUpdateDataFieldObjectWithDelayTest()
        {
            ValidatePage("FunctionUpdateDataFieldObjectWithDelay");
        }
        [TestCase]
        public void FunctionUpdateDataFieldRecursiveTest()
        {
            ValidatePage("FunctionUpdateDataFieldRecursive");
        }
        [TestCase]
        public void FunctionUpdateDataFieldResolveTest()
        {
            ValidatePage("FunctionUpdateDataFieldResolve");
        }
        [TestCase]
        public void FunctionUpdateDataResolveTest()
        {
            ValidatePage("FunctionUpdateDataResolve");
        }
        [TestCase]
        public void FunctionUpdateItemFieldDforTest()
        {
            ValidatePage("FunctionUpdateItemFieldDfor");
        }
        [TestCase]
        public void FunctionUpdateItemFieldMustacheIndexTest()
        {
            ValidatePage("FunctionUpdateItemFieldMustacheIndex");
        }
        [TestCase]
        public void FunctionUpdateItemFieldResolveTest()
        {
            ValidatePage("FunctionUpdateItemFieldResolve");
        }
        [TestCase]
        public void FunctionUpdateSectorTest()
        {
            ValidatePage("FunctionUpdateSector");
        }
        [TestCase]
        public void FunctionUpdateURLTest()
        {
            ValidatePage("FunctionUpdateURL");
        }
        [TestCase]
        public void HandlerCustomTest()
        {
            ValidatePage("HandlerCustom");
        }
        [TestCase]
        public void IFANDTest()
        {
            ValidatePage("IFAND");
        }
        [TestCase]
        public void IFGreaterThanLessThanTest()
        {
            ValidatePage("IFGreaterThanLessThan");
        }
        [TestCase]
        public void IFORTest()
        {
            ValidatePage("IFOR");
        }
        [TestCase]
        public void IFWithLogicalOperatorsWithAndWithoutParenthesesTest()
        {
            ValidatePage("IFWithLogicalOperatorsWithAndWithoutParentheses");
        }
        [TestCase]
        public void IndexArrayTest()
        {
            ValidatePage("IndexArray");
        }
        [TestCase]
        public void IndexArrayWriteTest()
        {
            ValidatePage("IndexArrayWrite");
        }
        [TestCase]
        public void InputDelayTest()
        {
            ValidatePage("InputDelay");
        }
        [TestCase]
        public void MessageExecuteAsyncTest()
        {
            ValidatePage("MessageExecuteAsync");
        }
        [TestCase]
        public void MessageSendValueTest()
        {
            ValidatePage("MessageSendValue");
        }
        [TestCase]
        public void ModelButtonTest()
        {
            ValidatePage("ModelButton");
        }
        [TestCase]
        public void ModelExpressionTest()
        {
            ValidatePage("ModelExpression");
        }
        [TestCase]
        public void ModelLabelTest()
        {
            ValidatePage("ModelLabel");
        }
        [TestCase]
        public void ModelObjectTest()
        {
            ValidatePage("ModelObject");
        }
        [TestCase]
        public void ModelSelectTest()
        {
            ValidatePage("ModelSelect");
        }
        [TestCase]
        public void ModelSelectOptionTreeTest()
        {
            ValidatePage("ModelSelectOptionTree");
        }
        [TestCase]
        public void ModelTextAreaMultipleMustachesTest()
        {
            ValidatePage("ModelTextAreaMultipleMustaches");
        }
        [TestCase]
        public void MustacheHatTest()
        {
            ValidatePage("MustacheHat");
        }
        [TestCase]
        public void MustacheNullTest()
        {
            ValidatePage("MustacheNull");
        }
        [TestCase]
        public void NotifyComponentDetachedTest()
        {
            ValidatePage("NotifyComponentDetached");
        }
        [TestCase]
        public void ObjectComplexTest()
        {
            ValidatePage("ObjectComplex");
        }
        [TestCase]
        public void ObjectListTest()
        {
            ValidatePage("ObjectList");
        }
        [TestCase]
        public void OnModelInitializeTest()
        {
            ValidatePage("OnModelInitialize");
        }
        [TestCase]
        public void PageMasterChildTest()
        {
            ValidatePage("PageMasterChild");
        }
        [TestCase]
        public void PageMasterGrandChildTest()
        {
            ValidatePage("PageMasterGrandChild");
        }
        [TestCase]
        public void PageMasterMasterTest()
        {
            ValidatePage("PageMasterMaster");
        }
        [TestCase]
        public void PageSimpleTest()
        {
            ValidatePage("PageSimple");
        }
        [TestCase]
        public void ParameterFunctionMustacheInsideTest()
        {
            ValidatePage("ParameterFunctionMustacheInside");
        }
        [TestCase]
        public void ParameterFunctionQuotedTest()
        {
            ValidatePage("ParameterFunctionQuoted");
        }
        [TestCase]
        public void ParseDateTest()
        {
            ValidatePage("ParseDate");
        }
        [TestCase]
        public void ParseNumberTest()
        {
            ValidatePage("ParseNumber");
        }
        [TestCase]
        public void PlumberExecuteAsyncTest()
        {
            ValidatePage("PlumberExecuteAsync");
        }
        [TestCase]
        public void PreTest()
        {
            ValidatePage("Pre");
        }
        [TestCase]
        public void PropertiesSameTagTest()
        {
            ValidatePage("PropertiesSameTag");
        }
        [TestCase]
        public void RenderTest()
        {
            ValidatePage("Render");
        }
        [TestCase]
        public void RouterMasterTest()
        {
            ValidatePage("RouterMaster");
        }
        [TestCase]
        public void RouterOneTest()
        {
            ValidatePage("RouterOne");
        }
        [TestCase]
        public void RouterSectorTest()
        {
            ValidatePage("RouterSector");
        }
        [TestCase]
        public void RouterThreeTest()
        {
            ValidatePage("RouterThree");
        }
        [TestCase]
        public void RouterTwoTest()
        {
            ValidatePage("RouterTwo");
        }
        [TestCase]
        public void SectorContentDynamicTest()
        {
            ValidatePage("SectorContentDynamic");
        }
        [TestCase]
        public void SectorImpersonateTest()
        {
            ValidatePage("SectorImpersonate");
        }
        [TestCase]
        public void SectorSubMenuIconsTest()
        {
            ValidatePage("SectorSubMenuIcons");
        }
        [TestCase]
        public void SectorSubMenuListTest()
        {
            ValidatePage("SectorSubMenuList");
        }
        [TestCase]
        public void SectorTemplateTest()
        {
            ValidatePage("SectorTemplate");
        }
        [TestCase]
        public void SectorUniqueLoadingTest()
        {
            ValidatePage("SectorUniqueLoading");
        }
        [TestCase]
        public void SectorUrlMustacheTest()
        {
            ValidatePage("SectorUrlMustache");
        }
        //[TestCase]
        //public void ServerResponseRedirectAsyncTest()
        //{
        //    ValidatePage("ServerResponseRedirectAsync");
        //}
        [TestCase]
        public void StackObjectReferenceTest()
        {
            ValidatePage("StackObjectReference");
        }
        [TestCase]
        public void ThemesTest()
        {
            ValidatePage("Themes");
        }
        [TestCase]
        public void ValidationTest()
        {
            ValidatePage("Validation");
        }
        [TestCase]
        public void ValidationEventAutoFocusSelectTest()
        {
            ValidatePage("ValidationEventAutoFocusSelect");
        }
        [TestCase]
        public void ValidationEventBasicTest()
        {
            ValidatePage("ValidationEventBasic");
        }
        [TestCase]
        public void ValidationEventCompareTest()
        {
            ValidatePage("ValidationEventCompare");
        }
        [TestCase]
        public void ValidationEventConditionalTest()
        {
            ValidatePage("ValidationEventConditional");
        }
        [TestCase]
        public void ValidationEventConditionalFieldsTest()
        {
            ValidatePage("ValidationEventConditionalFields");
        }
        [TestCase]
        public void ValidationEventConditionalMustacheTest()
        {
            ValidatePage("ValidationEventConditionalMustache");
        }
        [TestCase]
        public void ValidationEventContextGroupTest()
        {
            ValidatePage("ValidationEventContextGroup");
        }
        [TestCase]
        public void ValidationEventGroupTest()
        {
            ValidatePage("ValidationEventGroup");
        }
        [TestCase]
        public void ValidationEventInputTextTest()
        {
            ValidatePage("ValidationEventInputText");
        }
        [TestCase]
        public void ValidationEventInputTextSpaceTest()
        {
            ValidatePage("ValidationEventInputTextSpace");
        }
        [TestCase]
        public void ValidationEventOutsideTest()
        {
            ValidatePage("ValidationEventOutside");
        }
        [TestCase]
        public void ValidationEventOutsideSectorTest()
        {
            ValidatePage("ValidationEventOutsideSector");
        }
        [TestCase]
        public void ValidationEventRegexTest()
        {
            ValidatePage("ValidationEventRegex");
        }
        [TestCase]
        public void ValidationEventRegexMustacheTest()
        {
            ValidatePage("ValidationEventRegexMustache");
        }
        [TestCase]
        public void ViewsTest()
        {
            ValidatePage("Views");
        }
        [TestCase]
        public void ViewsOneTest()
        {
            ValidatePage("ViewsOne");
        }
        [TestCase]
        public void ViewsOneMobileTest()
        {
            ValidatePage("ViewsOne.mobile");
        }
        [TestCase]
        public void ViewsTwoTest()
        {
            ValidatePage("ViewsTwo");
        }
        [TestCase]
        public void WindowAllowMultipleInstanceUrlTest()
        {
            ValidatePage("WindowAllowMultipleInstanceUrl");
        }
        [TestCase]
        public void WindowsFriendTest()
        {
            ValidatePage("WindowsFriend");
        }
        [TestCase]
        public void WindowShowQueryStringMustacheTest()
        {
            ValidatePage("WindowShowQueryStringMustache");
        }
        [TestCase]
        public void WindowShowWindowTest()
        {
            ValidatePage("WindowShowWindow");
        }
        [TestCase]
        public void WindowShowWindowCloseAllTest()
        {
            ValidatePage("WindowShowWindowCloseAll");
        }
        [TestCase]
        public void WindowsLinkTest()
        {
            ValidatePage("WindowsLink");
        }
        [TestCase]
        public void WindowsTemplateTest()
        {
            ValidatePage("WindowsTemplate");
        }
        [TestCase]
        public void WindowsTemplateOnLoadTest()
        {
            ValidatePage("WindowsTemplateOnLoad");
        }
        [TestCase]
        public void FunctionUnloadDataTest()
        {
            ValidatePage("FunctionUnloadData");
        }
        #endregion
    }
}
