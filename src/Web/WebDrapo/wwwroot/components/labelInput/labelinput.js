function labelinputConstructor(el, app)
{
    let model = el.getAttribute("d-model");
    let caption = el.getAttribute("d-caption");
    let label = el.children[0];
    let input = el.children[el.children.length - 1];
    app._document.SetHTML(label, caption);
    input.setAttribute('d-model', model);    
}