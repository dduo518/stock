

window.onload =function(){
    var stockData={};//一个股票一天的数据
    localStorage.data = stockData;

    var btn = document.getElementById('btn');
    var timer1;
    var timer2;
    init();
    btn.onclick = function(){
        if( timer2){
            clearInterval(timer2)
            console.log('aaa')
        }
        //获取数据
        var time = new Date();
        //将时间固定
        var timeDelay = time;
        //当前数据
        var currentData ;
        //前面一条数据
        var prevData;
        var num = document.getElementById('stockNumber').value;
        if(num && (!isNaN(num))){
        timer2 = setInterval(function(){
                num = num;
                console.log(num)
                submit(num).then(function(data){
                     // stockData.push(data);
                     
                     stockData[time] = data;

                     //将时间重新定位
                     time = new Date();
                     console.log('======即时数据')
                     console.log(data)
                })
                },3000) 
       }

       //停止键
       document.getElementById('stop').onclick = function(){
            clearInterval(timer1)
            clearInterval(timer2)
            console.log('stockDat---------a')
            console.log(stockData)
            console.log('stockDat---------a')
       }


       //异步执行数据
       var x_rateTotal=0,y_rateTotal=0;
       var x1=0,y1=0;
       var x2=0,y2=0;
       var x3=0,y3=0;
       var x4=0,y4=0;
       var x5=0,y5=0;
       var x_currentPri = 0, y_currentPri = 0;

        var  cfg1 = {
                lineWidth :.2,  //线条宽度
                styleColor:'green',   //线条颜色
                X0:0,           //线条起点X
                Y0:250            //线条起点Y
           }
        var  cfg2 = {
                lineWidth :.2,  //线条宽度
                styleColor:'yellow',   //线条颜色
                X0:0,           //线条起点X
                Y0:250            //线条起点Y
           };
        var  cfg3 = {
                lineWidth :.2,  //线条宽度
                styleColor:'#000',   //线条颜色
                X0:0,           //线条起点X
                Y0:250            //线条起点Y
           };
        var  cfg4 = {
                lineWidth :.2,  //线条宽度
                styleColor:'#CCC',   //线条颜色
                X0:0,           //线条起点X
                Y0:250            //线条起点Y
           };
        var  cfg5 = {
                lineWidth :.2,  //线条宽度
                styleColor:'blue',   //线条颜色
                X0:0,           //线条起点X
                Y0:250            //线条起点Y
           };
        var  cfg_rateTotal = {
                lineWidth :.2,  //线条宽度
                styleColor:'red',   //线条颜色
                X0:0,           //线条起点X
                Y0:250            //线条起点Y
           };
        var  cfg_currentPri = {
                lineWidth :.2,  //线条宽度
                styleColor:'#000',   //线条颜色
                X0:0,           //线条起点X
                Y0:250            //线条起点Y
           };
           
       //将数据画到画布上
       setTimeout(function(){
            b=5;//x轴移动位移
            var a=1;
           timer1 = setInterval(function(){
            //获取前3s数据
             console.log(' 获取俩条不同数据')
             prevTime = new Date(new Date(timeDelay)-3000)
             prevData = stockData[prevTime];
             currentData = stockData[timeDelay];
             timeDelay = time;
             if(currentData){
                 var rate = _dealData(currentData);
                console.log(rate)
                 // lineCxt(stockData[stockData.length-1]);
                 // 每3S请求一次数据，那么一天就有4*3600/3=4800条数据;
                 // 1872px 要均分4800  =0.4
                 // 每次x轴向右移动 0.39
                     x1 += b;  
                     y1 = 250+rate.rate1*10;
                     x2 += b;  
                     y2 = 250+rate.rate2*10;
                     x3 += b;  
                     y3 = 250+rate.rate3*10;
                     x4 += b;  
                     y4 = 250+rate.rate4*10;
                     x5 += b;  
                     y5 = 250+rate.rate5*10;
                     x_rateTotal += b;  
                     y_rateTotal = 250+rate.rateTotal*10;
                     x_currentPri += b;  
                     y_currentPri = 250+currentData.currentPri*50;
                 console.log(y1,y2,y3,y4,y5,y_rateTotal)
                 cfg_rateTotal = lineCtx(x_rateTotal,y_rateTotal,cfg_rateTotal);
                 // cfg5 = lineCtx(x5,y5,cfg5);
                 // cfg4 = lineCtx(x4,y4,cfg4);
                 // cfg3 = lineCtx(x3,y3,cfg3);
                 // cfg2 = lineCtx(x2,y2,cfg2);
                 // cfg1 = lineCtx(x1,y1,cfg1);
                 cfg_currentPri = lineCtx(x_currentPri,y_currentPri,cfg_currentPri);
             }
           },3000);
       },3000)
    }

    
    // 设定画布大小
    var cfg = {
        width:30000,
        height:1000,
        'color':'#CCC'
    }
    //创建画布
    var body = document.getElementById('weather');
    body.appendChild(createCanvas(cfg))


    //画点连线
    function lineCtx(x,y,cfg){
        //默认设置
       var  defaultCfg = {
            lineWidth :.5,  //线条宽度
            styleColor:'red',   //线条颜色
            X0:0,           //线条起点X
            Y0:0            //线条起点Y
       }

        defaultCfg = _extend(defaultCfg,cfg);

        defaultCfg.x=x;
        defaultCfg.y=y;

        defaultCfg = _actionLine(defaultCfg);
        return defaultCfg;
    }

    function submit(num){
        var stockNum =  _klass(num);
        var promise = new Promise(function(resolve,reject){
            if(stockNum){  
                city =stockNum;
                var url = 'http://hq.sinajs.cn/list='+city;
                 _httpRequest( url, _showWeather ).then(function(data){
                    resolve(data);
                 });
                     
            } 
        });
        return promise;
    }

    // 构建基本的画布
    function createCanvas(cfg){
        //默认宽高
        var defaultCfg = {
                width:1000,
                height:600,
                'color':'green',
                lineWidth:5
            }
         defaultCfg = _extend(defaultCfg,cfg)
        var canvas = document.createElement('canvas');
            canvas.width = w =defaultCfg.width;
            canvas.height = h =defaultCfg.height;
        var ctx = canvas.getContext('2d');

        //绘制网格线
        //以 一个小时为时间节点
        var step = 5;
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = defaultCfg.lineWidth;
        ctx.strokeStyle= defaultCfg.color;
        for(var i = 0 ; i<step ;i++){
            var x = ((w/4)*i)+100; //加40 x轴起点 40
           
            ctx.moveTo(x,0);
            ctx.lineTo(x,h);

        }
        ctx.stroke();
        ctx.restore()

        var step = 5;
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = defaultCfg.lineWidth;
        ctx.strokeStyle= defaultCfg.color;
        for(var i = 0 ; i<step ;i++){
            var y = ((h/4)*i);
           
            ctx.moveTo(0,y);
            ctx.lineTo(w,y);

        }
        ctx.stroke();
        ctx.restore()

        return canvas
    }

    //启动前端交互
    function init(){
        var timer3,timer4;
        //输入框
        document.getElementById('btnFlag').onclick = function(ev){
            var ev = ev;
                timer3 = setInterval(function(){
                    var left = document.querySelector('.inputSub').offsetLeft;

                    if(left<0){
                        left = left + 20;
                        left > 0 ? left = 0 : left;
                        document.querySelector('.inputSub').style.left=left+'px';

                    }else{
                        clearInterval(timer3);
                    }
                },30)
            document.querySelector('.mask').style.display='block';

            ev.stopPropagation()
            return false;
        }
       document.querySelector('.mask').onclick = function(){

             timer4 = setInterval(function(){
                    var left = document.querySelector('.inputSub').offsetLeft;

                    if(left>-250){
                        left = left - 20;
                        document.querySelector('.inputSub').style.left=left+'px';

                    }else{
                        clearInterval(timer4);
                    }
                },30)
            this.style.display = 'none';
        }
    }
    
}

