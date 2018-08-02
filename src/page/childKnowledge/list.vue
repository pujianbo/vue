<template>
<div class="chidknage">
    <div class="table_container">
        <el-row class='formtop'>
            <el-button type="primary" size="small" @click="edit(1)">新增知识</el-button>
            <el-button type="danger" size="small" @click="edit(2)">批量删除</el-button>
        </el-row>
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%;min-height:200px" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="name" label="发布人" />
            <el-table-column label="发布时间">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column label="分类">
                <template slot-scope="scope">{{ scope.row.category }}</template>
            </el-table-column>
            <el-table-column prop="category" label="可见范围" />
            <el-table-column prop="status" label="状态" width="100" :filters="[{ text: '未提交', value: 0 }, { text: '待审核', value: 1 },{ text: '待修改', value: 2 }]" :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                  {{['未提交','待审核','待修改','已发布'][scope.row.status]}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" v-show="scope.row.status===1" @click="itemEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="Pagination" style="text-align: center;margin-top: 20px;">
            <el-pagination background layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total">
            </el-pagination>
        </div>
    </div>
    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
        <span>确定要删除已选择的项目吗？</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
</div>
</template>

<script>
import {
    getUserList,
    getUserCount
} from '@/api/getData'
export default {
    data() {
        return {
            tableData3: [{
                id: 1,
                title: '关爱保障儿童健康成长1',
                name: '猴子',
                date: '2016-05-03',
                category: '幼儿健康',
                range: '家长、幼师、教练',
                status: 1
            }, {
                id: 2,
                title: '关爱保障儿童健康成长2',
                name: '猴子',
                date: '2016-05-03',
                category: '幼儿健康',
                range: '家长、幼师、教练',
                status: 2
            }, {
                id: 3,
                title: '关爱保障儿童健康成长3',
                name: '猴子',
                date: '2016-06-03',
                category: '幼儿健康',
                range: '家长、幼师、教练',
                status: 3
            }],
            multipleSelection: [],
            currentPage: 1,
            pageSize: 10,
            total: 100,
            dialogVisible: false,
        }
    },
    components: {},
    created() {
        this.dataList();
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
        },
        filterTag(value, row) {
            return row.status === value;
        },
        handleCurrentChange(val) {
            console.log(val);
            this.currentPage = val;
            this.dataList()
        },
        edit(type) {
            console.log(type);
            if (type == 1) {
                this.$router.push('/childKnowledge/edit/null')
            } else {
                this.dialogVisible = true
            }
        },
        dataList() {
            console.log('dataList');
        },
        itemEdit(item) {
            console.log(item);
            this.$router.push(`/childKnowledge/edit/${item.id}`)
        }
    },
}
</script>

<style lang="less">
.chidknage {
    .formtop {
        text-align: right;
        padding-bottom: 20px;
        border-bottom: 1px solid #ebeef5;
    }
}
</style>
