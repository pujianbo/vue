<template>
    <div>
        <head-top></head-top>
        <el-col :span="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-button style="padding: 3px 0" type="text" @click="()=>appendRoot()">创建根权限</el-button>
                </div>
                <div class="custom-tree-container">
                    <div class="block">
                        <el-tree
                                :data="data5"
                                node-key="id"
                                @node-drop="dragOver"
                                draggable>
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span class="label">{{ data.name }}</span>
                                    <span class="button">
                                      <el-button
                                              type="text"
                                              size="mini"
                                              @click="() => edit(data)">
                                        编辑
                                      </el-button>
                                      <el-button
                                              type="text"
                                              size="mini"
                                              @click="() => append(data)">
                                        添加
                                      </el-button>
                                      <el-button
                                              type="text"
                                              size="mini"
                                              @click="() => remove(data)">
                                        删除
                                      </el-button>
                                    </span>
                                </span>
                        </el-tree>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-dialog
                title="权限操作"
                width="25%"
                class="add-event-dialog"
                :visible.sync="showDialog"
                size="tiny">
            <el-form ref="dialogForm" :model="dialogFormData" :rules="dialogRules">
                <el-form-item label="权限名称" prop="name">
                    <el-input v-model="dialogFormData.name"></el-input>
                </el-form-item>
                <el-form-item label="权限url" prop="url">
                    <el-input v-model="dialogFormData.url"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel('dialogForm')">取 消</el-button>
                <el-button type="primary" @click="dialogSubmit('dialogForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getAllPermission, createPermChild, removePerm, createPermRoot, editPerm, dragPerm} from '@/api/getData'

    let id = 1000;

    export default {
        data() {
            return {
                data5: [],
                showDialog: false,
                showTree: false,
                dialogFormData: {
                    name: ''
                },
                dialogRules: {
                    name: [
                        {required: true, message: '请输入权限名称', trigger: 'blur'},
                    ],
                    url:[
                        {required:true,message:'url不能为空',trigger:'blur'}
                    ]
                },
                operating: [],
                type: 0  //1添加子权限，2添加根权限，3修改权限名称&url
            }
        },
        components: {
            headTop,
        },
        methods: {
            append(data) {
                this.showDialog = true;
                this.operating = data;
                this.type = 1
            },
            appendRoot() {
                this.showDialog = true;
                this.type = 2
            },
            edit(data) {
                this.dialogFormData.name = data.name;
                this.dialogFormData.url = data.url;
                this.operating = data;
                this.showDialog = true;
                this.type = 3;
            },
            async dragOver(node, endNode, local, event) {
                const res = await dragPerm({moveType: local}, node.data.id, endNode.data.id);
                if (res.code == 200) {
                    this.$message({
                        message: '权限移动成功',
                        type: 'success'
                    })
                }
                this.initData();
            },
            dialogSubmit(dialogForm) {
                let _this = this;
                this.$refs[dialogForm].validate(async (valid) => {
                    if (valid) {
                        if (_this.type == 1){
                            try {
                                const resData = await createPermChild(_this.dialogFormData, _this.operating.id);
                                if (resData.code == 200) {
                                    _this.$message({
                                        message: '权限创建成功',
                                        type: 'success'
                                    });
                                    this.dialogCancel();
                                    _this.initData();
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }else if(_this.type == 2){
                            try {
                                const resData = await createPermRoot(_this.dialogFormData);
                                if (resData.code == 200) {
                                    _this.$message({
                                        message: '权限创建成功',
                                        type: 'success'
                                    });
                                    this.dialogCancel();
                                    _this.initData();
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }else {
                            try {
                                const resData = await editPerm(_this.dialogFormData, this.operating.id);
                                if (resData.code == 200) {
                                    _this.$message({
                                        message: '权限已修改',
                                        type: 'success'
                                    });
                                    this.dialogCancel();
                                    _this.initData();
                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    }else {
                        return;
                    }
                })
            },
            dialogCancel() {
                this.showDialog = false;
                this.dialogFormData = {
                    name: ''
                }
            },
            remove(data) {
                this.$confirm('确认删除权限？').then(async () => {
                    const res = await removePerm(data.id);
                    if (res.code == 200) {
                        this.$message({
                            message: '权限已删除',
                            type: 'warning'
                        });
                    }
                    this.initData();
                }).catch(_ => {
                });

                // const parent = node.parent;
                // const children = parent.data.children || parent.data;
                // const index = children.findIndex(d => d.id === data.id);
                // children.splice(index, 1);
            },

            renderContent(h, {node, data, store}) {
                return (
                    `<span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>`);
            },
            async initData() {
                try {
                    const countData = await getAllPermission();

                    this.data5 = countData;
                    // if (countData.status == 1) {
                    //     this.count = countData.count;
                    // }else{
                    //     throw new Error('获取数据失败');
                    // }
                    // this.getResturants();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
        },
        mounted() {
            this.initData();
        }
    };
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>