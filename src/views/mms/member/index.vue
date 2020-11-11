<template>
  <div class="app-container">

    <el-dialog width="60%" :visible.sync="dialogFormVisible">
      <div slot="title">用户ID:{{umsData.id}}</div>
      <el-form>
        <el-form-item label="联系电话:" :label-width="formLabelWidth">
          <div>{{umsData.phone}}</div>
        </el-form-item>
        <el-form-item label="推荐人id:" :label-width="formLabelWidth">
          <div>{{umsData.referrer}}</div>
        </el-form-item>
        <el-form-item label="有效直推人数:" :label-width="formLabelWidth">
          <div>{{umsData.referrerCountValid}}</div>
        </el-form-item>
        <el-form-item label="添加时间:" :label-width="formLabelWidth">
          <div>{{umsData.createTime|formatDateTime}}</div>
        </el-form-item>
        <el-form-item label="每日动态收益:" :label-width="formLabelWidth">
          <div>{{umsData.teamEarningsDay}}</div>
        </el-form-item>
        <el-form-item label="累计动态收益:" :label-width="formLabelWidth">
          <div>{{umsData.teamEarningsTotal}}</div>
        </el-form-item>
        <el-form-item label="每日直推收益:" :label-width="formLabelWidth">
          <div>{{umsData.directYieldDay  }}</div>
        </el-form-item>
        <el-form-item label="累计直推收益:" :label-width="formLabelWidth">
          <div>{{umsData.directYieldTotal   }}</div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog width="30%" :visible.sync="dialogTableVisible">
      <div slot="title">用户ID:{{umsData.id}}</div>
      <el-form>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input v-model="umsData.phone" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="推荐人id" :label-width="formLabelWidth">
          <div>{{umsData.referrer}}</div>
        </el-form-item>
        <el-form-item label="有效直推人数" :label-width="formLabelWidth">
          <div>{{umsData.referrerCountValid}}</div>
        </el-form-item>
        <el-form-item label="添加时间" :label-width="formLabelWidth">
          <div>{{umsData.createTime|formatDateTime}}</div>
        </el-form-item>
        <el-form-item label="团队等级" :label-width="formLabelWidth">
        <template>
          <el-select v-model="val" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="upPhone()">确 定</el-button>
      </div>
    </el-dialog>


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
        <el-form :inline="true" :model="listQuery" size="small" label-width="100px">
          <el-form-item label="用户编号：">
            <el-input v-model="listQuery.memberId" class="input-width" placeholder="用户编号" clearable></el-input>
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

          <el-form-item label="注册时间：">
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
      <span>数据列表</span>
      <el-button
        size="mini"
        class="btn-add"
        @click="batchResetLoginPassword()"
        style="margin-left: 20px"
      >批量重置登录密码</el-button>
      <!--      <el-button size="mini" class="btn-add" @click="sexportExcel" style="margin-left: 20px">导出</el-button>-->
      <el-button size="mini" class="btn-add" @click="handleClick" style="margin-left: 20px">导出1</el-button>
    </el-card>
    <div class="table-container">
      <el-table stripe ref="memberTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="90" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="推荐人" align="center">
          <template slot-scope="scope">{{scope.row.referrer}}</template>
        </el-table-column>
        <el-table-column label="有效直推人数" align="center"width="110">
          <template slot-scope="scope">{{scope.row.referrerCountValid}}</template>
        </el-table-column>
        <el-table-column label="USDT" align="center"width="110">
          <template slot-scope="scope">{{scope.row.husdt}}</template>
        </el-table-column>
        <el-table-column label="GFC" align="center"width="110">
          <template slot-scope="scope">{{scope.row.fhc}}</template>
        </el-table-column>
        <!--        <el-table-column label="网体人数" align="center">
                  <template slot-scope="scope">{{}}</template>
                </el-table-column>-->
        <el-table-column label="激活状态" align="center">
          <template slot-scope="scope">{{scope.row.activatedState  | activatedStates}}</template>
        </el-table-column>
        <el-table-column label="团队等级" align="center">
          <template slot-scope="scope">{{scope.row.communityLevel | communityLevels}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChangeOne(scope.row.id, scope.row.status)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openExamine(scope.row.id,0)">查看</el-button>
            <el-button size="mini" @click="openExamine(scope.row.id,1)">修改</el-button>
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
        options: [{
          value: '0',
          label: '会员'
        }, {
          value: '1',
          label: 'D1'
        }, {
          value: '2',
          label: 'D2'
        }, {
          value: '3',
          label: 'D3'
        }, {
          value: '4',
          label: 'D4'
        }, {
          value: '5',
          label: 'D5'
        }],
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
        umsData:{},
        val: ''
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
      activatedStates(val) {
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
            console.log(res.data)
            this.umsData = res.data
            if(type==0) this.dialogFormVisible = true;
            if(type==1) this.dialogTableVisible=true;
            let communityLevel = res.data.communityLevel
            this.val = this.options[communityLevel].value
          }
        })
      },
      upPhone(){
        var myreg = /^[1][1,2,3,4,5,7,8,9][0-9]{9}$/
        if (!myreg.test(this.umsData.phone)) {
          return this.$message({
            type: "error",
            message: "请输入正确的手机号码!",
          });
        }
        let data = {
          memberId:  this.umsData.id,
          phone: this.umsData.phone,
          communityLevel:this.val
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


