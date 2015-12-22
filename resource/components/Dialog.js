var React = require('react');
var Reflux = require('reflux');
var Action = require('../actions/Actions');
var BoardStore = require('../stores/BoardStore');

var Dialog = React.createClass({	
	mixins: [Reflux.connect(BoardStore)],
    ColChange: function(event){
        Action.inputChange("col_num",event.target.value);
        this.setState({col_num: event.target.value});
    },
    MineChange: function(event){
        Action.inputChange("mine_num",event.target.value);
         this.setState({mine_num: event.target.value});  
    },
 	handleClick: function(e) {
 		var wh=this.state.col_num*25+"px";
 		var maxnum =this.state.col_num*this.state.col_num-1;
 		switch (e.target.className) {
 			case 'btn':
 			if(this.state.mine_num < maxnum){
 				Action.resetGame(this.state.col_num,this.state.mine_num);
 				document.getElementById( "abc" ).style.width = wh; //作弊
 				document.getElementById( "abc" ).style.height = wh; //作弊2
 			}
 			else
 				alert("地雷太多啦!");
 			break;
 		}
 	},
	render: function() {		
		var maxnum =this.state.col_num*this.state.col_num-1;
		return (
			<div className='mask center'>
				<div className='dialog center' onClick={this.handleClick} >	
					<div className='message'>{this.props.message}</div>
				    <div className='CInput'>ColNum : <input  className='inputClass' min='2' max='40' type='number'  defaultValue={this.state.col_num} onChange={this.ColChange}/></div>
				    <div className='CInput'>MineNum : <input className='inputClass' type='number' min="1" max={maxnum} defaultValue={this.state.mine_num} onChange={this.MineChange} /></div>
					<div className='btn'>Next</div>
				</div>
			</div>
		);
	}
});

module.exports = Dialog;