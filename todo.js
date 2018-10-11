export class ToDo {
    constructor() {
        this.inputElm = document.getElementById("todo-input");
        this.inputElm.addEventListener("keydown", this.inputHandle.bind(this));
        this.listElm = document.getElementById("todo-list");
        this.itemIds = 0;
    }

    inputHandle(event) {
        if (13 === event.keyCode &&
            this.inputElm.value.length > 0) {
            this.addItem(this.inputElm.value);
            this.inputElm.value = "";
        }
    }

    addItem(str) {
        let itemOuter = document.createElement("div");
        itemOuter.className = "todo-list-item-outer";
        itemOuter.id = this.getNewId();

        let itemInner = document.createElement("div");
        itemInner.className = "todo-list-item-inner";
        itemInner.innerHTML = str;

        let itemDelete = document.createElement("button");
        itemDelete.className = "todo-list-item-delete";

        itemDelete.addEventListener("click", () => {
            this.removeItem(itemOuter.id);
        });
        itemDelete.innerHTML = "X";

        itemInner.appendChild(itemDelete);
        itemOuter.appendChild(itemInner);
        this.listElm.appendChild(itemOuter);
        itemOuter.addEventListener("click", () => {
            if ("todo-list-item-inner" === itemInner.className) {
                itemInner.className = "todo-list-item-inner-done";
            } else {
                itemInner.className = "todo-list-item-inner";
            }
        });
    }

    removeItem(id) {
        document.getElementById(id).remove();
    }

    getNewId() {
        let id = `id-${this.itemIds}`;
        this.itemIds += 1;
        return id;
    }
}