//数据处理 
//前6S数据prevData
//前3S数据currentData
function _dealData(currentData){
    var rate = {};
    rate.name = currentData.name;
    rate.rate1 = (currentData.buy1/currentData.sale1);//1档买卖比
    rate.rate2 = (currentData.buy2/currentData.sale2);//2档买卖比
    rate.rate3 = (currentData.buy3/currentData.sale3);//3档买卖比
    rate.rate4 = (currentData.buy4/currentData.sale4);//4档买卖比
    rate.rate5 = (currentData.buy5/currentData.sale5);//5档买卖比
    rate.rateTotal = ((currentData.buy1+currentData.buy2+currentData.buy3+currentData.buy4+currentData.buy5)/(currentData.sale1+currentData.sale2+currentData.sale3+currentData.sale4+currentData.sale5));
    return rate;
}

//替换默认值
function _extend(cfg,newCfg){
    for(i in cfg){
        if(cfg[i] != newCfg[i]){
            cfg[i] = newCfg[i]
        }
    }
    return cfg;
}

// 判断沪深两市
function _klass(num){
    var index = String(num).substring(0,1);
    //沪市 6开头 
     //深市 0 3 开头
   if(index == 6){
        num = 'sh' + num;
   }else if( index==0 || index == 3){
        num = 'sz' + num
   }else{
    return false;
   }
    return num;
}
//发送请求数据
function _httpRequest(url, callback){
    var promise = new Promise(function(resolve,reject){

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var res = xhr.responseText;
                // 把resolve 方法传进回调中，成功之后执行promise的resolve方法
                callback(resolve,res);
            }
        }
        xhr.send();
    })
    return promise;
}

//请求数据处理
function _showWeather(resolve,result){
    var data={};
    if(result && typeof result ==='string'){
        var index = result.indexOf('=');
        if(index!=-1){
            var str =  result.substring(index+2,result.length-2);
            
            var dataArr = str.split(',');
            //数据载入对象中
            var klassList = ['name','todayPri','yesstadayPri','currentPri','hightPri','lowPri','15.66','15.67','VOL','Turnover',
                'buy1','buy1Pri','buy2','buy2Pri','buy3','buy3Pri','buy4','buy4Pri','buy5','buy5Pri','sale1','sale1Pri',
                'sale2','sale2Pri','sale3','sale3Pri','sale4','sale4Pri','sale5','sale5Pri','date','time','lastData'];
            
            dataArr.map(function(el,i){
                data[ klassList[i] ] = el;
            })
        }
    }else{
        return false; 
    }
    //执行成功返回promise对象中
    resolve(data)
}
// canvas划线
function _actionLine(defaultCfg){
    var canvas = document.getElementById('weather').children[0];
    var ctx = canvas.getContext('2d')
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = defaultCfg.lineWidth;
    ctx.strokeStyle= defaultCfg.styleColor;            
    ctx.moveTo(defaultCfg.X0+100,defaultCfg.Y0);
    ctx.lineTo(defaultCfg.x+100,defaultCfg.y);
    ctx.stroke()
    ctx.restore()
    defaultCfg.X0=defaultCfg.x;
    defaultCfg.Y0=defaultCfg.y;
    return defaultCfg;
}