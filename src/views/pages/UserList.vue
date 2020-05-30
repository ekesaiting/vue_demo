<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="id"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="roles"
                    label="拥有角色"
                    width="200">
                <template slot-scope="scope">
                    <span v-for="role in scope.row.roles">
                        <el-tag :type="'primary'">   {{role.roleName}}</el-tag>
                </span></template>
            </el-table-column>
            <!--       fixed="right"      需要时固定在右边-->
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope"  >
                    <div style="height:50%">
                        <el-button  type="danger" size="small" @click="deleteUser(scope.row)"  round>删除用户</el-button>
                        <!--修改用户信息对话框对话框-->
                        <el-button style="margin: 0" type="primary" size="small" @click="setForm(scope.row)" round>修改用户</el-button>
                        <el-dialog title="修改用户" :visible.sync="dialogFormVisible" width="30%" :modal-append-to-body='false'>
                            <el-form ref="form" :model="form" label-width="80px">
                                <el-form-item label="新用户名">
                                    <el-input v-model="form.username"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码">
                                    <el-input v-model="form.password"></el-input>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="updateUser()">确 定</el-button>
                        </span>
                        </el-dialog>

                    </div>

                    <div style="height:50%">  <el-button type="success" size="small" @click="setRoleForm(scope.row)" round>添加角色</el-button>
                        <el-dialog title="添加角色" :visible.sync="dialogRoleFormVisible" width="30%"
                                   :modal-append-to-body='false'>
                            <el-checkbox-group v-model="roleForm.roleId">
                                <el-checkbox :label="role.id" v-for="role in candidateRoles">{{role.roleName}}</el-checkbox>
                            </el-checkbox-group>
                            <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogRoleFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addRole()">确 定</el-button>
                         </span>
                        </el-dialog>
                        <!--删除角色对话框-->
                        <el-button type="danger" size="small" @click="deleteRoleForm(scope.row)" round>删除角色</el-button>
                        <el-dialog title="删除角色" :visible.sync="dialogDeleteRoleFormVisible" width="30%"
                                   :modal-append-to-body='false'>
                            <el-checkbox-group v-model="roleForm.roleId">
                                <el-checkbox :label="role.id" v-for="role in candidateRoles">{{role.roleName}}</el-checkbox>
                            </el-checkbox-group>
                            <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogDeleteRoleFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="deleteRole()">确 定</el-button>
                         </span>
                        </el-dialog>
                    </div>
                    <!--添加角色对话框-->




                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size=6
                :total="100"
                @current-change="changePage">
        </el-pagination>
    </div>

</template>

<script>
    export default {
        methods: {
            addRole() {
                const _this = this;
                _this.dialogRoleFormVisible = false
                this.$axios.put("http://localhost:8080/user/addRole", _this.roleForm, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                }).then(function (resp) {
                    _this.$message("添加成功")
                    _this.changePage(_this.page)
                })
            },
            deleteRole(){
                const _this = this;
                _this.dialogDeleteRoleFormVisible = false
                this.$axios.post("http://localhost:8080/user/deleteRole", _this.roleForm,).then(function (resp) {
                    _this.$message("删除成功")
                    _this.changePage(_this.page)
                })
            },
            deleteUser(row) {
                const _this = this;
                this.$axios.delete("http://localhost:8080/user/deleteUser/" + row.id).then(function (resp) {
                    _this.$message("删除成功")
                    _this.changePage(_this.page)
                })
            },
            updateUser() {
                const _this = this;
                _this.dialogFormVisible = false
                this.$axios.put("http://localhost:8080/user/updateUser", _this.form, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                }).then(function (resp) {
                    console.log(resp.data)
                    _this.$message("更新成功")
                    _this.changePage(_this.page)
                })
            },
            setRoleForm(row) {
                const _this = this;
                _this.dialogRoleFormVisible = true;
                _this.roleForm.userId = row.id;
                this.$axios.get("http://localhost:8080/role/findAll/1/100").then(function (resp) {
                    console.log(resp.data)
                    _this.candidateRoles = resp.data.data
                })
            },
            deleteRoleForm(row){
                const _this = this;
                _this.dialogDeleteRoleFormVisible = true;
                _this.roleForm.userId = row.id;
                _this.candidateRoles=row.roles;
            },
            setForm(row) {
                const _this = this;
                _this.dialogFormVisible = true;
                _this.form.username = row.username;
                _this.form.id = row.id;
                _this.form.password = row.password;
            },
            handleClick(row) {
                console.log(row);
            },
            changePage(currentPage) {
                const _this = this;
                _this.page = currentPage;
                this.$axios.get("http://localhost:8080/user/findAll/" + currentPage + "/6").then(function (resp) {
                    console.log(resp.data)
                    _this.tableData = resp.data.data
                })
            }
        },

        data() {
            return {
                page: 1,
                candidateRoles: [],
                roleForm: {
                    userId: null,
                    roleId: []
                },
                dialogFormVisible: false,
                dialogRoleFormVisible: false,
                dialogDeleteRoleFormVisible:false,
                tableData: [],
                form: {
                    id: null,
                    username: null,
                    password: null
                },
                formLabelWidth: '120px'
            }
        },
        created() {
            const _this = this;
            this.$axios.get("http://localhost:8080/user/findAll/1/6").then(function (resp) {
                console.log(resp.data)
                _this.tableData = resp.data.data
            })
        }
    }
</script>