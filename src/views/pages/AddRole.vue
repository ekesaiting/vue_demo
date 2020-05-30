<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名" prop="roleName">
                <el-input v-model="ruleForm.roleName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            var checkRoleName = (rule, value, callback) => {
                if (value==='') {
                    return callback(new Error('角色名不能为空'));
                }
                callback();
            };

            return {
                ruleForm: {
                    roleName: '',
                },
                rules: {
                    roleName: [
                        { validator: checkRoleName, trigger: 'blur' ,required:true}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    const _this=this;
                    console.log(valid)
                    if (valid) {
                        const _this = this;
                        this.$axios.post("http://localhost:8080/role/addRole",_this.ruleForm).then(function (resp) {
                            _this.$message("提交成功")
                            _this.$router.push("/roleList")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        }
    }
</script>

<style scoped>

</style>