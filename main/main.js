
function printInventory(inputs){
    //printInventory函数，该函数能够将指定格式的数据作为参数输入，然后在浏览器的控制台中输出结算清单的文本。
    let allItems = loadAllItems();
    //loadAllItems()方法获取全部的商品，该方法返回结果为一个包含了商品对象的数组
    //console.log(allItems);
    let promotions = loadPromotions()[0].barcodes ;
    //loadPromotions()方法获取全部的促销信息，该方法返回结果为一个包含有促销信息对象的数组
    //console.log(promotions);
    let sum = [];
    let sum1 = 0;
    let sum2 = [];
    let sum3 = 0;
    let list = [];
    let list1 = '';
    let promotion = [];
    let promotion1 = '';
    let obj_inputs = {};
    for(let item of inputs){
        if(item.length !== 10){  
            let arr = item.split('-');
            if(!obj_inputs[arr[0]]){
                obj_inputs[arr[0]] = arr[1] ;
            }else{
                obj_inputs[arr[0]] += arr[1] ;
            }
        }else{
            if(!obj_inputs[item]){
                obj_inputs[item] = 1 ;
            }else{
                obj_inputs[item] ++ ;
            }   
        }
    }
    //console.log(obj_inputs);

    for(let item of allItems){
        //console.log(item.barcode); 
         for(let key in obj_inputs){
            //console.log(key);
            if(promotions.indexOf(key)!== -1){
                if(obj_inputs[key] >= 3){
                    if(item.barcode === key){
                        sum1 = item.price * (obj_inputs[key] - parseInt(obj_inputs[key]/3));
                        //console.log(sum1);
                        sum.push(sum1)
                        sum3 = item.price * parseInt(obj_inputs[key]/3);//节约金额
                        //console.log(sum3);
                        sum2.push(sum3);
                        
                        list1 = '名称：'+item.name+',数量：'+obj_inputs[key]+'瓶,'  +
                        '单价'+item.price+'元,'+  '小计：'+sum1+'元'+'\n'
                        list.push(list1);
                        promotion1 = '名称：'+item.name  +',数量：'+parseInt(obj_inputs[key]/3)+'瓶'+'\n'
                        promotion.push(promotion1);
                        //console.log(promotion);
                        //console.log(list1);
                    } 
                }
            }else{
                if(item.barcode === key){
                    sum1 = item.price * (obj_inputs[key]);
                    sum.push(sum1);
                    list1 = '名称：'+item.name+',数量：'+obj_inputs[key]+'瓶,'+
                    '单价'+item.price+'元,'+'小计：'+sum1+'元'+'\n'
                    list.push(list1);
                    //console.log(list1);
                }    
            }  
    }
   }

let Sum = sum.reduce(function(x,y){
    return x+y;
})
let Sum2 = sum2.reduce(function(x,y){
    return x+y;
})

  List = '***<没钱赚商店>购物清单***\n'+list[0]+list[1]+list[2]+'----------------------\n'+'挥泪赠送商品：\n'
   +promotion[0]+promotion[1]+'----------------------\n' + '总计:'+Sum.toFixed(2)+'元'+'\n'+'节省:'+Sum2.toFixed(2)+'元'+'\n'+ '**********************';
   console.log(List);
}

function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}
const inputs = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
];
printInventory(inputs);
module.export = printInventory;