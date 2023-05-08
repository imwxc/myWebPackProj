// 实现日期格式化函数
// dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
// dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
// dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日') // 2020年04月01日

function dateFormat(date: Date, format: string) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return format
        .replace("yyyy", year.toString())
        .replace("MM", month.toString())
        .replace("dd", day.toString());
}
// console.log(dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd'))

// 不用临时变量交换 ab的值
function swap(a: number, b: number) {
    a = a + b;
    b = a - b;
    a = a - b;
    console.log(`a:${a}, b:${b}`);
}
// swap(666,777)

// 实现字符串repeat
function repeat(str: string, num: number): string {
    let res = "";
    for (let i = 0; i < num; i++) {
        res += str;
    }
    return res;
}

// 实现字符串翻转
// @ts-ignore
String.prototype.myReverse = function () {
    return this.split("").reverse().join("");
};
// @ts-ignore
// console.log('123345567'.myReverse())

// 将数字的每千分位用逗号隔开
function formatNumber(num: number) {
    let n = num.toString();
    let nums = n.split(".");

    let res = "";
    for (let i = 0; i < nums[0].length; i++) {
        let j = nums[0].length - 1 - i;
        console.log(nums[0][j], ":::", j);
        if (i % 3 || !i) {
            res += nums[0][j];
        } else {
            res += "," + nums[0][j];
        }
    }
    res = res.split("").reverse().join("");
    if (nums.length) {
        res += ".";
        for (let i = 0; i < nums[1].length; i++) {
            if (i % 3 || !i) {
                res += nums[1][i];
            } else {
                res += "," + nums[1][i];
            }
        }
    }
    return res;
}

// console.log(formatNumber(12345798.98879790))

// 实现非负大整数相加
// 首先用字符串的方式来保存大数，这样数字在数学表示上就不会发生变化
// 初始化res，temp来保存中间的计算结果，并将两个字符串转化为数组，以便进行每一位的加法运算
// 将两个数组的对应的位进行相加，两个数相加的结果可能大于10，所以可能要仅为，对10进行取余操作，将结果保存在当前位
// 判断当前位是否大于9，也就是是否会进位，若是则将temp赋值为true，因为在加法运算中，true会自动隐式转化为1，以便于下一次相加
// 重复上述操作，直至计算结束
function sumBigNumber(num1: string, num2: string): string {
    let num1Arr: number[] = num1.split("").map((i) => +i);
    let nums2Arr: number[] = num2.split("").map((i) => +i);
    let res: number[] = new Array(
        Math.max(num1Arr.length, nums2Arr.length) + 1
    ).fill(0);
    for (let i = res.length - 1; i >= 0; i--) {
        // 从后向前遍历
        let n1 = num1Arr.pop() || 0;
        let n2 = nums2Arr.pop() || 0;
        let temp = res[i] || 0;
        let sumArr = (n1 + n2 + temp)
            .toString()
            .split("")
            .map((i) => +i);
        // console.log(`n1:${n1}, n2:${n2}, temp:${temp}, sum:${sumArr.join('')}`)
        if (sumArr.length > 1) {
            res[i] += sumArr[1];
            res[i - 1] = sumArr[0];
        } else {
            res[i] += sumArr[0];
        }
        // console.log(`res: `,res)
    }
    if (!res[0]) res = res.slice(1, res.length);
    // let result = sumBigNumber(+res.join(''), +(num1Arr.length ? num1Arr.join('') : nums2Arr.length ? nums2Arr.join(''): '0'))
    return res.join("");
}

// console.log(
//     "result: ",
//     sumBigNumber(
//         "179999999999999999999999999999997999999999999999999999999999999999999999999999999999999999999999999996",
//         "4568967321048617036509812365098126350981263409867"
//     )
// );

