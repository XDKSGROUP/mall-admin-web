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
          <el-form-item label="订单编号：">
            <el-input v-model="listQuery.username" class="input-width" placeholder="帐号" clearable></el-input>
          </el-form-item>
          <el-form-item label="运行状态：">
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

          <el-form-item label="购买时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createTimeStart"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker><span> ~ </span>
            <el-date-picker
              class="input-width"
              v-model="listQuery.createTimeEnd"
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
          <el-form-item label="推荐人ID：">
            <el-input
              v-model="listQuery.referrer"
              class="input-width"
              placeholder="推荐人ID"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model="listQuery.realName" class="input-width" placeholder="真实姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="实名开始：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.certificationTimeStart"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker><span> ~ </span>
            <el-date-picker
              class="input-width"
              v-model="listQuery.certificationTimeEnd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间"
            ></el-date-picker>
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
          <el-form-item label="直推人数：">
            <el-input
              v-model="listQuery.referrerStart"
              clearable
              style="width: 48%"
            ></el-input><span> ~ </span><el-input
            v-model="listQuery.referrerEnd"
            style="width: 48%"
            clearable
          ></el-input>
          </el-form-item>
        </el-form>


      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>合约列表</span>
      <el-button
        size="mini"
        class="btn-add"
        @click="batchResetLoginPassword()"
        style="margin-left: 20px"
      >批量重置登录密码</el-button>
      <!--      <el-button size="mini" class="btn-add" @click="sexportExcel" style="margin-left: 20px">导出</el-button>-->
      <el-button size="mini" class="btn-add" @click="handleClick" style="margin-left: 20px">导出</el-button>
    </el-card>
    <div class="table-container">
      <el-table stripe ref="memberTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="订单编号" width="90" align="center">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>
        <el-table-column label="购买人Id" align="center">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>
        <el-table-column label="购买型号" align="center">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>
        <el-table-column label="购买价格" align="center"width="110">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>
        <!--        <el-table-column label="网体人数" align="center">
                  <template slot-scope="scope">{{}}</template>
                </el-table-column>-->
        <el-table-column label="日收益" align="center">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>
        <el-table-column label="收益率" align="center">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>
        <el-table-column label="合约收益" align="center">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>

        <el-table-column label="购买时间" width="160" align="center">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>
        <el-table-column label="运行状态" width="160" align="center">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>
        <el-table-column label="结束时间" width="160" align="center">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>
        <el-table-column label="合约进程" width="160" align="center">
          <template slot-scope="scope">{{}}</template>
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
        :page-sizes="[10,15,20,100]"
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
    getMemberDetail,
    upPhone,
    updateStatusOne
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
    name: "memberRelation",
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
        dialogFormVisible: false,
        dialogTableVisible:false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        umsData:{}
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
      promotionYields(val) {
        if (val == 0) {
          return val = '未激活'
        }
        return val = '已激活'
      },
      communityLevels(val){
        if(val==0){
          return val='会员'
        }
        if(val==1){
          return val='D1'
        }
        if(val==2){
          return val='D2'
        }
        if(val==3){
          return val='D3'
        }
        if(val==4){
          return val='D4'
        }
        if(val==5){
          return val='D5'
        }
      },
      statuss(val){
        if(val==0){
          return val='未启用'
        }
        if(val==1){
          return val='启用'
        }
      },
      createTimes(val){
        return val;
      },
    },
    methods: {

      openExamine(id,type){
        getMemberDetail(id).then(res => {
          if (res.code == 200) {
            console.log(res)
            this.umsData = res.data
            if(type==0) this.dialogFormVisible = true;
            if(type==1) this.dialogTableVisible=true;
          }
        })
      },
      upPhone(id,phone){
        var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/
        if (!myreg.test(phone)) {
          return this.$message({
            type: "error",
            message: "请输入正确的手机号码!",
          });
        }

        let data = {
          memberId: id,
          phone: phone
        }
        upPhone(data).then(res => {
          this.dialogTableVisible=false;
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "修改成功!",


            });
            this.getList();
          }
          else {
            this.$message({
              type: "error",
              message: "修改失败!",
            });
          }
        })
      },

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
                this.getList();
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
        this.$confirm("是否要导出数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          var form = document.createElement("form");
          form.style.display = "none";
          form.action = process.env.BASE_API + "lctext/export";
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
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消导出",
          });
          this.getList();
        });
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
            //   "http://192.168.110.104:8088/lctext/export?pageSize=5&pageNum=1";
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
        }).then(() => {
          updateStatus({ ids:[ row.id], status: row.status }).then((response) => {
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
      handleStatusChangeOne(memberId, status) {
        console.log(status)
        /*      if(status==0)status=1;
              else {
                if(status==1)status=0;
              }*/

        this.$confirm("是否要修改该状态?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let data={
            memberId:memberId,
            status:status
          }
          updateStatusOne(data).then((response) => {
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
<style scoped>
  /deep/.el-table th, .el-table tr {
    background-color: #fafaff;
    color: #000000;

  }
  /deep/.el-table {
    color: #595959;
  }

</style>
<style></style>


