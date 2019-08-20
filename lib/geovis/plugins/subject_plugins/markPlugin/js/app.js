import Plugin from './plugins';

const scope = (typeof window !== 'undefined') ? window : ((typeof self !== 'undefined') ? self : {});
scope['PlotPanel'] = Plugin;
