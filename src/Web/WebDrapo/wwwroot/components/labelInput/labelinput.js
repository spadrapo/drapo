function labelinputConstructor(el, app)
{
    let elj = $(el);
    let model = elj.attr("d-model");
    let caption = elj.attr("d-caption");
    let label = $(el).children().first();
    let input = $(el).children().last();
    label.html(caption);
    input.attr('d-model', model);    
}