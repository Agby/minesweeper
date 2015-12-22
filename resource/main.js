var React = require('react');
var Board = require('./components/Board');

React.render(
   	<div>
   		<Board/>
	</div>,
   	document.getElementById('minesweeper')
   	//就是說把component  render 到 index.heml裡面ID叫做 minesweeper的dom
);