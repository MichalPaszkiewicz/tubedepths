export function populateList(ulId: string, items: string[], callback: (x: string) => void){
    var unorderedList = <HTMLUListElement>document.getElementById(ulId);
    unorderedList.innerHTML = "";

    items.forEach(i => {
        var listItem = document.createElement("li");
        listItem.innerText = i;
        listItem.onclick = () => {
            callback(i);
        }
        unorderedList.appendChild(listItem);
    });
}

export function closeList(ulId: string){
    var unorderedList = <HTMLUListElement>document.getElementById(ulId);
    unorderedList.innerHTML = "";
}