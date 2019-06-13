// 队列的方式

class UndoQueue {
    constructor(obj) {
        if (obj) {
            this._index = 0;
            this._queueList = [obj];
        } else {
            this._index = -1;
            this._queueList = [];
        }
    }

    get index() {
        return this._index;
    }

    get current() {
        return this._queueList[this._index];
    }

    undo() {//指针向前挪1，并且范围移动之后的指针指向的值
        if (this._index > 0) {
            this._index--;
        }
        return this._queueList[this._index];
    }

    redo() {//指针向后挪1，并且范围移动之后的指针指向的值
        if (this._index < this._queueList.length) {
            this._index++;
        }
        return this._queueList[this._index];
    }

    into(object) {
        //指针指向最后一个，将新的操作加入队列末尾，指针位置不变
        object = JSON.parse(JSON.stringify(object));

        if (this._queueList.length === this._index + 1) {
            this._queueList.push(object);
            if (this._queueList.length > 100) {
                this._queueList.shift();
            } else {
                this._index++;
            }

            return;
        }
        //放弃后面的操作，将新的操作加入队列末尾，指针位置向后挪1
        if (this._queueList.length > this._index + 1) {
            this._queueList.splice(this._index + 1, this._queueList.length);
            this._queueList.push(object);
            this._index++;

            return;
        }
    }
}

export default UndoQueue;