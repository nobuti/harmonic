/* Author: nobuti */
function hex(c) {
	var m = /rgba?\((\d+), (\d+), (\d+)/.exec(c);
	return m ? '#' + ( m[1] << 16 | m[2] << 8 | m[3] ).toString(16) : c;
};

function Harmonic(element, amplitud, frecuencia){
	this.element = element;
	this.element.style['margin-left']=parseInt(this.amplitud)+'px';
	this.intervalo = 30;
	this.deg = 0;
	this.amplitud = amplitud;
	this.frecuencia = frecuencia;
	this.offset = 0;
	this.count = 0;
	this.memory = 0;
	this.sentido = '';
	this.colorOn = '#ff6600';
	this.colorOff = '#0099cc';
	return this;
}

Harmonic.prototype = {
	init: function(){
		this._events = [];
		this.triggered = false;
		this.update();
		return this;
	},
	bind: function(event, fn){
		if ( !event ) return;
		var space = /\s+/, parts = event.split(space),
			l = parts.length;
		while ( l-- ) {
			this._events[parts[l]] = this._events[parts[l]] || [];
			this._events[parts[l]].push(fn);
		};
		return this;
	},
	trigger: function(event){
		if ( !event ) return;
		var space = /\s+/, parts = event.split(space), _e = this.mix(this._events),	l = parts.length, arr, k, eventName, args = Array.prototype.slice.call(arguments,1);
		
		while ( l-- ){
			if (( eventName = parts[l] ) in _e ){
				arr = _e[eventName];
				k = arr.length || 0;
				while ( k-- ) {
					arr[k].apply(this,args);
				};
			}
		};
	},
	mix: function(object) {
		var o = {};
		for (var i in object){
			o[i] = object[i];
		}
		return o;
	},
	update: function(){
		this.deg += 10;
		this.offset = this.amplitud * Math.sin(this.frecuencia*this.radian(this.deg));
		var direction;
		if (this.memory > Math.abs(Math.ceil(this.offset)-this.amplitud)){
			direction = "up";
		} else {
			direction = "down";
		}
		this.memory = Math.abs(Math.ceil(this.offset)-this.amplitud);
		if (direction !== this.sentido && !this.triggered){
			this.sentido = direction;
			this.triggered = true;
			this.trigger('ding');
		} else {
			this.triggered = false;
		}
		this.element.style['margin-left'] = parseInt(this.amplitud + this.offset) + 'px';
		
		var self = this;
		setTimeout(function(){
			self.update();
		}, self.intervalo);
	},
	radian: function(value){
		return Math.PI*value/180;
	},
	change: function(){
		var search = this.element.style['backgroundColor'];
		if (!search){
			this.element.style['backgroundColor'] = this.colorOn;
		} else {
			var color = (hex(this.element.style['backgroundColor']) === this.colorOn) ? this.colorOff : this.colorOn;
			this.element.style['backgroundColor'] = color;
		}
	}
}


function listener(e){
	// Harmonic context
	this.change();
	// Uncomment to implement sound
	/*for (var i=0; i<audiochannels.length; i++) {
		var now = new Date();
		if (audiochannels[i]['finished'] < now.getTime()) {
			audiochannels[i]['finished'] = now.getTime() + document.querySelectorAll('audio')[0].duration*1000;
			audiochannels[i]['channel'].src = document.querySelectorAll('audio')[0].src;
			audiochannels[i]['channel'].load();
			audiochannels[i]['channel'].play();
			break;
		}
	}*/
}
// Uncomment to implement sound
/*var channel_max = 4*document.querySelectorAll('.bullet').length,
	audiochannels = new Array(),
	l = channel_max;

while (l--){
	audiochannels[l] = new Array();
	audiochannels[l]['channel'] = new Audio();
	audiochannels[l]['finished'] = -1;
}*/

var bullets = document.querySelectorAll('.bullet'),
	n = bullets.length,
	freq = 0.1;

while (n--){
	new Harmonic(bullets[n],200, freq).init().bind('ding', listener);
	freq += 0.05;
}