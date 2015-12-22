var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var BoardStore = Reflux.createStore({
	listenables: Actions,
	init:function(){
		this.SetBoard(20,50);
	},
	getInitialState: function() {
		return {
			mine_num : 50,
            col_num : 20,
			rects: this.rects,
			isAlive: true,
			minecount : 50
		}
	},
	SetBoard:function(col_num,boom_num){
		var col_num = parseInt(col_num);  //可以解決不定型問題
		var boom_num = parseInt(boom_num);
		console.log(col_num,boom_num)
		this.rects = [];
		var booms = [];//地雷的index陣列喔
		var grid_num = col_num * col_num;//20*20 長乘寛
		while (booms.length < boom_num) {//如果地雷數量還不夠 地雷是放在booms這個陣列裡面
			var boom_index = Math.floor((Math.random() * (grid_num - 1)));	// Math.floor無條件捨去 get random num from 0 to 399
			if (booms.indexOf(boom_index) < 0) {// 1  就是找booms裡面有沒有boom_index這個值 如果沒有 就傳回-1 
				booms.push(boom_index);//然後就丟進去
			}
		}

		// init rects
		var cols=0, rows = 0;
		for (var i=0; i < grid_num; i++) {
			var boom = (booms.indexOf(i) > -1) ? true : false;  //  (條件 )? 成立 :不成立
			var loc = {  //宣告一個儲存二維空間的物件
				x: cols,
				y: rows
			};
			
			this.rects.push({
				isBoom: boom,		// is boom here?  
				isActive: true,		// is rect active 
				status: 0,			// 0: default, 1: flag, 2: unknow
				neighbor:0,	// neighbor contain boom num, default: 0
				loc: loc,			// (x, y) location on grid board
			});

			if ((cols + 1) % col_num == 0) { //給予X跟Y
				cols = 0;
				rows++;
			} else {
				cols++;
			}
		}

		for(var i=0;i<grid_num;i++){
			// console.log(i);
			if(this.rects[i].isBoom == true){ 
				//console.log(this.rects[i].isBoom);
				for(var j = -1; j < 2; j++){
					//console.log(this.rects[i].loc);
					if((i % col_num) + j < col_num && (i % col_num) + j > -1 ){//右邊界/左邊界/
						//console.log(i / col_num);
						if(j!=0)//如果不是自己
							this.rects[i + j].neighbor++;
						if(Math.floor( i / col_num) > 0 )//上邊界
							this.rects[i - col_num + j].neighbor++;
						if(Math.floor( i / col_num) < col_num - 1 )//下邊界
						{
								//console.log(parseInt(i) + parseInt(col_num) +parseInt(j));
								this.rects[i + col_num +j].neighbor++;
								//這行不知道為什麼如果不用ParseInt有很大機會判斷成字串相加
						}

					}
				}
			}
		}

		this.trigger({
			rects: this.rects,
			isAlive: true,
			mine_num:boom_num,
			col_num:col_num,
			minecount:boom_num
		});
	},
	onInputChange:function(i,value){
		var value =  parseInt(value);
		//console.log("i: "+i+" value :"+value+"  X:"+this.init.col_num+"  Y:"+this.mine_num);
		switch (i) {
 			case "col_num":
 				this.trigger({col_num : value});
 				break;
 			case "mine_num":
 				this.trigger({mine_num : value});
 				break;
 		}
 		console.log("Changeup i: "+i+" value :"+value+"  X:"+this.init.col_num+"  Y:"+this.mine_num);
	},
	onRectMouseClick: function(index,triglock,col_num,) {
		var index = parseInt(index);
		var col_num = parseInt(col_num);
		if (this.rects[index].isBoom) {
			this.isAlive = false;
			this.trigger({
				isAlive: this.isAlive,
			});
		}
		this.rects[index].isActive = false;
		//上下左右跟著啟動噢
		if(this.rects[index].neighbor == 0 && this.rects[index].isBoom==false && this.rects[index].status == 0){
			if((index % col_num) + 1 < col_num && this.rects[index + 1].isActive == true && this.rects[index+1].status == 0)//右邊界
				this.onRectMouseClick(index + 1,false,col_num);
			if((index % col_num) - 1 > -1 && this.rects[index - 1].isActive == true && this.rects[index-1].status == 0)//左邊界
				this.onRectMouseClick(index - 1,false,col_num);
			if(Math.floor(index / col_num) > 0 && this.rects[index - col_num].isActive == true && this.rects[index - col_num].status == 0)//上邊界
				this.onRectMouseClick(index - col_num,false,col_num);
			if(Math.floor(index / col_num) < (col_num - 1) && this.rects[index + col_num].isActive == true && this.rects[index + col_num].status == 0)//下邊界
				this.onRectMouseClick(index + col_num,false,col_num);
		}
		if(triglock==true){
			this.trigger({
				rects: this.rects
			});
		}
	},
	onRectMouseRightClick: function(index,mine_num,minecount) {
		var value=parseInt(mine_num);
		var minecount = parseInt(minecount);
		if (this.rects[index].status == 2) {
			value++;
			this.rects[index].status = 0;
			if(this.rects[index].isBoom == true)
			{	
				console.log(this.rects[index].isBoom);
				minecount++;
			}
		} 
		else {
			this.rects[index].status++;
			if(this.rects[index].status == 1)
				value--;
			if(this.rects[index].isBoom == true)
			{
				console.log(this.rects[index].isBoom);
				minecount--;
			}
		}
		this.trigger({
			mine_num: value,
			rects: this.rects,
			minecount:minecount
		});
		
	},
	onResetGame: function(col_num,mine_num) {
		this.SetBoard(col_num,mine_num);
	}
});

module.exports = BoardStore;