import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Tooltip,
    Pagination,
    Dialog,
    TimePicker,
    DatePicker,
    Select,
    Option,
    Popover,
    MessageBox,
    TimeSelect,
    Scrollbar,
    Progress,
    Checkbox,
    CheckboxGroup,
    Divider,
    Radio,
    RadioGroup
} from 'element-ui'




Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// ���������ȫ�ֹ��ڵ�VUeԭ��ʵ��
Vue.prototype.$message = Message
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Popover)
Vue.use(TimeSelect)
Vue.use(Scrollbar)
Vue.use(Progress)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Divider)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.prototype.$confirm = MessageBox.confirm