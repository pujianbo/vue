<template>
    <div>
        <head-top></head-top>
        <el-table
                :data="tableData"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="学校名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="280">
                <template slot-scope="scope">
                    <el-button size="mini">查看班级</el-button>
                    <el-button size="mini" type="primary" plain>上传学校信息</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'

    export default {
        data() {
            return {
                tableData: [{
                    date: '格瑞特',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        components: {
            headTop
        },
        mounted() {

        }
    }
</script>