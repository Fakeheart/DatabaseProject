<template>
    <div class="container">
        <div class="question" v-for="item in questions" :key="item.id">
            <div class="info"><!-- 这里是基本信息栏 -->
                <img class="avatar" :src='getAvatar(item)' width="36" height="36" /><!-- 头像框 -->
                <div class="right">
                    <div class="name">{{item.fromName}}</div><!-- 用户名 -->
                    <div class="date">{{item.date}}</div><!-- 日期 -->
                </div>
            </div>
            <div class="questionTitle">{{item.content}}</div><!-- 问题 -->
            <div class="control">
                <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
                    <i class="iconfont icon-like"></i>
                    <span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span>
                </span>
                <span class="questionReply" @click="showDetail(item)">
                    <i class="iconfont icon-question"></i>
                    <span class="like-num">{{item.replyNum > 0 ? item.replyNum + '条回答' : '暂无回答'}}</span>
                </span>
            </div>
        </div>
        <el-dialog
          title="讨论"
          :visible.sync="dialogVisible"
          width="60%">
          <div class=scontainer>

          <div class="sinfo"><!-- 这里是基本信息栏 -->
                <img class="savatar" :src="focusQuestion.fromAvatar" width="32" height="32" /><!-- 头像框 -->
                <div class="sright">
                    <div class="sname">{{focusQuestion.fromName}}</div><!-- 用户名 -->
                    <div class="center"></div>
                    <div class="sdate">{{focusQuestion.date}}</div><!-- 日期 -->
                </div>
          </div>
          <div class="squestionTitle">{{focusQuestion.content}}</div><!-- 问题 -->
          <el-scrollbar style="height:320px;">
          <div class="roller">
          <div class="reply" v-for="item in replies" :key="item.id">
            <div class="sinfo"><!-- 这里是基本信息栏 -->
                <img class="savatar" :src='getAvatar(item)' width="32" height="32" /><!-- 头像框 -->
                <div class="sright">
                    <div class="sname">{{item.fromName}}</div><!-- 用户名 -->
                    <div class="center"></div>
                    <div class="sdate">{{item.date}}</div><!-- 日期 -->
                </div>
            </div>
            <div class="content">{{item.content}}</div><!-- 问题 -->
            <span class="like" :class="{active: item.isLike}" @click="replyLikeClick(item)">
                    <i class="iconfont icon-like"></i>
                    <span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span>
                </span>
        </div>
          </div>
           </el-scrollbar>

          <span slot="footer" class="dialog-footer">
          <div class="writeReply">
              <div>
              <el-input 
                :rows="1"
                v-model="myReply"
                maxlength="500"
                placeholder="写下你的回答"
                @input="timeEffectInput"
                clearable>
              </el-input>
              </div>
              <div class="scenter"></div>
              <div >
                <el-button class="btn" type="success" round @click="commitAnswer()">发布</el-button>
              </div>
          </div>
          </span>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
  export default {
    props: {
      questions: {
        type: Array,
        required: true
      }
    },
    components: {},
    data() {
      return {
        AvatarUrl:'https://ui-avatars.com/api/?size=256&background=0D8ABC&color=fff&length=1&name=',
        inputquestion: '',
        dialogVisible: false,
        replies:[],
        focusQuestion:{//用户点击的问题
        id: '', //主键id
        date: '',  //评论时间
        fromId: '',  //评论者id
        fromName: '',   //评论者昵称
        fromAvatar: '', //评论者头像
        content:'',//主题
        },
        myReply:'',
        sendReply:{//打包给后端的数据
        id:'',//个人id
        rdate:'',//回复时间
        content:'',
        replyid:'',
        quesid:'',
        likeNum:0
        },
        likeQuestionId:'',
        likeReplyId:''
      }
    },
    computed: {},
    methods: {
      /* 获取头像 */
      getAvatar(item){
        var url=this.AvatarUrl+item.fromName;
        //console.log(url);
        return url;
      },
      /* 监听输入 */
      timeEffectInput(){
      var length = this.myReply.length
      if (length >= 500) {
        this.$message('字数上限：500');
      }
      },
       /* 提问点赞 */
       likeClick(item) {
        if (item.isLike === null) {
          Vue.set(item, "isLike", true);//发现点赞数为空为item建立isLike属性
          item.likeNum++
        } else {
          if (item.isLike) {
            item.likeNum--
          } else {
            item.likeNum++
          }
          item.isLike = !item.isLike;
          this.likeQuestionId=item.id;
          this.questionLike();
        }
      },
      /* 评论点赞 */
      replyLikeClick(item){
        if (item.isLike === null) {
          Vue.set(item, "isLike", true);//发现点赞数为空为item建立isLike属性
          item.likeNum++
        } else {
          if (item.isLike) {
            item.likeNum--
          } else {
            item.likeNum++
          }
          item.isLike = !item.isLike;
        }
        this.likeReplyId=item.id;
        this.replyLike();
      },
    showDetail(item) {
      var t={
        id:item.id,
        date: item.date,  //评论时间
        fromId: item.fromid,  //评论者id
        fromName: item.fromName,   //评论者昵称
        fromAvatar:this.getAvatar(item), //评论者头像
        content:item.content,//主题
      }
      this.focusQuestion=t;
      this.replies=item.reply;
      this.dialogVisible = true;
    },
    commitAnswer(){//提交回答
      if(this.myReply==='')
      {
        this.$message('内容不能为空哦~');
      }
      else{
      this.sendReply.id=window.sessionStorage.getItem("id");
      const nowDate=new Date();
      var year=nowDate.getFullYear().toString();
      var month=(nowDate.getMonth()+1).toString();
      var day=nowDate.getDate().toString();
      var hour=nowDate.getHours().toString();
      var minutes=nowDate.getMinutes().toString();
      this.sendReply.rdate=year+'-'+month+'-'+day+' '+hour+':'+minutes;
      this.sendReply.content=this.myReply;
      this.sendReply.quesid=this.focusQuestion.id;
      this.sendReply.replyid='r'+year+month+day+hour+minutes+this.sendReply.id;

      console.log("sendReply");
      console.log(this.sendReply);
      this.sendReplyData();
      }
    },
    async sendReplyData(){//发送回答
      /* const myGet = (data1) => {
      this.questionData = data1.data;
      }; */
        await fetch("http://175.27.240.116:5000/api/Reply/Insert",{
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(this.sendReply)
      })
        .then((response) => response.json()) //将获取的数据转化成json格式
        .then((datastu) => myGet(datastu)) //datastu储存转化完成的数据
        .catch((error) => console.error("Unable to get items".error)); //报错信息
        //console.log(this.questionData)
        this.$message.success('发送成功');
        //this.myReply='';
        this.$router.go(0)

    },
    async questionLike(){//问题点赞
      /* const myGet = (data1) => {
      this.questionData = data1.data;
      }; */
      const sendId={quesid:this.likeQuestionId}
        await fetch("http://175.27.240.116:5000/api/Problem/Edit",{
        method: 'PUT',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(sendId)
      })
        .then((response) => response.json()) //将获取的数据转化成json格式
        .then((datastu) => myGet(datastu)) //datastu储存转化完成的数据
        .catch((error) => console.error("Unable to get items".error)); //报错信息
        //console.log(this.questionData)
    },
    async replyLike(){
      /* const myGet = (data1) => {
      this.questionData = data1.data;
      }; */
      const sendId={replyid:this.likeReplyId}
        await fetch("http://175.27.240.116:5000/api/Reply/Edit",{
        method: 'PUT',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(sendId)
      })
        .then((response) => response.json()) //将获取的数据转化成json格式
        .then((datastu) => myGet(datastu)) //datastu储存转化完成的数据
        .catch((error) => console.error("Unable to get items".error)); //报错信息
        //console.log(this.questionData)
    },
    created() {
      //console.log(this.questions)
    }
    }
  }
