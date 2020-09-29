<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" @click="handleSearchList()" size="small">查询搜索</el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.username" class="input-width" placeholder="帐号" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="listQuery.phone" class="input-width" placeholder="手机号码" clearable></el-input>
          </el-form-item>
          <el-form-item label="启用状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="注册开始时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createTimeStart"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="注册结束时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createTimeEnd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model="listQuery.realName" class="input-width" placeholder="真实姓名" clearable></el-input>
          </el-form-item>

          <el-form-item label="实名开始时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.certificationTimeStart"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="实名结束时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.certificationTimeEnd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="身份证号码：">
            <el-input
              v-model="listQuery.idNumber"
              class="input-width"
              placeholder="身份证号码"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="实名状态：">
            <el-select
              v-model="listQuery.certification"
              class="input-width"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in certificationStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推荐人ID：">
            <el-input
              v-model="listQuery.referrer"
              class="input-width"
              placeholder="推荐人ID"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="激活状态：">
            <el-select
              v-model="listQuery.activatedState"
              class="input-width"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in activatedStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="可用余额开始：">
            <el-input
              v-model="listQuery.balanceState"
              class="input-width"
              placeholder="可用余额开始"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="可用余额结束：">
            <el-input
              v-model="listQuery.balanceEnd"
              class="input-width"
              placeholder="可用余额结束"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用户类型：">
            <el-select v-model="listQuery.userType" class="input-width" placeholder="全部" clearable>
              <el-option
                v-for="item in userTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="冻结余额开始：">
            <el-input
              v-model="listQuery.balanceState"
              class="input-width"
              placeholder="冻结余额开始"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="冻结余额结束：">
            <el-input
              v-model="listQuery.blockedBalanceEnd"
              class="input-width"
              placeholder="冻结余额结束"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        size="mini"
        class="btn-add"
        @click="batchResetLoginPassword()"
        style="margin-left: 20px"
      >批量重置登录密码</el-button>
      <el-button size="mini" class="btn-add" @click="sexportExcel" style="margin-left: 20px">导出</el-button>
      <el-button size="mini" class="btn-add" @click="handleClick" style="margin-left: 20px">导出1</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="memberTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="帐号" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="真实姓名" align="center">
          <template slot-scope="scope">{{scope.row.realName}}</template>
        </el-table-column>
        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="最后登录" width="160" align="center">
          <template slot-scope="scope">{{scope.row.loginTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="lookDetail(scope.$index, scope.row)">查看</el-button>
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
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  fetchList,
  batchResetLoginPassword,
  exportExcel,
  updateStatus,
} from "@/api/member";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
};
const defaultMember = {
  id: null,
  username: null,
  password: null,
  nickName: null,
  email: null,
  note: null,
  status: 1,
};
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
      statusOptions: [
        {
          label: "禁用",
          value: 0,
        },
        {
          label: "启用",
          value: 1,
        },
      ],
      certificationStatusOptions: [
        {
          label: "未实名",
          value: 0,
        },
        {
          label: "已实名",
          value: 1,
        },
      ],
      activatedStateOptions: [
        {
          label: "睡眠",
          value: 0,
        },
        {
          label: "激活",
          value: 1,
        },
      ],
      userTypeOptions: [
        {
          label: "用户",
          value: 0,
        },
        {
          label: "商家",
          value: 1,
        },
      ],
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
    batchResetLoginPassword() {
      this.$confirm("是否要批量重置登录密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          batchResetLoginPassword(row.id, { status: row.status }).then(
            (response) => {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
          this.getList();
        });
    },
    handleClick() {
      var form = document.createElement("form");
      form.style.display = "none";
      form.action = "http://192.168.110.100:8088" + "/lctext/export";
      form.method = "get";
      document.body.appendChild(form);

      for (var key in this.listQuery) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = this.listQuery[key];
        form.appendChild(input);
      }

      form.submit();
      form.remove();
    },

    sexportExcel() {
      this.$confirm("是否要导出数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.listQuery.keyword = "";

          // exportExcel( this.listQuery).then((response) => {
          //   alert(1);
          //   this.$message({
          //     type: "success",
          //     message: "导出成功!",
          //   });
          // });

          // window.location.href =
          //   "http://192.168.110.100:8088/lctext/export?pageSize=5&pageNum=1";
        })
        .catch(() => {
          alert(2);
          this.$message({
            type: "info",
            message: "取消导出",
          });
          this.getList();
        });
    },
    handleStatusChange(index, row) {
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateStatus({ ids: row.id, status: row.status }).then((response) => {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
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
    lookDetail(index, row) {
      this.$router.push({ path: "/mms/memberDetail", query: { id: row.id } });
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
  },
};
</script>
<style></style>


