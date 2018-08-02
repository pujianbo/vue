<template>
<div class="chidknage">
    <div class="table_container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
            <el-form-item label="标题" prop="name">
                <el-input v-model="ruleForm.name" style="width:800px"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category">
                <el-select v-model="ruleForm.category" placeholder="请选择分类">
                    <el-option label="幼儿健康" value="youer"></el-option>
                    <el-option label="幼儿健康2" value="youer2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开放终端" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="家长端" name="type" border></el-checkbox>
                    <el-checkbox label="幼师端" name="type" border></el-checkbox>
                    <el-checkbox label="教练端" name="type" border></el-checkbox>
                    <el-checkbox label="园长端" name="type" border></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="开放城市" prop="city">
                <el-tree ref="citys" :data="citys" :default-checked-keys="ruleForm.city" style="width:800px;border:1px solid #dcdfe6" show-checkbox node-key="id" accordion @check-change="checkChange">
                </el-tree>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <div style="height:350px;width:800px">
                    <quill-editor v-model="ruleForm.content" ref="myQuillEditor" style="height:250px" :options="editorOption">
                    </quill-editor>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="submitForm('ruleForm',1)">确认提交</el-button>
                <el-button type="primary" @click="submitForm('ruleForm',2)">存草稿</el-button>
                <el-button @click="submitForm('ruleForm',3)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import {
    quillEditor
} from 'vue-quill-editor'
export default {
    data() {
        let checkCity = (rule, value, callback) => {
            const sltCity = this.$refs.citys.getCheckedKeys()
            if (sltCity.length == 0) {
                return callback(new Error('请选择城市'));
            }
            callback();
        };
        return {
            editorOption: {
                placeholder: "请填写内容"
            },
            ruleForm: {
                name: '默认标题',
                category: '',
                type: [],
                city: [11],
                content: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入标题',
                    trigger: 'blur'
                }],
                category: [{
                    required: true,
                    message: '请选择所属分类',
                    trigger: 'change'
                }],
                type: [{
                    type: 'array',
                    required: true,
                    message: '请至少选择一个开放终端',
                    trigger: 'change'
                }],
                city: [{
                    required: true,
                    validator: checkCity,
                    trigger: 'change'
                }],
                content: [{
                    required: true,
                    message: '请填写内容',
                    trigger: 'blur'
                }]
            },
            citys: [{
                id: 1,
                label: '北京',
                children: [{
                    id: 11,
                    label: '朝阳区'
                }, {
                    id: 12,
                    label: '海淀区'
                }]
            }, {
                id: 2,
                label: '四川',
                children: [{
                    id: 21,
                    label: '成都'
                }, {
                    id: 22,
                    label: '德阳'
                }]
            }]
        }
    },
    components: {
        quillEditor,
    },
    created() {
      console.log(this.$route.params);
    },
    methods: {
        submitForm(formName, type) {
            if (type == 3) {
                this.$router.go(-1)
                return
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        ...this.ruleForm,
                        city: this.$refs.citys.getCheckedKeys()
                    }
                    console.log(data);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        checkChange(node) {
            // console.log(this.$refs.citys.getCheckedKeys());
            // console.log(this.$refs.citys.getCheckedNodes());
        }
    },
}
</script>

<style lang="less">

</style>