// 实现 add(1)(2)(3)
// // 函数柯里化概念： 柯里化（Currying）是把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。
// 先执行add(3)，此时m=3，并且返回temp函数；
// 执行temp(4)，这个函数内执行add(m+n)，n是此次传进来的数值4，m值还是上一步中的3，所以add(m+n)=add(3+4)=add(7)，此时m=7，并且返回temp函数
// 执行temp(5)，这个函数内执行add(m+n)，n是此次传进来的数值5，m值还是上一步中的7，所以add(m+n)=add(7+5)=add(12)，此时m=12，并且返回temp函数
// 由于后面没有传入参数，等于返回的temp函数不被执行而是打印，
// 了解JS的朋友都知道对象的toString是修改对象转换字符串的方法，
// 因此代码中temp函数的toString函数return m值，而m值是最后一步执行函数时的值m=12，所以返回值是12。
let curryAdd = (function () {
    function add(...args: any[]): any {
        return args.reduce((a, b) => a + b, 0);
    }
    function Mycurry(fn: Function, ...args: any[]): any {
        return function temp(...newAgrs: any[]) {
            // 如果还有参数，就将参数保存，然后返回temp查看是否还有下一个参数
            if (newAgrs.length) {
                args = [...args, ...newAgrs];
                return temp;
            } else {
                // @ts-ignore
                let res = fn.apply(this, args);
                args = [];
                return res;
            }
        };
    }
    return Mycurry(add);
})();
// console.log(curryAdd(1)(2)(3)(4)())


// 解析URL为对象
// let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
// parseParam(url)
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/

function parseUrl(url: string): object {
    let res: any = {};
    let params = url.split("?")[1];
    let paramsArr = params.split("&");
    function isNumber(str: string) {
        return /^\d+$/.test(str);
    }
    paramsArr.forEach((item) => {
        let [key, value] = item.split("=");
        // 没有对应值的时候默认为true
        if (!value) {
            res[key] = true;
        } else {
            if (res[key]) {
                res[key] = [res[key]];
                res[key].push(isNumber(value) ? +value : value);
            } else if (isNumber(value)) {
                res[key] = +value;
            } else {
                res[key] = decodeURIComponent(value);
            }
        }
    });
    return res;
}

// console.log(`parseUrl: `, parseUrl('http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'))

// 循环打印红黄绿
// 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？

function blinker() {
    const times:any = {
        red: 3,
        green: 1,
        yellow: 2
    };
    function task(type: string, second: number) {
        return new Promise((res, rej) =>
            setTimeout(() => {
                console.log(type);
                res(0);
            }, second * 1000)
        );
    }
    async function show(){
        let types:string[] = Object.keys(times)
        for(let key of types){
            await task(key, times[key])
        }
        console.log('---------------------------------')
        show()
    }
    show()
}
// console.log(blinker())

// 小孩报数问题
// 有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈， 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?
interface ChileNode {
    id: number;
    prev: ChileNode | null,
    next: ChileNode | null
}
function childrenCallNum(num: number, times: number){
    function chileNode(id: number, prev:ChileNode | null){
        // console.log('id: ', id)
        if(id > num) return
        // console.log('id: ', id)
        // @ts-ignore
        this.id = id;
        // @ts-ignore
        this.prev = prev;
        // @ts-ignore
        let child = new chileNode(++id, this)
        // @ts-ignore
        this.next = id > num ? null : child;
    }
    // @ts-ignore
    let first = new chileNode(1, null);
    let last = first;
    while(last && last.next !=null){
        last = last.next
    }
    last.next = first
    first.prev = last
    let count = 1
    let curr = first
    last = null;
    first = null
    do{
        // console.log('--B: ', count, '| ', curr.prev.id,'--',curr.id, '--', curr.next.id)
        let next = curr.next
        if(!(count%times)){
            curr.prev.next = curr.next;
            curr.next.prev = curr.prev;
            curr.prev = null
            curr.next = null
            curr = next
        }else{
            curr = next
        }
        // console.log('--A: ', count, '| ', curr.prev.id,'--',curr.id, '--', curr.next.id)
        count++
    }while(curr && curr.next !==curr)

    return curr
}


function childNum(num: number, count: number){
    let allplayer:number[] = [];    
    for(let i = 0; i < num; i++){
        allplayer[i] = i + 1;
    }
    
    let exitCount = 0;    // 离开人数
    let counter = 0;      // 记录报数
    let curIndex = 0;     // 当前下标
    
    while(exitCount < num - 1){
        if(allplayer[curIndex] !== 0) counter++;    
        
        if(counter == count){
            allplayer[curIndex] = 0;                 
            counter = 0;
            exitCount++;  
        }
        curIndex++;
        if(curIndex == num){
            curIndex = 0               
        };           
    }    
    for(let i = 0; i < num; i++){
        if(allplayer[i] !== 0){
            return allplayer[i]
        }      
    }
}
// console.log('last: ----', childrenCallNum(30,3))
// console.log(childNum(3, 3))


