import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import StudentHome from '../components/StudentHome.vue'
import TeacherHome from '../components/TeacherHome.vue'
import WelcomeStudent from '../components/WelcomeStudent.vue'
import WelcomeTeacher from '../components/WelcomeTeacher.vue'
import Competition from '../components/competition/Competition.vue'
import ManageCompetition from '../components/adManageCompe/ManageCompe.vue'
import Ask from '../components/Questionnaire/Ask.vue'
import ViewQuest from '../components/Questionnaire/ViewQuest.vue'
import Static from '../components/Questionnaire/Static.vue'
import Grade from '../components/grade/Grade.vue'
import GradeTeacher from '../components/gradeteacher/GradeTeacher.vue'
import GardeAnalysis from '../components/grade/GardeAnalysis.vue'
import UpdateGrade from '../components/updategrade/UpdateGrade.vue'
import Examinformation from '../components/examinformation/Examinformation.vue'
import TeacherExaminfo from '../components/examinformation/TeacherExaminfo.vue'
import TeacherStuExam from '../components/examinformation/TeacherStuExam.vue'
import TeacherModifyExam from '../components/examinformation/TeacherModifyExam.vue'
import Announcement from '../components/Announce/Announcement.vue'
import TeacherAnnounce from '../components/Announce/TeacherAnnounce.vue'
import TeacherAnnouncement from '../components/Announce/TeacherAnnouncement.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  // 以下是刷新需要的中转页面
  {
    path: '/announceempty',
    component: () => import('../components/Announce/AnnounceEmpty.vue'),
  },
  {
    path: '/examinfoempty',
    component: () => import('../components/examinformation/ExaminfoEmpty.vue'),
  },
  {
    path: '/stuexamempty',
    component: () => import('../components/examinformation/StuexamEmpty.vue'),
  },
  {
    path: '/teamodifyempty',
    component: () => import('../components/examinformation/TeaModifyEmpty.vue'),
  },
  {
    path: '/studenthome',
    component: StudentHome,
    redirect: '/welcomestudent',
    children: [{
        path: '/welcomestudent',
        component: WelcomeStudent
      },
      {
        path: '/stupasswrd',
        component: () => import('../components/StuPasswrd.vue')
      },
      {
        path: '/competition',
        component: Competition
      },
      {
        path: '/viewQuest',
        component: ViewQuest
      },
      {
        path: '/comment',
        component: () => import('../components/comment/QandA.vue'),
        redirect: '/comment/question',
        children: [{
            path: 'question',
            component: () => import('../components/comment/Q.vue')
          },
          {
            path: 'myquestion',
            component: () => import('../components/comment/myQ.vue')
          },
          {
            path: 'myreply',
            component: () => import('../components/comment/myA.vue')
          },
          {
            path: 'releaseq',
            component: () => import('../components/comment/releaseQ')
          }
        ]
      },
      {
        path: '/grade',
        component: Grade
      },
      {
        path: '/gradeanalysis',
        component: GardeAnalysis
      },
      {
        path: '/examinformation',
        component: Examinformation
      },
      {
        path: '/announcement',
        component: Announcement
      }
    ]
  },


  //老师页面路由
  {
    path: '/teacherhome',
    component: TeacherHome,
    redirect: '/welcometeacher',
    children: [{
        path: '/welcometeacher',
        component: WelcomeTeacher
      },
      {
        path: '/teapasswrd',
        component: () => import('../components/TeaPasswrd.vue')
      },
      {
        path: '/gradeteacher',
        component: GradeTeacher
      },
      {
        path: '/updategrade',
        component: UpdateGrade
      },
      {
        path: '/teacherexaminfo',
        component: TeacherExaminfo
      },
      {
        path: '/teacherstuexam',
        component: TeacherStuExam
      },
      {
        path: '/teachermodifyexam',
        component: TeacherModifyExam
      },
      {
        path: '/teacherannounce',
        component: TeacherAnnounce
      },
      {
        path: '/teacherannouncement',
        component: TeacherAnnouncement
      },
      {
        path: '/managecompetition',
        component: ManageCompetition
      },
      {
        path: '/ask',
        component: Ask
      },
      {
        path: '/static',
        component: Static

      },
      {
        path: '/tcomment',
        component: () => import('../components/comment/tQandA.vue'),
        redirect: '/tcomment/tquestion',
        children: [{
            path: 'tquestion',
            component: () => import('../components/comment/tQ.vue')
          },
          {
            path: 'tmyquestion',
            component: () => import('../components/comment/tMyQ.vue')
          },
          {
            path: 'tmyreply',
            component: () => import('../components/comment/tMyA.vue')
          },
          {
            path: 'treleaseq',
            component: () => import('../components/comment/tReleaseQ')
          }
        ]
      }
      // {
      //   path: '/teacherannouncement',
      //   component: TeacherAnnouncement
      // },

      // {
      //   path: '/ask',
      //   component: Ask
      // },
      // {
      //   path: '/comment',
      //   component: () => import('../components/comment/QandA.vue'),
      //   redirect: '/comment/question',
      //   children: [
      //     {
      //       path: 'question',
      //       component: () => import('../components/comment/Q.vue')
      //     },
      //     {
      //       path: 'myquestion',
      //       component: () => import('../components/comment/myQ.vue')
      //     },
      //     {
      //       path: 'myreply',
      //       component: () => import('../components/comment/myreply.vue')
      //     }
      //   ]
      // },
      // {
      //   path: '/grade',
      //   component: Grade
      // },
      // {

      //   path: '/examinformation',
      //   component: Examinformation
      // },
      // {
      //   path: '/adexaminfo',
      //   component: AdExamInfo
      // },
      // {
      //   path: '/adstuexam',
      //   component: AdStuExam
      // },
      // {
      //   path: '/announcement',
      //   component: Announcement
      // },
      // {
      //   path: '/announce',
      //   component: Announce
      // },
      // {
      //   path: '/managecompetition',
      //   component: ManageCompetition
      // }



    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  //to为要访问的路径
  //from代表从哪个路径跳转过来
  //next为放行
  if (to.path === '/login')
    return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr)
    return next('/login')

  next()

})

export default router