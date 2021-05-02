class Node {
    constructor(val, priorty) {
        this.val = val;
        this.priorty = priorty;
        this.next = null;
    }
}

export class PriortyQueue{
    constructor(){
        this.head = null;
        this.length = 0;
    }

    enqueue(val, priorty){
        const newNode = new Node(val, priorty);
        let temp = this.head;
        if(this.head === null){
            this.head = newNode;
        } else if(this.head.priorty > newNode.priorty){
            this.head = newNode;
            newNode.next = temp;
        } else {
            while (temp.next !== null && temp.next.priorty < newNode.priorty){
                temp = temp.next;
            }
            newNode.next = temp.next;
            temp.next = newNode;
        }
        this.length++;
    }

    dequeue(){
        if(this.head === null){
            return 
        }
        const temp = this.head
        this.head = this.head.next
        temp.next = null;
        this.length--;
        return temp
    }

    display(){
        const dis = []
        let temp = this.head
        while (temp !== null){
            dis.push([temp.val, temp.priorty])
            temp = temp.next
        }
        console.log(dis)
    }
}



