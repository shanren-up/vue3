define(
    [
        'configs',
        'frame/common/core/frame_core',
    ],

    function(configs, frameCoreIns) {

        'use strict';

        frameCoreIns.handleQueryString();

//      if (configs.isLoadResource) {
//          require(['com_core_resourceRepository']);
//      }
//      if (configs.enableRemind) {
//          Ember.run.later(function() {
//              require(['frame/common/components/frame_remind/frame_remind']);
//          }, 500);
//      }
    });