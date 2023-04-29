// 二叉树的递归框架
function TreeNode(val, left=null, right=null){
    this.val = val
    this.left = left
    this.right = right
}
class Stack extends Array{
    constructor(){
        super();
    }
    empty(){
        return !this.length
    }
    peek(){
        return this.at(this.length-1)
    }
}
class BinaryTree {
    res = []
    constructor(root){
        this.root = root
    }
    
    // 二叉树递归写法框架
    trav(node){
        if(node == null) return null
        // 前序代码位置
        this.trav(node.left)
        // 中序代码位置
        this.trav(node.right)
        // 后序代码位置
    }

    // 二叉树迭代算法框架
    forTravStack = new Stack()
    pushLeftBranch(node){
        while(node != null){
            // 前序代码位置
            this.forTravStack.push(node)
            node = node.left
        }
    }
    forTrav(root){
        let visited = new TreeNode(NaN)

        // 先遍历左子树
        this.pushLeftBranch(root)

        // 然后开始出栈，
        while(!this.forTravStack.empty()){
            let p = this.forTravStack.peek();

            // 左子树为空 或 左子树已访问过， 且右子树未访问过时， 
            // 执行中序代码
            if((p.left == null || p.left === visited) && p.right !== visited){
                // 执行中序代码

                // 从右子树的root开始遍历
                this.pushLeftBranch(p.right)
            }

            if(p.right == null || p.right === visited){
                // 执行后序代码

                // 退出前记录上次访问的节点
                visited = this.forTravStack.pop()
            }
        }
    }

}



