<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
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
            var checkUsername = (rule, value, callback) => {
                if (value==='') {
                    return callback(new Error('用户名不能为空'));
                }
                callback();
            };
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    checkPass: '',
                },
                rules: {
                    password: [
                        { validator: validatePassword, trigger: 'blur' ,required:true}
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' ,required:true}
                    ],
                    username: [
                        { validator: checkUsername, trigger: 'blur' ,required:true}
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
                        this.$axios.post("http://localhost:8080/user/addUser",_this.ruleForm).then(function (resp) {
                            _this.$message("提交成功")
                            _this.$router.push("/userList")
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