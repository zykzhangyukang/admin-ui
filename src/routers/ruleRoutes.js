const authUser = () => import(/* webpackChunkName: 'authUser' */'../views/auth/user/index');
const authRole = () => import(/* webpackChunkName: 'authRole' */'../views/auth/role/index');
const authRoleAuthorized = ()=> import(/* webpackChunkName: 'authRoleAuthorized' */'../views/auth/role/RoleAuthorized');
const authResc = () => import(/* webpackChunkName: 'authResc' */'../views/auth/resc/index');
const authFunc = () => import(/* webpackChunkName: 'authFunc' */'../views/auth/func/index');
const authLog = () => import(/* webpackChunkName: 'authLog' */'../views/auth/log/index');


const eduCourse = () => import(/* webpackChunkName: 'eduCourse' */'../views/edu/course/index');
const educCreateCourse = () => import(/* webpackChunkName: 'educCreateCourse' */'../views/edu/course/CourseCreate');
const eduChapter = () => import(/* webpackChunkName: 'eduChapter' */'../views/edu/chapter/index');
const eduLesson = () => import(/* webpackChunkName: 'eduLesson' */'../views/edu/lesson/index');
const eduCatalog = () => import(/* webpackChunkName: 'eduCatalog' */'../views/edu/catalog/index');


const routes = [

    // 后台权限系统
    {path: '/auth/user', name: 'AuthUser', component: authUser},
    {path: '/auth/role', name: 'AuthRole', component: authRole},
    { path: '/auth/role/authorized' ,name: 'AuthRoleAuthorized', component: authRoleAuthorized},
    {path: '/auth/resc', name: 'AuthResc', component: authResc},
    {path: '/auth/func', name: 'AuthFunc', component: authFunc},
    {path: '/auth/log', name: 'AuthLog', component: authLog},

    // 后台课程系统
    {path: '/edu/course', name: 'EduCourse', component: eduCourse},
    {path: '/edu/course/create', name: 'EduCreateCourse', component: educCreateCourse},
    {path: '/edu/chapter', name: 'EduChapter', component: eduChapter},
    {path: '/edu/lesson', name: 'EduLesson', component: eduLesson},
    {path: '/edu/catalog', name: 'EduCatalog', component: eduCatalog},
]

export default routes