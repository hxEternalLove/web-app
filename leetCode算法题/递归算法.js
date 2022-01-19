// ## 1.求参数之和
let res = add(1,2)(3)(4)();
function add(...arguments) {
    if (arguments.length === 0) {// 第一次调用无参数，直接返回0
        return 0;
    }
    let res = arguments.reduce((res,i)=>res+i);
    let getFunc = (...argus)=>{
        if (argus.length === 0) {
            return res;
        }
        res = argus.reduce((a,i)=>a+i, res);
        return getFunc;
    }
    return getFunc;
}
// ## 2.平行数组与树结构相互转化
let data = [
    {id:1,value:'1-bakjsbdk'},
    {id:2,value:'2-bakjsbdk',par:1},
    {id:3,value:'3-bakjsbdk',par:1},
    {id:4,value:'4-bakjsbdk',par:3},
    {id:5,value:'5-bakjfusbdk',par:1},
    {id:6,value:'6-bakjsbdk',par:2},
    {id:7,value:'7-bakjsbdk',par:3},
    {id:8,value:'8-bakjsbdk',par:4},
    {id:9,value:'5-bakjfusbdk',par:8},
    {id:10,value:'6-bakjsbdk'},
    {id:11,value:'7-bakjsbdk',par:9},
    {id:12,value:'8-bakjsbdk',par:10},
]
// 递归方法
function arrToTreeByRec(list) {
    let newArr = [];
    let addChild = (node,datalist)=>{
        const childs = datalist
            .filter(item=>item.par===node.id)
            .map(item=>addChild(item, datalist));
        return {...node, childs};
    }
    newArr = list.filter(item=>!item.par)// 获取树的根节点
        .map(item => addChild(item,list));
    return newArr;
}
console.log(arrToTreeByRec(data));
// 非递归方法
function arrToTreeByObj(list) {
    let treeList = [], map = {};
    list.forEach((item)=>{
        if (!item.childs) {
            item.childs = []
        }
        map[item.id]=item
    });
    list.forEach((item)=>{
        let par = map[item.par];
        if (par) {
            par.childs.push(item)
        } else {// 将根节点加进去。
            treeList.push(item)
        }
    })
    return treeList;
}
arrToTreeByObj(data);
/** 树变平行数组 */
function treeToArrByRec(nodeArr) {
    let list = [];
    nodeArr.forEach(node=>{
        nodeToTree = (node)=>{
            let { childs, ...item } = node;
            list.push(item);
            childs.forEach(child=>nodeToTree(child,list));
            return list;
        }
        nodeToTree(node)
    })
    
    return list;
}
treeToArrByRec(arrToTreeByRec(data));
// ## 3.小数精度计算
function computeFloat(num1,num2,s) {
    let arr1 = num1.toString().split('.'),
        arr2 = num2.toString().split('.'),
        mult1 = arr1[1]?arr1[1].length:0,
        mult2 = arr2[1]?arr2[1].length:0,
        count = mult1 - mult2;
    if (count>0) {// 
        num1 = arr1[0]+arr1[1]
        num2 = arr2[0]+arr2[1]+add0byCount(count);
    } else {
        num1 = arr1[0]+arr1[1]+add0byCount(count);
        num2 = arr2[0]+arr2[1];
    }

    function add0byCount(count) {
        count = Math.abs(count);
        console.log(count);
        let str = '';
        for (let i = 0; i < count; i++) {
            str = str+'0';
        }
        return str;
    }

    let mult = Math.pow(10, Math.max(mult1,mult2));
    num1 = Number(num1);num2 = Number(num2);
    switch (s) {
        case '+':
            return (num1+num2)/mult
            break;
        case '-':
            let res;
            num1-num2? (res=(num1-num2)/mult) : (res='-'+(num2-num1)/mult);
            return res;
            break;
        case '*':
            return (num1*num2)/(mult*mult)
            break;
        case '/':
            return (num1/num2)
            break;
        default:
            return undefined;
            break;
    }
}
// ## 4.数组扁平化
let arr = [
    12,
    [
        12,34,56,
        [
            23421,32432,213,
            [112,4545,5454],
            [112,4545,5454]
        ],
        [112,4545,5454]
    ],
    [112,4545,5454],
    123
]
function toLineArr(list) {
    return list.reduce((arr,item)=>Array.isArray(item)?[...arr,...toLineArr(item)]:[...arr,item], [])
}


function totree(list) {
    // **递归方法**
    // 第一步创建添加子节点的函数，并传入两个参数：父节点node、子节点所在的数据datalist
    let addChildren = (node,datalist)=>{
        // 第二步过滤筛选出当前node的子节点，并返回obj:{...node, children}
        let children = datalist.filter(item=>item.par===node.id)
            .map(item=>addChildren(item,datalist))
        return {...node, children}
    }
    // 第三步过滤筛选出根节点，并为每一个根节点添加子节点。返回最终结果。
    let reclist = list.filter(item=>!item.par)
                .map(item=>addChildren(item,list))
    
    // **非递归方法**
    // 第一步创建新数组和一个obj对象,并将原数据中的唯一id作为obj的key做映射关系
    let newlist = [], obj = {};
    list.forEach(item=>obj[item.id]=item);
    // 第二步找出在数据中根据子节点中的par，归纳在obj中的父节点里。没有的直接加进newlist中
    list.forEach(item=>{
        item.children?item.children:item.children=[];
        item.par?obj[item.par].children = item:newlist.push(item)
    })
    return newlist || reclist;
}
totree(data)