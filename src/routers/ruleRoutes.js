const authUser = () => import(/* webpackChunkName: 'authUser' */'../views/auth/user/index');
const authRole = () => import(/* webpackChunkName: 'authRole' */'../views/auth/role/index');
const authRoleAuthorized = ()=> import(/* webpackChunkName: 'authRoleAuthorized' */'../views/auth/role/RoleAuthorized');
const authResc = () => import(/* webpackChunkName: 'authResc' */'../views/auth/resc/index');
const authFunc = () => import(/* webpackChunkName: 'authFunc' */'../views/auth/func/index');
const authLog = () => import(/* webpackChunkName: 'authLog' */'../views/auth/log/index');


const syncPlan = () => import(/* webpackChunkName: 'login' */'../views/sync/plan/index');
const syncResult = () => import(/* webpackChunkName: 'login' */'../views/sync/result/index');
const syncMsg = () => import(/* webpackChunkName: 'login' */'../views/sync/msg/index');
const syncCallback = () => import(/* webpackChunkName: 'login' */'../views/sync/callback/index');


const routes = [

    // 后台权限系统
    {path: '/auth/user', name: 'AuthUser', component: authUser},
    {path: '/auth/role', name: 'AuthRole', component: authRole},
    { path: '/auth/role/authorized' ,name: 'AuthRoleAuthorized', component: authRoleAuthorized},
    {path: '/auth/resc', name: 'AuthResc', component: authResc},
    {path: '/auth/func', name: 'AuthFunc', component: authFunc},
    {path: '/auth/log', name: 'AuthLog', component: authLog},


    // 同步系统
    {path: '/sync/plan', name: 'SyncPlan', component: syncPlan},
    {path: '/sync/result', name: 'SyncResult', component: syncResult},
    {path: '/sync/msg', name: 'SyncMsg', component: syncMsg},
    {path: '/sync/callback', name: 'SyncCallback', component: syncCallback},
]

export default routes