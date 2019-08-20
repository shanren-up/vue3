define(
	['comp_modal', 'jsplumb'],

	function(modal) {

		'use strict';

		var helper = Ember.Object.extend({
			init: function() {},
			willDestroy: function() {},
			/**
			 * modalName  名称
			 * componentName  名称
			 * parameters  {pictureId:1,windowId:1}
			 */
			openWindow: function(targetObject, modalName, componentName, parameters) {
				var self = this;
				modal.popup({
					targetObject: targetObject,
					//父对象，支持弹出多层
					isDefaultStyle: true,
					//是否默认样式
					sizeClass: 'trq-modal-size',
					//弹出框大小:large、small，或自定义整体样式
					headerClass: 'trq-modal-header',
					//自定义头部样式,
					bodyClass: 'trq-modal-body',
					//自定义内容样式
					// footerClass : 'bhz-comp-XXX-modal-footer' , //自定义底部样式
					hasHeader: true,
					//是否有头部，默认true
					headerText: modalName,
					//头部标题名称
					// headerComponentName : 'bhz-comp-XXX-modal-header', //头部组件
					contentComponentName: componentName,
					//内容组件
					parameters: parameters,
					hasFooter: false,
					//是否有底部，默认false
					confirmText: '关闭',
					//底部按钮名称
					enforceModality: true,
					top: 100,
					close: function() { //获取传递参数
						//var param = this.parameters;
					}
				});
			},
			getInstance: function(containerId) {
				var instance = jsPlumb.getInstance({
					DragOptions: {
						cursor: 'pointer',
						zIndex: 2000
					},
					ConnectionOverlays: [
						["Arrow", {
							location: 1
						}],
						["Label", {
							location: 0.1,
							id: "label",
							cssClass: "aLabel"
						}]
					],
					ReattachConnections: true,
					deleteEndpointsOnDetach: false,
					Container: containerId
				});

				instance.doWhileSuspended(function() {
					instance.draggable(jsPlumb.getSelector(".jsplumb-demo .window"), {
						grid: [20, 20]
					});
				});

				instance.bind("click", function(conn, originalEvent) {
					if(confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")) {
						instance.deleteConnection(conn);
					}
				});

				instance.bind("connection", function(info) {
					info.connection.getOverlay("label").setLabel(info.connection.id);
					//当连接成功后，将箭头上的label改为连接ID  
				});

				instance.bind("connectionDrag", function(connection) {
					console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
				});

				instance.bind("connectionDragStop", function(connection) {
					console.log("connection " + connection.id + " was dragged");
				});

				instance.bind("connectionMoved", function(params) {
					console.log("connection " + params.connection.id + " was moved");
				});

				// 立即生效  
				instance.fire("jsPlumbDemoNodeAdded", instance);

				return instance;
			},
			/** 
			 * [addEndpoint 添加端点] 
			 * @param {[type]} _instance      [流程图对象，必传] 
			 * @param {[type]} _id            [目标块id 可以是字符串或者id数组，必传] 
			 * @param {[type]} _sourceEndpoint 点样式
			 *  * @param {[type]} _targetEndpoint 点样式
			 * @param {[type]} _sourceAnchors [起点位置，数组，可不传] 
			 * @param {[type]} _targetAnchors [终点位置，数组，可不传] 
			 */
			addEndpoint: function(_instance, _id,_sourceEndpoint, _targetEndpoint,_sourceAnchors, _targetAnchors) {
				if(!_sourceAnchors) {
					_sourceAnchors = ["Top", "Bottom"];
				}
				if(!_targetAnchors) {
					_targetAnchors = ["Left", "Right"];
				}

				var deal = function(_id) {
					for(var i = 0; i < _sourceAnchors.length; i++) {
						var sourceUUID = _id + _sourceAnchors[i];
						_instance.addEndpoint(_id, _sourceEndpoint, {
							anchor: _sourceAnchors[i],
							uuid: sourceUUID
						});
					}
					for(var j = 0; j < _targetAnchors.length; j++) {
						var targetUUID = _id + _targetAnchors[j];
						_instance.addEndpoint(_id, _targetEndpoint, {
							anchor: _targetAnchors[j],
							uuid: targetUUID
						});
					}
				}

				if(typeof _id == 'string') {
					deal(_id);
				} else if(typeof _id == 'object') {
					$.each(_id, function(i, _id) {
						deal(_id);
					});
				}

			},
			/**
			 * 添加线
			 * @param {Object} _instance
			 * @param {Object} _uuids
			 */
			addLine: function(_instance, _uuids) {
				_instance.connect({
					uuids: _uuids,
					editable: true
				});
			},
			getEndpoint:function(_instance,_uuids){
				_instance.getEndPoint(_uuids);
				alert(_uuids);
			}
		});

		return helper.create();
	});