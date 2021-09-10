//模拟评论数据
const question = {
    status: "成功",
    code: 200,
    data: [
      {
        id: 'comment0001', //主键id
        date: '2018-07-05 08:30',  //评论时间
        fromId: 'errhefe232213',  //评论者id
        fromName: '野兽先辈',   //评论者昵称
        fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //评论者头像
        likeNum: 3, //点赞人数
        content:'数学第二小题题目是不是出错了？',//主题
        replyNum:2},
        {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        fromId: 'errhefe232213',
        fromName: '野兽先辈',
        fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg',
        likeNum: 0,
        content:'哼哼啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        replyNum:0
      }
    ]
  };
  export{question}