define(
	[
		'common/components/comp_msgbox/comp_msgbox',
		'css!./frame_remind.css',
		'css!./frame_remind_theme_default.css'
	],
	function(msgbox) {

		'use strict';

		var frameRemind = Ember.Object.extend({
			_timer: null,
			_hasPopop: false,
			queryInterval: 3,
			remindList: null,
			msgbox: null,
			showLength: 5,
			init: function() {
				this.remindList = [];
				this.msgbox = msgbox.create({
					options: {
						className: 'frame-remind',
						closeButton: false
					}
				});
				this._queryRemind();
				this._timer = setInterval(this._queryRemind.bind(this), this.queryInterval * 1000);
			},
			willDestroy: function() {
				this.msgbox.destroy();
				clearInterval(this._timer);
			},
			_queryRemind: function() {},
			_getTitle: function(remindList) {
				var prompt = this.remindList.length > this.showLength ? Ember.oloc('frame_remind_qnt').format(this.showLength) : '';
				return Ember.oloc('frame_remind_sd') + this.remindList.length +
					(remindList.length === 1 ? Ember.oloc('frame_remind_tx') : Ember.oloc('frame_remind_txs')) + ' ' +
					prompt;
			},
			_getMsg: function(remindList) {
				var message = '<p  class="frame-remind-item">';
				message += remindList.map(function(item, i) {
					var str = '<span class="frame-remind-index">' + (i + 1) + '</span>' + item.content + '</p>';
					if(i < remindList.length - 1) {
						str += '<p class="frame-remind-item">';
					}
					return str;
				}).join('');
				return message;
			},
			_getCurrentRemind: function() {
				if(this.remindList.length < this.showLength) {
					return this.remindList;
				} else {
					return this.remindList.slice(0, this.showLength);
				}
			},
			_showRemind: function() {
				var remindList = this._getCurrentRemind();
				this._hasPopop = true;
				this.msgbox.showDialog({
					message: this._getMsg(remindList),
					title: this._getTitle(remindList),
					buttons: {
						ok: {
							label: Ember.oloc('comp_msgbox_qd'),
							className: 'comp-msgbox-button-active comp-msgbox-button',
							callback: function() {
								this._hasPopop = false;
								this._confirmRemind(remindList.getEach('id'));
							}.bind(this)
						}
					}
				});
			},
			_confirmRemind: function(ids) {}
		});
		return frameRemind.create();
	}
);