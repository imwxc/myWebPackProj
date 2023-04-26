
// 手写call函数
// 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
// 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
// 处理传入的参数，截取第一个参数后的所有参数。
// 将函数作为上下文对象的一个属性。
// 使用上下文对象来调用这个方法，并保存返回结果。
// 删除刚才新增的属性。
// 返回结果。
Function.prototype.myCall = function (context, ...agrs) {
    if (typeof this !== "function") {
        console.error("type is not function!");
        return;
    }
    context = context || window;
    context.fn = this;
    let result = context.fn(...agrs);
    delete context.fn;
    return result;
};

// 手写apply 函数
// 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
// 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
// 将函数作为上下文对象的一个属性。
// 判断参数值是否传入, 传入则使用参数值， 未传入则不使用
// 使用上下文对象来调用这个方法，并保存返回结果。
// 删除刚才新增的属性
// 返回结果

Function.prototype.myApply = function (context, ...agrs) {
    if (typeof this !== "function")
        return console.error("type is not function!");
    context = context || window;
    context.fn = this;
    let result = null;
    if (agrs) {
        result = context.fn(...agrs);
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
};

// 手写bind函数
// 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
// 保存当前函数的引用，获取其余传入参数值。
// 创建一个函数返回
// 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。

Function.prototype.myBind = function (context, ...agrs) {
    if (typeof context !== "function")
        return console.error("type is not function!");
    let currFn = this;
    return function Fn() {
        return currFn.apply(
            this instanceof Fn ? this : context,
            agrs.concat(...arguments)
        );
    };
};