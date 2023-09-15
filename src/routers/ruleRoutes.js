const authUser = () => import(/* webpackChunkName: 'authUser' */'../views/auth/user/index');
const authRole = () => import(/* webpackChunkName: 'authRole' */'../views/auth/role/index');
const authRoleAuthorized = ()=> import(/* webpackChunkName: 'authRoleAuthorized' */'../views/auth/role/RoleAuthorized');
const authResc = () => import(/* webpackChunkName: 'authResc' */'../views/auth/resc/index');
const authFunc = () => import(/* webpackChunkName: 'authFunc' */'../views/auth/func/index');


const routes = [

    {path: '/auth/user', name: 'AuthUser', component: authUser},
    {path: '/auth/role', name: 'AuthRole', component: authRole},
    { path: '/auth/role/authorized' ,name: 'AuthRoleAuthorized', component: authRoleAuthorized},
    {path: '/auth/resc', name: 'AuthResc', component: authResc},
    {path: '/auth/func', name: 'AuthFunc', component: authFunc},

]

export default routes