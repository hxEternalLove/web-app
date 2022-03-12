css：bootstrap、layui、zui、amazeui
js：element-ui、miniui

### Vue 
#### 生命周期
`beforeCreate`->`created`->`beforeMount`->`mounted`->`beforeUpdate`->`updated`->`beforeDestroy`->`destroyed`

#### 方法函数
`data`-基础数据，`computed`-计算属性，`methods`-页面方法，`watch`-侦听属性,
```// 数据
data: () => ({
    show: true,
    ...
}),
computed: {
    sunAmt(){
        return this.show?1:0
    },
    now: function () {
        return Date.now()
    }
},
methods: {
    event(e){
        console.log(e);
        this.$el;this.$data
    }
},
watch: {
    msg(newValue, oldValue){// oldValue不用，可省略
        console.log(newValue, oldValue)
    },
    // 另一种
    // msg: {
    //     handler(newValue, oldValue){
    //         console.log(newValue, oldValue);
    //     },
    //     immediate: true
    // }
}

```

#### v-bind:class/v-bind:style 添加类名/内联样式的各种语法
- **对象**
  class:`<div v-bind:class="{ active: isActive }"></div>`
  style:`<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>`
- **数组**
  class:`<div v-bind:class="[activeClass, errorClass]"></div>`
  根据条件切换列表中的 class，可用三元表达式
  `<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>`
  style:`<div v-bind:style="[baseStyles, overridingStyles]"></div>`
  >下面这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。
  `<div :style="{display:['-webkit-box','-ms-flexbox','flex']}"></div>`

#### 指令
`v-bind:`缩写为`:`,`v-on:`缩写为`@`,
`v-for`
```用在自定义组件上。
// 不自动将 item 注入到组件里的原因是，这会使得组件与 v-for 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

#### key管理可复用组件
>Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

如果想让两个元素是完全独立的，不要复用它们。只需添加一个具有唯一值的 key。

#### 事件修饰符
`.stop`-阻止事件继续传播(事件冒泡)
`.prevent`-阻止默认事件
`.capture`-开启事件捕获器，优先在此处理后再交出去
`.self`-本身事件触发，非内部传播事件
`.once`-事件只会触发一次
`.passive`-立即触发默认事件。
>浏览器只有等内核线程执行到事件监听器对应的js代码时，才知道内部是否会调用preventDefault函数来阻止事件默认行为。这种情况下，用户手指事件无法快速产生，导致页面无法快速执行滑动逻辑，显示卡顿效果。
**.passive**就为了告诉浏览器不用查了，直接执行默认动作
```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```
使用修饰符时，**顺序很重要**；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。
```
**2.1.4 新增 once**
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```
>不像其它只能对原生的 DOM 事件起作用的修饰符，.once 修饰符还能被用到**自定义的组件事件**上。

**2.3.0 新增 passive**
>Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。
```
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```
>这个 .passive 修饰符尤其能够 **提升移动端的性能**。
**不要把 .passive 和 .prevent 一起使用**，因为 .prevent 将会**被忽略**，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。

#### 按键修饰符 keyup.修饰符
在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 v-on 在监听键盘事件时添加按键修饰符：
```
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```
`<input v-on:keyup.page-down="onPageDown">`
在上述示例中，处理函数只会在 $event.key 等于 PageDown 时被调用。

**按键码**
>keyCode 的事件用法**已经被废弃**了并可能不会被最新的浏览器支持。

使用 keyCode attribute 也是允许的：
`<input v-on:keyup.13="submit">`
为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：

`.enter`
`.tab`
`.delete (捕获“删除”和“退格”键)`
`.esc`
`.space`
`.up`
`.down`
`.left`
`.right`
>有一些按键 (.esc 以及所有的方向键) 在 IE9 中有不同的 key 值, 如果你想支持 IE9，这些内置的别名应该是首选。
你还可以通过全局 config.keyCodes 对象自定义按键修饰符别名：
```
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```
**系统修饰键**
2.1.0 新增
可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

`.ctrl`
`.alt`
`.shift`
`.meta`
>注意：在 Mac 系统键盘上，meta 对应 command 键 (**⌘**)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (**⊞**)。在 Sun 操作系统键盘上，meta 对应实心宝石键 (**◆**)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。

例如：
```
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```
请注意修饰键与常规按键不同，在和 keyup 事件一起用时，事件触发时**修饰键必须处于按下状态**。换句话说，只有在按住 ctrl 的情况下释放其它按键，才能触发 keyup.ctrl。而单单释放 ctrl 也不会触发事件。如果你想要这样的行为，请为 ctrl 换用 keyCode：keyup.17。

`.exact` 修饰符
2.5.0 新增
`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。
```
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```
**鼠标按钮修饰符**
2.2.0 新增

