// eventLoop 应用-宏-微
console.log('666');

Promise.resolve()
    .then(() => {
        console.log('0');
    })
    .then(() => {
        console.log('1');
        return Promise.resolve(2)// 相当于两个.then
    })
    //  Promise.resolve(2).then()
    .then((res) => { console.log(res); })

async function sy1() {
    await sy2();

    console.log('8');
}
function sy2(){
    console.log('9');
}
sy1()

setTimeout(() => {
    console.log('12');
})

new Promise((resolve, reject) => {
    console.log('3');
    resolve(10)// 相当于  Promise.resolve(10)。属于同步线程直接传给下一个.then
}).then((res) => {
    console.log(res);
})

Promise.resolve()
    .then(() => console.log('4'))
    .then(() => console.log('5'))
    .then(() => console.log('6'))
    .then(() => console.log('7'))
// 666 9 3 0 8 10 4 1 5 6 7 2 12
/**
第一次同步线程: 【666】 0->mic 【9】 8->mic 12->mac 【3】 10res->mic 4->mic
二次：         【0】 1->mic 【8】 【10】 【4】 5->mic
三次：         【1】 v2-1->mic 【5】 6->mic
四次：         【v2-1】 v2-2->mic 【6】 7->mic
五次：         【v2-2】 2->mic 【7】
六次：         【2】 【12】
*/


// 获取 str 中出现次数最多的字符
function getMoreTimes(str){
    let obj = {},res={'str':'',num:1};
    str.split('').forEach((i)=>{
        if(obj[i]){obj[i]+=1;}
        else obj[i]=1;
    })
    for(k in obj){
        obj[k]>res.num?res.str=k:null;
    }
    return res.str
}
console.log(getMoreTimes('1111222222'))

const fixMax = (str) => {
    const arr = str.split('')
    const obj = new Object()
    arr.forEach((item)=>{
        obj[item]
            ?obj[item] = ++obj[item]
            :obj[item] = 1
    })
    let k = arr[0]
    let v = 1
    for (const key in obj) {
        if (Object.hasOwnProperty(key)) {
            obj[key] > v ? (v = obj[key]) && (k = key) : null   
        }
    }
    return { item: k, num: v}
}
fixMax('1111222222');
