export function populateList(ulId: string, items: string[]){
    var unorderedList = <HTMLUListElement>document.getElementById(ulId);
    unorderedList.innerHTML = "";
    items.forEach(i => {
        var listItem = document.createElement("li");
        listItem.innerText = i;
        unorderedList.appendChild(listItem);
    });
}