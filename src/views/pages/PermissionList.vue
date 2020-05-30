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
                    prop="permissionName"
                    label="权限名"
                    width="200">
            </el-table-column>
            <!--       fixed="right"      需要时固定在右边-->
            <el-table-column
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="setForm(scope.row)">修改</el-button>
                    <!-- <el-dialog title="表单弹框" :visible.sync="dialogFormVisible" width="30%" :modal-append-to-body='false'>
                         <el-form ref="form" :model="form" label-width="80px">
                             <el-form-item label="姓名">
                                 <el-input v-model="form.username"></el-input>
                             </el-form-item>
                             <el-form-item label="号码">
                                 <el-input v-model="form.password"></el-input>
                             </el-form-item>
                         </el-form>
                         <span slot="footer" class="dialog-footer">
                 <el-button @click="dialogFormVisible = false">取 消</el-button>
                 <el-button type="primary" @click="edit()">确 定</el-button>
                 </span>
                     </el-dialog>-->
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
            deleteUser(row){
                const _this = this;
                this.$axios.delete("http://localhost:8080/permission/deletePermission/"+row.id).then(function (resp) {
                    _this.changePage(_this.page)
                })
            },
            edit() {
                const _this = this;
                _this.dialogFormVisible = false
                this.$axios.put("http://localhost:8080/permission/updatePermission", _this.form, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                }).then(function (resp) {
                    console.log(resp.data)
                    _this.changePage(_this.page)
                })
            },
            setForm(row) {
                const _this = this;
                _this.dialogFormVisible = true;
                _this.form.permissionName = row.permissionName;
                _this.form.id = row.id;
            },
            handleClick(row) {
                console.log(row);
            },
            changePage(currentPage) {
                const _this = this;
                _this.page=currentPage;
                this.$axios.get("http://localhost:8080/permission/findAll/" + currentPage + "/6").then(function (resp) {
                    console.log(resp.data)
                    _this.tableData = resp.data.data
                })
            }
        },

        data() {
            return {
                page: 1,
                dialogFormVisible: false,
                tableData: [],
                form: {
                    id: null,
                    permissionName: null
                },
                formLabelWidth: '120px'
            }
        },
        created() {
            const _this = this;
            this.$axios.get("http://localhost:8080/permission/findAll/1/6").then(function (resp) {
                console.log(resp.data)
                _this.tableData = resp.data.data
            })
        }
    }
</script>

<style scoped>

</style>