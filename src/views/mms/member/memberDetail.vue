<template>
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">编号</el-col>
          <el-col :span="6" class="table-cell-title">等级</el-col>
          <el-col :span="6" class="table-cell-title">用户名</el-col>
          <el-col :span="6" class="table-cell-title">密码</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{member.id}}</el-col>
          <el-col :span="6" class="table-cell">{{member.memberLevelId}}</el-col>
          <el-col :span="6" class="table-cell">{{member.username}}</el-col>
          <el-col :span="6" class="table-cell">{{member.password}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">昵称</el-col>
          <el-col :span="6" class="table-cell-title">手机号码</el-col>
          <el-col :span="6" class="table-cell-title">启用状态</el-col>
          <el-col :span="6" class="table-cell-title">注册时间</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{member.nickname}}</el-col>
          <el-col :span="6" class="table-cell">{{member.phone}}</el-col>
          <el-col :span="6" class="table-cell">{{member.status}}</el-col>
          <el-col :span="6" class="table-cell">{{member.createTime}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">头像</el-col>
          <el-col :span="6" class="table-cell-title">性别</el-col>
          <el-col :span="6" class="table-cell-title">生日</el-col>
          <el-col :span="6" class="table-cell-title">所做城市</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{member.icon}}</el-col>
          <el-col :span="6" class="table-cell">{{member.gender}}</el-col>
          <el-col :span="6" class="table-cell">{{member.birthday}}</el-col>
          <el-col :span="6" class="table-cell">{{member.city}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">职业</el-col>
          <el-col :span="6" class="table-cell-title">个性签名</el-col>
          <el-col :span="6" class="table-cell-title">用户来源</el-col>
          <el-col :span="6" class="table-cell-title">积分</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{member.job}}</el-col>
          <el-col :span="6" class="table-cell">{{member.personalizedSignature}}</el-col>
          <el-col :span="6" class="table-cell">{{member.sourceType}}</el-col>
          <el-col :span="6" class="table-cell">{{member.integration}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">成长值</el-col>
          <el-col :span="6" class="table-cell-title">剩余抽奖次数</el-col>
          <el-col :span="6" class="table-cell-title">历史积分数量</el-col>
          <el-col :span="6" class="table-cell-title">真实姓名</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{member.growth}}</el-col>
          <el-col :span="6" class="table-cell">{{member.luckeyCount}}</el-col>
          <el-col :span="6" class="table-cell">{{member.historyIntegration}}</el-col>
          <el-col :span="6" class="table-cell">{{member.realName}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">身份证号码</el-col>
          <el-col :span="6" class="table-cell-title">实名认证状态</el-col>
          <el-col :span="6" class="table-cell-title">认证时间</el-col>
          <el-col :span="6" class="table-cell-title">推荐人</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{member.idNumber}}</el-col>
          <el-col :span="6" class="table-cell">{{member.certification}}</el-col>
          <el-col :span="6" class="table-cell">{{member.certificationTime}}</el-col>
          <el-col :span="6" class="table-cell">{{member.referrer}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">可用余额</el-col>
          <el-col :span="6" class="table-cell-title">冻结余额</el-col>
          <el-col :span="6" class="table-cell-title">激活状态</el-col>
          <el-col :span="6" class="table-cell-title">用户类型</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{member.balance}}</el-col>
          <el-col :span="6" class="table-cell">{{member.blockedBalance}}</el-col>
          <el-col :span="6" class="table-cell">{{member.activatedState}}</el-col>
          <el-col :span="6" class="table-cell">{{member.userType}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">交易密码</el-col>
          <el-col :span="6" class="table-cell-title"></el-col>
          <el-col :span="6" class="table-cell-title"></el-col>
          <el-col :span="6" class="table-cell-title"></el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{member.transactionPassword}}</el-col>
          <el-col :span="6" class="table-cell"></el-col>
          <el-col :span="6" class="table-cell"></el-col>
          <el-col :span="6" class="table-cell"></el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getMemberDetail } from "@/api/member";
import { formatDate } from "@/utils/date";
const defaultReceiverInfo = {
  orderId: null,
  receiverName: null,
  receiverPhone: null,
  receiverPostCode: null,
  receiverDetailAddress: null,
  receiverProvince: null,
  receiverCity: null,
  receiverRegion: null,
  status: null,
};
export default {
  name: "memberDetail",
  data() {
    return {
      id: null,
      member: {},
    };
  },
  created() {
    this.id = this.list = this.$route.query.id;
    getMemberDetail(this.id).then((response) => {
      this.member = response.data;
    });
  },
  filters: {
    formatNull(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else {
        return value;
      }
    },
    formatLongText(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else if (value.length > 8) {
        return value.substr(0, 8) + "...";
      } else {
        return value;
      }
    },
  },
  methods: {
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>
 <style scoped>
.detail-container {
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #f2f6fc;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}

.operate-button-container {
  float: right;
  margin-right: 20px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>


