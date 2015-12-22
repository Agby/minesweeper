var React = require('react');
var Reflux = require('reflux');
var Action = require('../actions/Actions');
var classnames = require('classnames');
var BoardStore = require('../stores/BoardStore');

var Rect = React.createClass({	
	mixins: [Reflux.connect(BoardStore)],
 	handleClick: function(e) {
 		if (this.props.rectInfo.isActive && this.props.rectInfo.status == 0)
 			Action.rectMouseClick(this.props.index,true,this.state.col_num);
 	},
 	handleRightClick: function(e) {
 		if (this.props.rectInfo.isActive)
 			Action.rectMouseRightClick(this.props.index,this.state.mine_num,this.state.minecount);
		e.preventDefault();
 	},
	render: function() {
		var props = this.props.rectInfo;
		var val = (props.neighbor > 0 && !props.isActive && props.isBoom == false) ? props.neighbor : '';
		return (
			<div className={classnames('rect center', {empty:  (!props.isActive && props.isBoom==false), 
										               flag:   (props.isActive && props.status == 1), 
										               unknow: (props.isActive && props.status ==2),
										               boom:   (!props.isActive && props.isBoom==true)})} 
				onClick={this.handleClick} 
				onContextMenu={this.handleRightClick} >
				{val}
			</div>
		);
	}
});

module.exports = Rect;