// promise 实现图片异步加载
import {Image} from 'canvas'
function loadImage(url: string){
    let img: any = null;
    function load(url: string){
        return new Promise((resolve,rej)=>{
            img = new Image()
            img.src = url
            img.onload = ()=>{
                console.log('图片加载成功！')
                resolve(0)
            }
            img.onerror = ()=>{
                console.error('图片加载失败！')
                rej(0)
            }
        })
    }

    load(url).then(()=>{
        console.log("加载成功");
    }).catch(()=>{
        console.log("加载失败");
        img = undefined
    })
    return img
}

// console.log(loadImage('http://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg'))

// 实现观察者模式
function Observer() {
    let observers = [] as any[];
    // let observers = this.observers
    Observer.prototype.attach = function(fn: Function){
        observers.push(fn)
    }
    // @ts-ignore
    Array.prototype.remove = function(index: number){
        this.splice(index,1);
        return this
    }
    Observer.prototype.detach = function(fn: Function){
        let index = observers.findIndex((i:any)=>i.name === fn.name)
        // @ts-ignore
        observers.remove(index)
    }
    Observer.prototype.notify = function(...agrs: any[]){
        // @ts-ignore
        observers.forEach((i:any)=>i(...agrs))
    }
}

// (function(){
//     // @ts-ignore
//     let observer: any = new Observer();
//     observer.attach(()=>{
//         console.log('执行1')
//     })
//     function two(){
//         console.log('执行2')
//     }
//     observer.attach(two)
//     observer.attach(()=>{
//         console.log('执行3')
//     })
//     observer.attach(()=>{
//         console.log('执行4')
//     })
//     observer.notify()

//     observer.detach(two)
//     console.log('----------------------------')
//     observer.notify()
// })()

// 实现发布-订阅模式
class MyEventBus{
    observersMap: any = {};
    constructor(){
    }
    private listen(key: string, fn: Function) {
        if(!this.observersMap[key]){
            this.observersMap[key] = []
        }
        this.observersMap[key].push(fn)
    }
    private trigger(...agrs: any[]){
        const key = agrs[0], fns = this.observersMap[key]
        fns.forEach((fn: Function)=>{
            fn.apply(this, arguments)
        })
    }
    private remove(key: string, fn: Function){
        const fns = this.observersMap[key]
        const removeIdx = fns.findIndex((i: Function)=>i.name === fn.name)
        fns.splice(removeIdx,1)
    }
    on= this.listen
    detach= this.remove
    emit = this.trigger
}
// #region
const EventBus = new MyEventBus();
const EventEmit = {
    eventName: 'Event1',
    wirtePost(post:any){
        EventBus.emit(this.eventName, post)
    },
    on(fn:Function){
        EventBus.on(this.eventName, fn)
    }
}
const s1 = {
    log(){
        console.log('S1 log')
    }
}
const s2 = {
    log(){
        console.log('S2 log')
    }
}
const s3 = {
    log(){
        console.log('S3 log')
    }
}
EventEmit.on(s1.log)
EventEmit.on(s2.log)
EventEmit.on(s3.log)
EventEmit.wirtePost({})
console.log(EventEmit)
// #endregion

// 使用 await async 封装 fetch Api
import fetch from 'node-fetch'
class HttpRequestUrl {
    async get(url: string){
        const res = await fetch(url, {})
        console.log(res)
        const data = res.json() || {}
        return data
    }
    async post(url: string, body: any){   
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = res.json() || {}
        return data
    }
    async put(url: string, body: any){
        const data = (await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })).json() || {};
        return data
    }
    async delete(url: string, body: any){
        return (await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })).json() || {}
    }
}

// (async ()=>{
//     const httpRequest = new HttpRequestUrl();
//     const res = await httpRequest.get('https://www.baidu.com/sugrec?&prod=pc_his&from=pc_web&json=1&sid=38515_36552_38469_38345_38467_38485_37937_37709_26350_38542&hisdata=&_t=1682397718606&req=2&csor=0')
//     console.log(res)
// })()
