import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  ...((require('E:/pinlor-static-ism-in-store-branch-h5/src/dva.js').config || (() => ({})))()),
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'material', ...(require('E:/pinlor-static-ism-in-store-branch-h5/src/models/material.js').default) });
app.model({ namespace: 'message', ...(require('E:/pinlor-static-ism-in-store-branch-h5/src/models/message.js').default) });
app.model({ namespace: 'resource', ...(require('E:/pinlor-static-ism-in-store-branch-h5/src/models/resource.js').default) });
app.model({ namespace: 'sms', ...(require('E:/pinlor-static-ism-in-store-branch-h5/src/models/sms.js').default) });
app.model({ namespace: 'store', ...(require('E:/pinlor-static-ism-in-store-branch-h5/src/models/store.js').default) });
app.model({ namespace: 'task', ...(require('E:/pinlor-static-ism-in-store-branch-h5/src/models/task.js').default) });
app.model({ namespace: 'user', ...(require('E:/pinlor-static-ism-in-store-branch-h5/src/models/user.js').default) });
app.model({ namespace: 'utils', ...(require('E:/pinlor-static-ism-in-store-branch-h5/src/models/utils.js').default) });