`.left`
`.right`
`.middle`
这些修饰符会限制处理函数仅响应特定的**鼠标按钮**。
#### 表单
`.lazy`
在默认情况下，v-model 在每次 input 事件触发后将输入框的值与**数据进行同步** (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转为在 change 事件_之后_进行同步：
```
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
```
`.number`
如果想自动将用户的**输入值转为数值类型**，可以给 v-model 添加 number 修饰符：
`<input v-model.number="age" type="number">`
这通常很有用，因为即使在 type="number" 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 parseFloat() 解析，则会返回原始的值。

`.trim`
如果要自动**过滤**用户输入的**首尾空白**字符，可以给 v-model 添加 trim 修饰符：
`<input v-model.trim="msg">`
#### 动态组件 component
有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里：
上述内容可以通过 Vue 的 <component> 元素加一个特殊的 is attribute 来实现：
```
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```
在上述示例中，currentTabComponent 可以包括
- 已注册组件的名字，或
- 一个组件的选项对象

#### 组件注册
定义组件名：
1. 当使用 kebab-case (**短横线分隔**命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。
2. 当使用 PascalCase (**首字母大写**命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。
>注意，直接在 DOM (即**非字符串的模板**) 中使用时只有 kebab-case 是有效的。

**全局注册**
```
Vue.component('my-component-name', {
  // ... 选项 ...
})
```
**局部注册**
```
var ComponentA = { /* ... */ }
// 然后在 components 选项中定义你想要使用的组件：
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA
  }
})
```
或者如果你通过 Babel 和 webpack 使用 ES2015 模块，那么代码看起来更像：
```
// 在模块系统中局部注册
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
```
#### props
**命名**
>当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：
**postTitle再html模板中使用post-title表示**
```
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```
重申一次，如果你使用字符串模板，那么这个限制就不存在了。

**Prop 类型**
以**字符串数组形式**列出的 prop：
`props: ['title', 'likes', 'isPublished', 'commentIds', 'author']`
每个 prop 都有**指定的值类型**。可以以**对象形式**列出 prop，这些 property 的名称和值分别是 prop 各自的名称和类型：
```
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```
>**prop单向数据流**：所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态。
**验证**
为组件的 prop 指定验证要求，如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告。
```
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```
当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。
#### 自带封装过渡 transition

1. **`<transition>`标签**
一个抽象组件，且只对单个元素生效。(即`<transition>`标签只能用来包裹单元素。) 他有两个属性 **name、mode**
① name 可以理解为class动画的**名字(标识)**
② mode 可以理解为vue提供的动画**过渡模式**（in-out/out-in）
   - in-out：**新元素**先进行过渡，完成之后**当前元素过渡离开**。
   - out-in：**当前元素**先进行过渡，完成之后**新元素过渡进入**

### Element UI
```
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Loading,// 
  MessageBox,// 提醒
  Message,// 
  Notification// 消息通知
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Spinner);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Calendar);
Vue.use(Backtop);
Vue.use(PageHeader);
Vue.use(CascaderPanel);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
```
#### 引入过程，全局全量引入
**注意样式文件需要单独引入**
```
import ElementUI from 'element-ui';
Vue.use(ElementUI);
// 以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。
import 'element-ui/lib/theme-chalk/index.css';
```
**引入部分组件**
``
import { Button, Select } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
```
#### 内置过渡动画