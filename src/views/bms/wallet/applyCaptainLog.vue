<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          @click="handleSearchList()"
          size="small"
          >查询搜索</el-button
        >
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
          >重置</el-button
        >
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="账号ID：">
            <el-input
              v-model="listQuery.memberId"
              class="input-width"
              placeholder="账号ID"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="操作状态：">
            <el-select
              v-model="listQuery.status"
              class="input-width"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="memberTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="帐号ID" align="center">
          <template slot-scope="scope">{{ scope.row.memberId }}</template>
        </el-table-column>
        <el-table-column label="操作人ID" align="center">
          <template slot-scope="scope">{{ scope.row.adminId }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{
            scope.row.status | formatStatusType
          }}</template>
        </el-table-column>
        <el-table-column label="驳回内容" align="center">
          <template slot-scope="scope">{{ scope.row.reason }}</template>
        </el-table-column>
        <el-table-column label="操作时间" align="center">
          <template slot-scope="scope">{{
            scope.row.affirmTime | formatDateTime
          }}</template>
        </el-table-column>

        <el-table-column label="申请时间" width="160" align="center">
          <template slot-scope="scope">{{
            scope.row.applyTime | formatDateTime
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status == '0'">
              <el-button
                size="mini"
                type="text"
                @click="handleAgree(scope.$index, scope.row)"
              >
                通过
              </el-button>

              <el-button
                size="mini"
                type="text"
                @click="handleDisagree(scope.$index, scope.row)"
              >
                拒绝
              </el-button>
            </div>
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
        :page-sizes="[10, 15, 20]"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="拒绝通过" :visible.sync="allocDialogVisible" width="50%">
      <el-table-column label="理由" align="center">
        <template slot-scope="scope">{{ scope.row.reason }}</template>
      </el-table-column>

      <el-form
        :model="member"
        ref="memberForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="理由：">
          <el-input
            v-model="member.reason"
            type="textarea"
            :rows="5"
            style="width: 80%"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, agreeApply, disagreeApply } from "@/api/bmsApplyCaptainLog";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
};
const defaultMember = {
  id: null,
  reason: null,
  // password: null,
  // nickName: null,
  // email: null,
  // note: null,
  // status: 1,
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
      allocDialogVisible: false,
      statusOptions: [
        {
          label: "未操作",
          value: 0,
        },
        {
          label: "已确认",
          value: 1,
        },
        {
          label: "已拒绝",
          value: 2,
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
    formatStatusType(value) {
      if (value === 0) {
        return "未操作";
      } else if (value === 1) {
        return "已确认";
      } else if (value === 2) {
        return "已拒绝";
      }
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

    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    handleDisagree(index, row) {
      this.allocAdminId = row.id;
      this.allocDialogVisible = true;
      this.member = Object.assign({},row);
    },
    handleAgree(index, row) {
      this.$confirm("是否要通过该申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          agreeApply(row.id, { status: 1 }).then((response) => {
            this.$message({
              type: "success",
              message: "申请通过!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消通过",
          });
          this.getList();
        });
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("status", 2);
          params.append("reason", this.member.reason);
          disagreeApply(this.member.id, params).then((response) => {
            this.$message({
              type: "success",
              message: "申请拒绝!",
            });
              this.allocDialogVisible =false;
              this.getList();

          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消拒绝",
          });
          this.getList();
        });
    },
  },
};
</script>
<style></style>


