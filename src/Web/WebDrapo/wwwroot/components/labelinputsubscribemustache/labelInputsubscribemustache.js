function labelinputsubscribemustacheConstructor(el, app) {
    let elj = $(el);
    let input = elj.children().last()[0];
    let dataKey = elj.attr("d-dataKeySource");
    app._observer.SubscribeComponent(dataKey, el, labelinputsubscribeNotify, input);
    input.addEventListener('change', function (evt) { labelinputsubscribeChange(evt, el, app); }, false);
    return(labelinputsubscribeNotify(el, app));
}

function labelinputsubscribeNotify(el, app) {
    let elj = $(el);
    let sector = app._document.GetSector(el);
    let data = elj.attr("d-dataKeySource");
    var mustachePartes = app._parser.ParseMustache(data);
    var dataKey = mustachePartes[0];
    var dataField = mustachePartes[1];
    let caption = elj.attr("d-caption");
    let label = $(el).children().first();
    let input = $(el).children().last();
    label.html(caption);
    let promise = app._storage.RetrieveData(dataKey, sector).then(function (dataItem) {
        let value = (dataItem !== null) ? dataItem[dataField] : '';
        input.html(value);
    });
    return (promise);
}

function labelinputsubscribeChange(evt, el, app)
{
    let elj = $(el);
    var target = evt.target;
    let sector = app._document.GetSector(elj);
    let data = elj.attr("d-dataKeySource");
    var dataPath = app._parser.ParseMustache(data);
    app._storage.UpdateDataPath(sector, null, dataPath, target.value);
}