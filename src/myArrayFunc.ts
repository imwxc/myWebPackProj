// 实现数组乱序输出
function shuffle(array: number[]) {
    for (let i = array.length - 1; i >= 0; i--) {
        let a = array[i];
        let target = Math.floor(Math.random() * array.length);
        array[i] = array[target];
        array[target] = a;
    }
    return array;
}

// console.log(shuffle([1,2,3,4,5,6,7,8,9]))

// 实现数组求和
function reduceArray(array: any[]) {
    return array
        .toString()
        .split(",")
        .reduce((total, i) => (total += +i), 0);
}

// console.log('reduceArray',reduceArray([1,2,3,4,[5,[6,7,[8,[9],10],11,12],13,14,15],16]))

// 实现数组扁平化
// 递归实现
function flatten(array: any[] | number[], depth: number) {
    if (!depth) return array;
    let result: any[] = [];
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === "number") {
            result.concat(array[i]);
        }
        if (Array.isArray(array[i])) {
            let tempRes = flatten(array[i], --depth);
            result = result.concat(tempRes);
        }
    }
    return result;
}

// console.log([1, [2, [3, 4, 5]]], '\n',flatten([1, [2, [3, 4, 5]]], 1))

// 数组去重
function unique(array: number[]) {
    // es6
    // return Array.from(new Set(array))

    // es5
    let map: any = {};
    for (let i = 0; i < array.length; i++) {
        if (!map[array[i]]) {
            map[array[i]] = i;
        }
    }
    return Object.keys(map).map((i) => +i);
}

// console.log(unique([1,2,3,3,3,3,4,4,5,5,6]))

// 实现array flat
// @ts-ignore
Array.prototype.myFlat = function (depth) {
    let arr = this;
    if (!Array.isArray(arr) || depth <= 0) {
        return arr;
    }
    return arr.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
            // @ts-ignore
            return prev.concat(cur.myFlat(depth - 1));
        } else {
            return prev.concat(cur);
        }
    }, []);
};
// @ts-ignore
// console.log([1,2,3,4,[5,6,[7]]].myFlat(1))

// 实现array push
// @ts-ignore
Array.prototype.myPush = function () {
    let agrs = arguments;
    for (let i = 0; i < agrs.length; i++) {
        this[this.length] = agrs[i];
    }
    return this.length;
};
// @ts-ignore
// console.log([1,2,3].myPush(4,5,6,7))

// 实现 array filter
// @ts-ignore
Array.prototype.myFilter = function (callBack) {
    let arr: Array<number> = this;
    let res: Array<number> = [];
    for (let i = 0; i < arr.length; i++) {
        if (callBack(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
};
// @ts-ignore
// console.log([1,2,3,4,5,6,7,8,9].myFilter((i)=>i>4))

// 实现数组的map
// @ts-ignore
Array.prototype.myMap = function (callBack) {
    let arr: any[] = this;
    let res: Array<any> = this;
    for (let i = 0; i < arr.length; i++) {
        res.push(callBack(arr[i]));
    }
    return res;
};
// 实现数组的reduce
// @ts-ignore
Array.prototype.myReduce = function (
    callBack: (arg1: any, arg2: any, arg3: number, arg4: any[]) => any,
    initVal: any
) {
    // 没有初始化变量时, 默认使用数组第0个元素进行初始化
    let accu = initVal === undefined ? this[0] : initVal;
    // 如果是使用第0个元素初始化的话,就从第一个元素开始遍历
    for (let i = initVal === undefined ? 1 : 0; i < this.length; i++) {
        accu = callBack(accu, this[i], i, this);
    }
    return accu;
};
