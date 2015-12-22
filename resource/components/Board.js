var React = require('react');
var Reflux = require('reflux');
var BoardStore = require('../stores/BoardStore');
var Action = require('../actions/Actions');
var Rect = require('./Rect');
var Dialog = require('./Dialog');
var Board = React.createClass({
	mixins: [Reflux.connect(BoardStore)],

	renderRect: function() {//set index
		var rects = this.state.rects.map(function(obj, index) {
			return (
				<Rect key={index} index={index} rectInfo={obj} />
			);
		});

		return rects;
	},
	renderResultDialog: function() {
		if (!this.state.isAlive) {//死翹翹
			return (
				<Dialog message='Game Over !!' />
			);
		}
		if (this.state.minecount=="0" && this.state.mine_num=="0") {//Win
			return (
				<Dialog message='Win!!' />
			);
		}
	},
	renderbombNum: function(){
		return(
				<div className='MineCount'>＊{this.state.mine_num}</div>
			);
	},
	componentWillMount: function() {//準備要把class繪製到到html之前，這個方法只會呼叫到一次。

	},
	componentDidMount: function() {//元件繪製成功了，已經顯示在dom上面了如果我們要開始操控動畫或是
		                           //做一些變化的時候就可以在這裡面加入功能，這個方法只會呼叫到一次。
	},
	render: function() {
		return (
			<div>
				{this.renderbombNum()}
				<div id="abc" className='board'>
					{this.renderRect()}
					{this.renderResultDialog()}
				</div>
			</div>
			
		);
	}

});
module.exports = Board;