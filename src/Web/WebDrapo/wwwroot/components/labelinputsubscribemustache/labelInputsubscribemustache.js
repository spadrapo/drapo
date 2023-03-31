function labelinputsubscribemustacheConstructor(el, app) {
    let input = el.children[el.children.length - 1];
    let dataKey = el.getAttribute("d-dataKeySource");
    app._observer.SubscribeComponent(dataKey, el, labelinputsubscribeNotify, input);
    input.addEventListener('change', function (evt) { labelinputsubscribeChange(evt, el, app); }, false);
    return(labelinputsubscribeNotify(el, app));
}

function labelinputsubscribeNotify(el, app) {
    let sector = app._document.GetSector(el);
    let data = el.getAttribute("d-dataKeySource");
    var mustachePartes = app._parser.ParseMustache(data);
    var dataKey = mustachePartes[0];
    var dataField = mustachePartes[1];
    let caption = el.getAttribute("d-caption");
    let label = el.children[0];
    let input = el.children[el.children.length - 1];
    label.html(caption);
    let promise = app._storage.RetrieveData(dataKey, sector).then(function (dataItem) {
        let value = (dataItem !== null) ? dataItem[dataField] : '';
        input.html(value);
    });
    return (promise);
}

function labelinputsubscribeChange(evt, el, app)
{
    var target = evt.target;
    let sector = app._document.GetSector(el);
    let data = el.getAttribute("d-dataKeySource");
    var dataPath = app._parser.ParseMustache(data);
    app._storage.UpdateDataPath(sector, null, dataPath, target.value);
}