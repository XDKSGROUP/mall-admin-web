<template>
  <div class="app-container">

    <el-dialog width="30%" :visible.sync="dialogTableVisible">
      <div slot="title">矿机编号ID:{{upData.id}}</div>
      <el-form>
        <el-form-item label="矿机名：" >
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="upData.machineryName">
          </el-input>
        </el-form-item>
        <el-form-item label="矿机描述：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="upData.title">
          </el-input>
        </el-form-item>
        <el-form-item label="背景图片：" >
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="upData.img">
          </el-input>
        </el-form-item>
        <el-form-item label="图标：" >
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="upData.ico">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="upBmsMiningMachineryCycle2()">确 定</el-button>
      </div>
    </el-dialog>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="memberTable" :data="list"  v-loading="listLoading" border>
        <el-table-column type="selection"  align="center"></el-table-column>
        <el-table-column label="编号"  align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="矿机名称" align="center">
          <template slot-scope="scope">{{scope.row.machineryName}}</template>
        </el-table-column>
        <el-table-column label="矿机简介"  align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="矿机价格" align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="合约收益率" align="center">
          <template slot-scope="scope">{{scope.row.earningsRatio |earningsRatios}}</template>
        </el-table-column>
        <el-table-column label="合约时间（天）" align="center">
          <template slot-scope="scope">{{scope.row.runCycle }}</template>
        </el-table-column>
        <el-table-column label="是否启用"  align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChangeOne(scope.row.id,scope.row.status)"
              :active-value="0"
              :inactive-value="1"
              v-model="scope.row.status"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="停止采矿数" align="center">
          <template slot-scope="scope">{{scope.row.investmentDiscount}}</template>
        </el-table-column>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openExamine(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    fetchList,
    BmsMiningMachineryCycleList,
    BmsMiningMachineryCycleListOne,
    upBmsMiningMachineryCycle
  } from "@/api/bmsMiningMachinery";
  import {formatDate} from "@/utils/date";

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword: null,
  };
  const defaultMember = {
    id: null,

  };
  console.log()
  export default {
    name: "memberList",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        member: Object.assign({}, defaultMember),
        isEdit: false,
        upData: {
          bmsMiningMachineryCycleId: '',
          machineryName: '',
          img: '',
          status: '',
          title: '',
          ico: '',
        },
        formLabelWidth: '120px',
        dialogTableVisible: false,

      };
    },
    created() {
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === "") {
          return "N/A";
        }
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      },
      formatStatus(value) {
        if (value === 0) {
          return '启用';
        } else if (value === 1) {
          return '禁用';
        }
      },
      earningsRatios(value) {
        return value * 100 + "%"
      },
      formatShow(value) {
        if (value === 0) {
          return '隐藏';
        } else if (value === 1) {
          return '显示';
        }
      }
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      getListOne(value) {
        let data = {
          bmsMiningMachineryCycle: value
        }
        BmsMiningMachineryCycleListOne(data).then((response) => {
          console.log(response.data)
          this.upData = response.data;
          console.log(response.data)
          this.dialogTableVisible = true


        });
      },
      getList() {
        this.listLoading = true;
        BmsMiningMachineryCycleList(this.listQuery).then((response) => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data;
        });
      },
      openExamine(value) {
        this.getListOne(value)

      },
      handleStatusChangeOne(id, status) {
        this.$confirm("是否要修改该状态?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let data = {
            bmsMiningMachineryCycleId: id,
            status: status
          }

          upBmsMiningMachineryCycle(data).then((response) => {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.getList();
          });
        })
          .catch(() => {

            this.$message({
              type: "info",
              message: "取消修改",
            });
            this.getList();
          });
      },
      upBmsMiningMachineryCycle2() {

        console.log(this.upData.status)
        this.$confirm("是否要确认修改?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {

          this.dialogTableVisible=false
          let data = {
            bmsMiningMachineryCycleId: this.upData.id,
            machineryName: this.upData.machineryName,
            img: this.upData.img,
            status: this.upData.status,
            title: this.upData.title,
            ico: this.upData.ico,
          }
          console.log(data)
          upBmsMiningMachineryCycle(data).then((response) => {
            console.log(response)
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.getList();
          })
        })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消修改",
            });
            this.getList();
          });

      },
    },
  };
</script>
<style></style>