</script>

<style>
.el-scrollbar__wrap    {
    overflow-x: hidden;
}
</style>




<style scoped lang="less">
  .container {
    padding: 0 10px;
    box-sizing: border-box;
    .question {
      display: flex;
      flex-direction: column;
      padding: 10px;
      background-color:rgba(255,255,255,0.5);
      border-radius:5px;
      margin-bottom:10px;
      .info {
        display: flex;
        align-items: center;
        .avatar {
          border-radius: 50%;
        }
        .right {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          .name {
            font-size: 16px;
            color: #303133;
            margin-bottom: 5px;
            font-weight: 500;
          }
          .date {
            font-size: 12px;
            color: #909399;
          }
        }
      }
      .questionTitle{
        box-sizing:border-box;
        margin-top:10px;
        margin-bottom:10px;
        font-size:17px;
        color:black;
        font-weight:500;
        text-align:left;
        padding-top:10px;
        padding-bottom:10px;
        padding-left:4px;
      }
      .control {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #909399;
        .like {
          display: flex;
          align-items: center;
          margin-right: 20px;
          cursor: pointer;
          &.active, &:hover {
            color: #409EFF;
          }
          .iconfont {
            font-size: 14px;
            margin-right: 5px;
          }
        }
        .questionReply {
          display: flex;
          align-items: center;
          cursor: pointer;
         &.active, &:hover {
            color: #409EFF;
          }
          .iconfont {
            font-size: 16px;
            margin-right: 5px;
          }
        }
      }
    }
   /*  下方是问题细节弹窗的样式 */
    .scontainer
    {
      height:460px;
      .sinfo {
        display: flex;
        align-items: center;
        .savatar {
          border-radius: 50%;
        }
        .sright {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 10px;
          width:100%;
          .sname {
            font-size: 16px;
            color: #303133;
            margin-bottom: 2px;
            font-weight: 500;
          }
          .center{
            flex:1;
          }
          .sdate {
            font-size: 13px;
            color: #909399;
            margin-right:10px;
          }
        }
      }
      .squestionTitle{
        box-sizing:border-box;
        margin-top:5px;
        margin-bottom:10px;
        font-size:17px;
        color:black;
        font-weight:550;
        text-align:left;
        padding-top:5px;
        padding-bottom:10px;
        padding-left:4px;
        /* border-bottom: solid 0.5px #909399; */
      }
      .content{
        box-sizing:border-box;
        margin-top:5px;
        margin-bottom:10px;
        font-size:15px;
        color:black;
        font-weight:500;
        text-align:left;
        padding-top:5px;
        padding-left:5px;
      }
      .like {
          margin-left:5px;
          cursor: pointer;
          font-size:13px;
          &.active, &:hover {
          color: #409EFF;
          }
      }
      .roller{
        padding-bottom:20px;
        .reply{
        border-left:solid 1.5px #909399;
        padding-left:12px;
        padding-top:5px;
        display: flex;
        flex-direction: column;
        align-items: left;
        margin-bottom:10px;
      }
      }
      .writeReply{
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding-top:20px;
        .el-input{
          width:300px;
        }
        .scenter{
          flex:1;
        }
        .btn-control{
          margin-right:20px;
        }
      }
    }
  }
</style>