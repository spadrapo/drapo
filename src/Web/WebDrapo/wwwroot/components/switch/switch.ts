function switchConstructor(el: HTMLElement, app: DrapoApplication) {
    return (switch_render(el, app));
}

async function switch_render(el: HTMLElement, app: DrapoApplication): Promise<void> {
    const mustacheModel = el.getAttribute('dc-model');
    const functionClick = el.getAttribute('dc-on-click');
    const valueTitleTurnOn = el.getAttribute('dc-titleTurnOn');
    const valueTitleTurnOff = el.getAttribute('dc-titleTurnOff');
    const valueTurnOn = el.getAttribute('dc-valueTurnOn');
    const valueTurnOff = el.getAttribute('dc-valueTurnOff');
    el.removeAttribute('dc-model');
    el.removeAttribute('dc-on-click');
    el.removeAttribute('dc-titleTurnOn');
    el.removeAttribute('dc-titleTurnOff');
    el.removeAttribute('dc-valueTurnOn');
    el.removeAttribute('dc-valueTurnOff');

    //Input
    const elChild: any = el.children.item(0);
    elChild.setAttribute('d-model', mustacheModel);
    const elSpanOn = el.children.item(1);
    const elSpanOff = el.children.item(2);

    elSpanOn.setAttribute('d-attr-title', valueTitleTurnOff);
    elSpanOff.setAttribute('d-attr-title', valueTitleTurnOn);

    if (valueTurnOn || valueTurnOff) {
        const turnOnAction = `UpdateItemField(${mustacheModel},${valueTurnOn})`;
        const turnOffAction = `UpdateItemField(${mustacheModel},${valueTurnOff})`;

        const toogleSpanOn: string = functionClick
            ? `${turnOffAction};${functionClick}`
            : turnOffAction;
        const toogleSpanOff: string = functionClick
            ? `${turnOnAction};${functionClick}`
            : turnOnAction;

        elSpanOn.setAttribute('d-if', `${mustacheModel}=${valueTurnOn}`);
        elSpanOn.setAttribute('d-on-click', toogleSpanOn);
        elSpanOff.setAttribute('d-if', `${mustacheModel}=${valueTurnOff}`);
        elSpanOff.setAttribute('d-on-click', toogleSpanOff);
    }
    else {
        elSpanOn.setAttribute('d-if', mustacheModel);
        elSpanOn.setAttribute('d-on-click', functionClick);
        elSpanOff.setAttribute('d-if', ('!' + mustacheModel));
        elSpanOff.setAttribute('d-on-click', functionClick);
    }


}