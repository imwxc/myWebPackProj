//  手写Object.create（）
// 使用现有的对象来作为新创建对象的原型
function create(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
}

// 手写instance of
// 判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
// 首先获取两者的prototype， 循环判断obj的proto 是否等于 target的proto
function instanceOf(obj, target) {
    let objProto = Object.getPrototypeOf(obj);
    let targetProto = target.prototype;
    while (objProto !== null || objProto !== undefined) {
        if (objProto === targetProto) {
            return true;
        }
        objProto = Object.getPrototypeOf(objProto);
    }
}

// 手写 new 操作符
// （1）首先创建了一个新的空对象
// （2）设置原型，将对象的原型设置为函数的 prototype 对象。
// （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
// （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

function myNew() {
    let emptyObj = null;
    let result = null;
    const constructor = Array.prototype.shift.call(arguments); // 获取传入的 构造函数
    if (typeof constructor != "function") return;
    emptyObj = Object.create(constructor); // 第一步 新建空对象
    result = constructor.apply(newObject, arguments); // 第二步 将函数的this指向该对象并 执行构造函数代码
    let flag =
        result && (typeof result === "object" || typeof result === "function"); // 判断函数返回类型： 值类型则说明 newObject 被赋值了， 引用类型则说明 result 为要返回的引用
    return flag ? result : emptyObj;
}

// 手写Promise 参照 myPromise即可

// 手写promise.then 同上

// 手写Promise.all 同上

// 手写Promise.race 同上


// 函数柯里化
// 函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
// es6 实现
function curry(fn, ...args) {
    return fn.length <= args.length
        ? fn(...args)
        : curry.bind(null, fn, ...args);
}


// 实现双向数据绑定
(function(){
    function updateHtml(value){console.log('html 的 值被更新为', value)}
    let obj = {};
    let key = 'text'
    let value= obj[key] || '111'
    Object.defineProperty(obj, key, {
        get(){
            console.log('获取数据为：', value)
            return value
        },
        set(newVal, oldVal){
            updateHtml(newVal)
            value = newVal
            console.log(`数据从${oldVal}更新为：${newVal}`)
        },
        configurable: true,
        enumerable: true,
    })

    console.log(`get obj`, obj.text)
    obj.text = '222'
    console.log(`get obj`, obj.text)
})()


// 实现斐波那契数列
(
    function(){
        function feb(n){
            if(n==0 || n==1){
                // console.log(n)
                return n
            }
            console.log(2*n-3)
            return feb(n-1) + feb(n-2)
        }
        console.log(feb(20))
    }
)()

// 使用setTimeout实现setInterval
(function(){
    function mySetInterVal(fn, delay, immediately=false, ...agrs){
        if(immediately){ fn(...agrs) }
        setTimeout(()=>{
            fn(...agrs)
            mySetInterVal(fn, delay, false, ...agrs)
        },delay)
    }
    let counter = 1
    mySetInterVal(()=>{
        console.log(': ', counter)
        counter++
    }, 200, true)
})()

// 判断对象是否存在循环引用
// 思路： 递归遍历obj的每个key是否指向obj
(function(){
    function isCycleObject(obj, parent){
        let parentArr = parent || [obj]
        for(let i in obj){
            if(typeof obj[i] === 'object'){
                let flag = false;
                parentArr.forEach(element => {
                    if(element === obj[i]) flag = true
                });
                if(flag) return flag
                flag = isCycleObject(obj[i], [...parentArr,obj[i]])
                if(flag) return flag
            }
        }
        return false
    }
    // const a = 1;
    // const b = {a};
    // const c = {b};
    // const o = {d:{a:3},c}
    // o.c.b.aa = a;
    // o.c.b['d'] = b

    // console.log(o, isCycleObject(o))
})()


// 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组

// 使用es6api
(function(){
    const arr = [1,2,3,[4,4,4,[5,6,6,[7,[8,[[[10]],9],7,7,7,8],4,3,23],4,5],6]]
    return console.log(arr)
})()


// 实现任务队列（链式调用一些任务）
(
    function(){
        class TaskQueue {
    
        }
        let queue = new TaskQueue()
        queue.task1().task2().task(3)
    }
)()

// js实现并发控制器



// 将js对象转化为树型结构
// #region
// 转换前：
// source = [{
//     id: 1,
//     pid: 0,
//     name: 'body'
//   }, {
//     id: 2,
//     pid: 1,
//     name: 'title'
//   }, {
//     id: 3,
//     pid: 2,
//     name: 'div'
//   }]
// 转换为:
// tree = [{
//   id: 1,
//   pid: 0,
//   name: 'body',
//   children: [{
//     id: 2,
//     pid: 1,
//     name: 'title',
//     children: [{
//       id: 3,
//       pid: 1,
//       name: 'div'
//     }]
//   }
// }]
// #endregion
/*
1、先遍历源数据，根据parent父级节点获取到一级菜单list
2、遍历list，接着递归（传入子级的parent和children属性）
3、判断如果子级菜单中没有children就删除该属性
*/
(
function(){
    let data = [
        { id: 1, parent: null, text: '菜单1' },
        { id: 11, parent: 1, text: '菜单1-1' },
        { id: 12, parent: 1, text: '菜单1-2' },
        { id: 2, parent: null, text: '菜单2' },
        { id: 21, parent: 2, text: '菜单2-1' },
        { id: 22, parent: 2, text: '菜单2-2' }
    ]
    function jsonTree(data, p, list) {
        for (let item of data) {
            if (item.parent == p) list.push(item);
        }
        for (let i of list) {
            i.children = [];
            jsonTree(data, i.id, i.children);
            if(i.children.length == 0) delete i.children;
        }
        return list;
    }
    console.log(jsonTree(data, null, []));
}
)()