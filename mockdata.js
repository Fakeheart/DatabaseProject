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
        likeNum: 32, //点赞人数
        content:'数学第二小题题目是不是出错了？',//主题
        replyNum:9,
        reply:[
          {
            id:'reply0001',
            date: '2018-07-05 08:30',
            fromId: 'senpai114514',  //回答者id
            fromName: 'senpai',   //回答者昵称
            fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //回答者头像
            likeNum: 10, //点赞人数
            content:'确实，好像是缺少了条件，蹲一个老师来解释一下'//内容
          },
          {
            id:'reply0002',
            date: '2018-07-05 08:30',
            fromId: 'senpai1919810',  //回答者id
            fromName: 'yysy',   //回答者昵称
            fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //回答者头像
            likeNum: 8, //点赞人数
            content:'啊这，原来是题目的问题吗？？？我为这一题至少花了半个小时  枯了.既然如何， 我们不得不面对一个非常尴尬的事实，那就是， 一般来讲，我们都必须务必慎重的考虑考虑。 俾斯麦说过一句著名的话，对于不屈不挠的人来说，没有失败这回事。这不禁令我深思. 总结的来说， 克劳斯·莫瑟爵士曾经说过，教育需要花费钱，而无知也是一样。这句话语虽然很短, 但令我浮想联翩. 了解清楚问题到底是一种怎么样的存在，是解决一切问题的关键。'//内容
          },
          {
            id:'reply0002',
            date: '2018-07-05 08:30',
            fromId: 'senpai1919810',  //回答者id
            fromName: 'yysy',   //回答者昵称
            fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //回答者头像
            likeNum: 8, //点赞人数
            content:'啊这，原来是题目的问题吗？？？我为这一题至少花了半个小时  枯了'//内容
          },
          {
            id:'reply0002',
            date: '2018-07-05 08:30',
            fromId: 'senpai1919810',  //回答者id
            fromName: 'yysy',   //回答者昵称
            fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //回答者头像
            likeNum: 8, //点赞人数
            content:'啊这，原来是题目的问题吗？？？我为这一题至少花了半个小时  枯了'//内容
          },
          {
            id:'reply0002',
            date: '2018-07-05 08:30',
            fromId: 'senpai1919810',  //回答者id
            fromName: 'yysy',   //回答者昵称
            fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //回答者头像
            likeNum: 8, //点赞人数
            content:'啊这，原来是题目的问题吗？？？我为这一题至少花了半个小时  枯了'//内容
          },
          {
            id:'reply0002',
            date: '2018-07-05 08:30',
            fromId: 'senpai1919810',  //回答者id
            fromName: 'yysy',   //回答者昵称
            fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //回答者头像
            likeNum: 8, //点赞人数
            content:'啊这，原来是题目的问题吗？？？我为这一题至少花了半个小时  枯了'//内容
          },
          {
            id:'reply0002',
            date: '2018-07-05 08:30',
            fromId: 'senpai1919810',  //回答者id
            fromName: 'yysy',   //回答者昵称
            fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //回答者头像
            likeNum: 8, //点赞人数
            content:'啊这，原来是题目的问题吗？？？我为这一题至少花了半个小时  枯了'//内容
          },
          {
            id:'reply0002',
            date: '2018-07-05 08:30',
            fromId: 'senpai1919810',  //回答者id
            fromName: 'yysy',   //回答者昵称
            fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //回答者头像
            likeNum: 8, //点赞人数
            content:'啊这，原来是题目的问题吗？？？我为这一题至少花了半个小时  枯了'//内容
          },
          {
            id:'reply0002',
            date: '2018-07-05 08:30',
            fromId: 'senpai1919810',  //回答者id
            fromName: 'yysy',   //回答者昵称
            fromAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //回答者头像
            likeNum: 8, //点赞人数
            content:'啊这，原来是题目的问题吗？？？我为这一题至少花了半个小时  枯了'//内容
          }
        ]
      },
      {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        fromId: 'errhefe232213',
        fromName: 'van dark',
        fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        likeNum: 0,
        content:'本次物理大题第一题是否有简便解法？',
        replyNum:0,
        reply:[]
      },
      {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        fromId: 'errhefe232213',
        fromName: 'van dark',
        fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        likeNum: 0,
        content:'本次物理大题第一题是否有简便解法？',
        replyNum:0,
        reply:[]
      },
      {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        fromId: 'errhefe232213',
        fromName: 'van dark',
        fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        likeNum: 0,
        content:'本次物理大题第一题是否有简便解法？',
        replyNum:0,
        reply:[]
      },
      {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        fromId: 'errhefe232213',
        fromName: 'van dark',
        fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        likeNum: 0,
        content:'本次物理大题第一题是否有简便解法？',
        replyNum:0,
        reply:[]
      },
      {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        fromId: 'errhefe232213',
        fromName: 'van dark',
        fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        likeNum: 0,
        content:'本次物理大题第一题是否有简便解法？',
        replyNum:0,
        reply:[]
      },
      {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        fromId: 'errhefe232213',
        fromName: 'van dark',
        fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        likeNum: 0,
        content:'本次物理大题第一题是否有简便解法？',
        replyNum:0,
        reply:[]
      },
      {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        fromId: 'errhefe232213',
        fromName: 'van dark',
        fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        likeNum: 0,
        content:'本次物理大题第一题是否有简便解法？',
        replyNum:0,
        reply:[]
      },
      {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        fromId: 'errhefe232213',
        fromName: 'van dark',
        fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        likeNum: 0,
        content:'本次物理大题第一题是否有简便解法？',
        replyNum:0,
        reply:[]
      },
      {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        fromId: 'errhefe232213',
        fromName: 'van dark',
        fromAvatar: 'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        likeNum: 0,
        content:'本次物理大题第一题是否有简便解法？',
        replyNum:0,
        reply:[]
      }
    ]
  };
  export{question}