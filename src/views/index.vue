<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu router :default-openeds="['0','1','2']">
                <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''">
                    <template slot="title"><i class="el-icon-menu"></i>{{item.name}}</template>
                    <el-menu-item v-for="(subItem,subIndex) in item.children" :index="subItem.path" :class="$route.path==subItem.path?'is-active':''">
                        {{subItem.name}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>shf</span>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

</style>