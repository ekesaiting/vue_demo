import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/index"
import UserList from "../views/pages/UserList"
import AddUser from "../views/pages/AddUser"
import RoleList from "../views/pages/RoleList"
import AddRole from "../views/pages/AddRole"
import PermissionList from "../views/pages/PermissionList";
import AddPermission from "../views/pages/AddPermission";
Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: '用户管理',
        component: Index,
        redirect:"/userList",
        children:[
            {
                path: '/userList',
                name: "查询用户",
                component: UserList
            },
            {
                path: '/addUser',
                name: "添加用户",
                component: AddUser
            }

        ]
    },
    {
        path: '/role',
        name: '角色管理',
        component: Index,
        children:[
            {
                path: '/roleList',
                name: "角色列表",
                component: RoleList
            },
            {
                path: '/addRole',
                name: "添加角色",
                component: AddRole
            }

        ]
    },
    {
        path: '/permission',
        name: '权限管理',
        component: Index,
        children:[
            {
                path: '/permissionList',
                name: "权限列表",
                component: PermissionList
            },
            {
                path: '/addPermission',
                name: "添加权限",
                component: AddPermission
            }

        ]
    },




]

const router = new VueRouter({
    routes
})

export default router
