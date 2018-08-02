<template>
<div class="chidknage">
    <div class="table_container">
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%;min-height:200px">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="name" label="发布人" />
            <el-table-column label="发布时间">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column label="分类">
                <template slot-scope="scope">{{ scope.row.category }}</template>
            </el-table-column>
            <el-table-column prop="category" label="可见范围" />
            <!-- <el-table-column prop="status" label="状态" width="100" :filters="[{ text: '未提交', value: 0 }, { text: '待审核', value: 1 },{ text: '待修改', value: 2 }]" :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                  {{['未提交','待审核','待修改','已发布'][scope.row.status]}}
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="审核评语">
                <template slot-scope="scope">
                  ok
                </template>
            </el-table-column> -->
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="itemEdit(scope.row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="Pagination" style="text-align: center;margin-top: 20px;">
            <el-pagination background layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total">
            </el-pagination>
        </div>
    </div>
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
        // filterTag(value, row) {
        //     return row.status === value;
        // },
        handleCurrentChange(val) {
            console.log(val);
            this.currentPage = val;
            this.dataList()
        },
        dataList() {
            console.log('dataList');
        },
        itemEdit(item) {
            console.log(item);
            this.$router.push(`/childExamine/edit/${item.id}`)
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
