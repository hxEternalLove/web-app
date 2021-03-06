####1. 使用变量;
sass让人们受益的一个重要特性就是它为css引入了变量。
`sass使用$符号来标识变量(老版本的sass使用!来标识变量)，比如$highlight-color和$sidebar-width。`为什么选择$ 符号呢？因为它好认、更具美感，且在CSS中并无他用，不会导致与现存或未来的css语法冲突。
#####1-1. 变量声明;
sass变量的声明和css属性的声明很像：
`$highlight-color: #F90;`
这意味着变量`$highlight-color`现在的值是#F90。任何可以用作css属性值的赋值都可以用作sass的变量值，甚至是以**空格**分割的多个属性值，如`$basic-border: 1px solid black;`，或以**顿号**分割的多个属性值，如`$plain-font: "Myriad Pro"、Myriad、"Helvetica Neue"、Helvetica、"Liberation Sans"、Arial和sans-serif; sans-serif;`。这时变 量还没有生效，除非你引用这个变量——我们很快就会了解如何引用。

与CSS属性不同，变量可以在**css规则块定义之外**存在。当变量定义在**css规则块内**，那么该变量只能在此规则块内使用。如果它们出现在任何形式的{...}块中（如@media或者@font-face块），情况也是如此：
```
$nav-color: #F90;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}

//编译后

nav {
  width: 100px;
  color: #F90;
}
```
#####1-2. 变量引用;
凡是css属性的标准值（比如说1px或者bold）可存在的地方，变量就可以使用。css生成时，变量会被它们的值所替代。之后，如果你需要一个不同的值，只需要改变这个变量的值，则所有引用此变量的地方生成的值都会随之改变。
```
$highlight-color: #F90;
.selected {
  border: 1px solid $highlight-color;
}

//编译后

.selected {
  border: 1px solid #F90;
}
```
在声明变量时，变量值也可以引用其他变量。当你通过粒度区分，为不同的值取不同名字时，这相当有用。下例在独立的颜色值粒度上定义了一个变量，且在另一个更复杂的边框值粒度上也定义了一个变量：
```
$highlight-color: #F90;
$highlight-border: 1px solid $highlight-color;
.selected {
  border: $highlight-border;
}

//编译后

.selected {
  border: 1px solid #F90;
}
```
#####1-3. 变量名用中划线还是下划线分隔;
sass的变量名可以与css中的属性名和选择器名称相同，包括中划线和下划线。用中划线声明的变量可以使用下划线的方式引用，反之亦然。
```

$link-color: blue;
a {
  color: $link_color;
}

//编译后

a {
  color: blue;
}
```
####2. 嵌套CSS 规则;
css中重复写选择器是非常恼人的。如果要写一大串指向页面中同一块的样式时，往往需要 一遍又一遍地写同一个ID，像这种情况，在Sass中，你可以在规则块中嵌套规则块。sass在输出css时会帮你把这些嵌套规则处理好，避免你的重复书写。
```
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
 /* 编译后 */
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
```
一个给定的规则块，既可以像普通的CSS那样包含属性，又可以嵌套其他规则块。当你同时要为一个容器元素及其子元素编写特定样式时，这种能力就非常有用了。
```
#content {
  background-color: #f5f5f5;
  aside { background-color: #eee }
}
```
容器元素的样式规则会被单独抽离出来，而嵌套元素的样式规则会像容器元素没有包含任何属性时那样被抽离出来。

```
#content { background-color: #f5f5f5 }
#content aside { background-color: #eee }
```
大多数情况下这种简单的嵌套都没问题，但是有些场景下不行，比如你想要在嵌套的选择器 里边立刻应用一个类似于：hover的伪类。为了解决这种以及其他情况，sass提供了一个特殊结 构&。
#####2-1. 父选择器的标识符&;
一般情况下，sass在解开一个嵌套规则时就会把父选择器（#content）通过一个空格连接到子选择器的前边（article和aside）形成（#content article和#content aside）。这种在CSS里边被称为后代选择器，因为它选择ID为content的元素内所有命中选择器article和aside的元素。但在有些情况下你却不会希望sass使用这种后代选择器的方式生成这种连接。

最常见的一种情况是当你为链接之类的元素写：hover这种伪类时，你并不希望以后代选择器的方式连接。比如说，下面这种情况sass就无法正常工作：
```
article a {
  color: blue;
  :hover { color: red }
}
```
这意味着color: red这条规则将会被应用到选择器article a :hover，article元素内链接的所有子元素在被hover时都会变成红色。这是不正确的！你想把这条规则应用到超链接自身，而后代选择器的方式无法帮你实现。

解决之道为使用一个特殊的sass选择器，即父选择器。在使用嵌套规则时，父选择器能对于嵌套规则如何解开提供更好的控制。它就是一个**简单的&符号**，且可以放在任何一个选择器可出现的地方，比如h1放在哪，它就可以放在哪。
```
article a {
  color: blue;
  &:hover { color: red }
}
```
当包含父选择器标识符的嵌套规则被打开时，它不会像后代选择器那样进行拼接，**而是&被父选择器直接替换**：
```
article a { color: blue }
article a:hover { color: red }
```
在为父级选择器添加：hover等伪类时，这种方式非常有用。同时父选择器标识符还有另外一种用法，你可以在父选择器之前添加选择器。举例来说，当用户在使用IE浏览器时，你会通过JavaScript在`<body>`标签上添加一个**ie的类名**，为这种情况编写特殊的样式如下：
```
#content aside {
  color: red;
  body.ie & { color: green }
}

/*编译后*/
#content aside {color: red};
body.ie #content aside { color: green }
```
sass在选择器嵌套上是非常智能的，即使是带有父选择器的情况。当sass遇到群组选择器（由多个逗号分隔开的选择器形成）也能完美地处理这种嵌套。

#####2-2. 群组选择器的嵌套;
在CSS里边，选择器h1、h2和h3会同时命中h1元素、h2元素和h3元素。与此类似，.button button会命中button元素和类名为.button的元素。这种选择器称为群组选择器。群组选择器 的规则会对命中群组中任何一个选择器的元素生效。
```
.button, button {
  margin: 0;
}
```
当看到上边这段代码时，你可能还没意识到会有重复性的工作。但会很快发现：如果你需要在一个特定的容器元素内对这样一个群组选择器进行修饰，情况就不同了。css的写法会让你在群组选择器中的每一个选择器前都重复一遍容器元素的选择器。
`.container h1, .container h2, .container h3 { margin-bottom: .8em }`
非常幸运，sass的嵌套特性在这种场景下也非常有用。当sass解开一个群组选择器规则内嵌的规则时，它会把每一个内嵌选择器的规则都正确地解出来：
```
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
```

首先sass将.container和h1.container和h2.container和h3分别组合，然后将三 者重新组合成一个群组选择器，生成你前边看到的普通css样式。对于内嵌在群组选择器内的嵌 套规则，处理方式也一样：
```
nav, aside {
  a {color: blue}
}
```
首先sass将nav和aaside和a分别组合，然后将二者重新组合成一个群组选择器：
`nav a, aside a {color: blue}`
处理这种群组选择器规则嵌套上的强大能力，正是sass在减少重复敲写方面的贡献之一。尤其在当嵌套级别达到两层甚至三层以上时，与普通的css编写方式相比，只写一遍群组选择器大大减少了工作量。

有利必有弊，你需要特别注意**群组选择器**的规则嵌套生成的css。虽然sass让你的样式表看上去很小，但**实际生成的css却可能非常大**，这会降低网站的速度。

关于选择器嵌套的最后一个方面，我们看看sass如何处理组合选择器，比如>、+和~的使用。你将看到，这种场景下你甚至无需使用父选择器标识符。

#####2-3. 子组合选择器和同层组合选择器：>、+和~;
上边这三个组合选择器必须和其他选择器配合使用，以指定浏览器仅选择某种特定上下文中的元素。
```
article section { margin: 5px }
article > section { border: 1px solid #ccc }
```
你可以用**子组合选择器>选择一个元素的直接子元素**。上例中，第一个选择器会选择article下的所有命中section选择器的元素。第二个选择器只会选择article下紧跟着的子元素中命中section选择器的元素。

在下例中，你可以用**同层相邻组合选择器+选择header元素后紧跟的p元素**：
```
header + p { font-size: 1.1em }
```
你也可以用**同层全体组合选择器~，选择所有跟在article后的同层article元素**，不管它们之间隔了多少其他元素：
```
article ~ article { border-top: 1px dashed #ccc }
```
这些组合选择器可以毫不费力地应用到sass的规则嵌套中。可以把它们放在外层选择器后边，或里层选择器前边：
```
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
```
sass会如你所愿地将这些嵌套规则一一解开组合在一起：
```
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```
在sass中，不仅仅css规则可以嵌套，对属性进行嵌套也可以减少很多重复性的工作。

#####2-4. 嵌套属性;
在sass中，除了CSS选择器，属性也可以进行嵌套。尽管编写属性涉及的重复不像编写选择器那么糟糕，但是要反复写border-style，border-width，border-color以及border-*等也是非常烦人的。在sass中，你只需敲写一遍border：
```
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}
```
嵌套属性的规则是这样的：把属性名从中划线-的地方断开，在根属性后边添加一个冒号:，紧跟一个{ }块，把子属性部分写在这个{ }块中。就像css选择器嵌套一样，sass会把你的子属性一一解开，把根属性和子属性部分通过中划线-连接起来，最后生成的效果与你手动一遍遍写的css样式一样：
```
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
```
对于属性的缩写形式，你甚至可以像下边这样来嵌套，指明例外规则：
```
nav {
  border: 1px solid #ccc {
    left: 0px;
    right: 0px;
  }
}
```
这比下边这种同等样式的写法要好：
```
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
``` 
属性和选择器嵌套是非常伟大的特性，因为它们不仅大大减少了你的编写量，而且通过视觉上的缩进使你编写的样式结构更加清晰，更易于阅读和开发。

即便如此，随着你的样式表变得越来越大，这种写法也很难保持结构清晰。有时，处理这种大量样式的唯一方法就是把它们分拆到多个文件中。sass通过对css原有@import规则的改进直接支持了这一特性。

####3. 导入SASS文件;
css有一个特别不常用的特性，即@import规则，它允许在一个css文件中导入其他css文件。然而，后果是只有执行到@import时，浏览器才会去下载其他css文件，这导致页面加载起来特别慢。

sass也有一个@import规则，但不同的是，sass的@import规则在生成css文件时就把相关文件导入进来。这意味着所有相关的样式被归纳到了同一个css文件中，而无需发起额外的下载请求。另外，所有在被导入文件中定义的变量和混合器（参见2.5节）均可在导入文件中使用。

使用sass的@import规则并不需要指明被导入文件的全名。你可以省略.sass或.scss文件后缀（见下图）。这样，在不修改样式表的前提下，你完全可以随意修改你或别人写的被导入的sass样式文件语法，在sass和scss语法之间随意切换。举例来说，@import "sidebar";这条命令将把sidebar.scss文件中所有样式添加到当前样式表中。
![image.png](https://upload-images.jianshu.io/upload_images/2323089-0286f292708f6dba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#####3-1. 使用SASS部分文件;
当通过@import把sass样式分散到多个文件时，你通常只想生成少数几个css文件。那些专门为@import命令而编写的sass文件，并不需要生成对应的独立css文件，这样的sass文件称为局部文件。对此，sass有一个特殊的约定来命名这些文件。

此约定即，**sass局部文件的文件名以下划线开头**。这样，sass就不会在编译时单独编译这个文件输出css，而只把这个文件用作导入。当你@import一个局部文件时，还可以不写文件的全名，即省略文件名开头的下划线。举例来说，你想导入themes/_night-sky.scss这个局部文件里的变量，你只需在样式表中写@import "themes/night-sky";。

局部文件可以被多个不同的文件引用。当一些样式需要在多个页面甚至多个项目中使用时，这非常有用。在这种情况下，有时需要在你的样式表中对导入的样式稍作修改，sass有一个功能刚好可以解决这个问题，即默认变量值。

#####3-2. 默认变量值;
一般情况下，你反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值。举例说明：
```
$link-color: blue;
$link-color: red;
a {
color: $link-color;
}
```
在上边的例子中，超链接的color会被设置为red。这可能并不是你想要的结果，假如你写了一个可被他人通过@import导入的sass库文件，你可能希望导入者可以定制修改sass库文件中的某些值。使用sass的!default标签可以实现这个目的。它很像css属性中!important标签的对立面，不同的是!default用于变量，含义是：如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。
```
$fancybox-width: 400px !default;
.fancybox {
width: $fancybox-width;
}
```
在上例中，如果用户在导入你的sass局部文件之前声明了一个`$fancybox-width`变量，那么你的局部文件中对`$fancybox-width`赋值400px的操作就无效。如果用户没有做这样的声明，则`$fancybox-width`将默认为400px。

接下来我们将学习嵌套导入，它允许只在某一个选择器的范围内导入sass局部文件。

#####3-3. 嵌套导入;
跟原生的css不同，sass允许@import命令写在css规则内。这种导入方式下，生成对应的css文件时，局部文件会被直接插入到css规则内导入它的地方。举例说明，有一个名为_blue-theme.scss的局部文件，内容如下：
```
aside {
  background: blue;
  color: white;
}
```
然后把它导入到一个CSS规则内，如下所示：
```
.blue-theme {@import "blue-theme"}
```
//生成的结果跟你直接在.blue-theme选择器内写_blue-theme.scss文件的内容完全一样。
```
.blue-theme {
  aside {
    background: blue;
    color: #fff;
  }
}
``` 
被导入的局部文件中定义的所有变量和混合器，也会在这个规则范围内生效。这些变量和混合器不会全局有效，这样我们就可以通过嵌套导入只对站点中某一特定区域运用某种颜色主题或其他通过变量配置的样式。

有时，可用css原生的@import机制，在浏览器中下载必需的css文件。sass也提供了几种方法来达成这种需求。

#####3-4. 原生的CSS导入;
由于sass兼容原生的css，所以它也支持原生的CSS@import。尽管通常在sass中使用@import时，sass会尝试找到对应的sass文件并导入进来，但在下列三种情况下会生成原生的CSS@import，尽管这会造成浏览器解析css时的额外下载：

1. 被导入文件的名字以.css结尾；
2. 被导入文件的名字是一个URL地址（比如http://www.sass.hk/css/css.css），由此可用谷歌字体API提供的相应服务；
3. 被导入文件的名字是CSS的url()值。
这就是说，你不能用sass的@import直接导入一个原始的css文件，因为sass会认为你想用css原生的@import。但是，因为sass的语法完全兼容css，所以你可以把原始的css文件改名为.scss后缀，即可直接导入了。

####4. 静默注释;
css中注释的作用包括帮助你组织样式、以后你看自己的代码时明白为什么这样写，以及简单的样式说明。但是，你并不希望每个浏览网站源码的人都能看到所有注释。

sass另外提供了一种不同于css标准注释格式/* ... */的注释语法，即静默注释，其内容不会出现在生成的css文件中。静默注释的语法跟JavaScriptJava等类C的语言中单行注释的语法相同，**它们以//开头**，注释内容直到行末。
```
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```
实际上，css的标准注释格式/* ... */内的注释内容亦可在生成的css文件中抹去。当注释出现在原生css不允许的地方，如在css属性或选择器中，sass将不知如何将其生成到对应css文件中的相应位置，于是这些注释被抹掉。
```
body {
  color /* 这块注释内容不会出现在生成的css中 */: #333;
  padding: 1; /* 这块注释内容也不会出现在生成的css中 */ 0;
}
```
####5. 混合器;
如果你的整个网站中有几处小小的样式类似（例如一致的颜色和字体），那么使用变量来统一处理这种情况是非常不错的选择。但是当你的样式变得越来越复杂，你需要大段大段的重用样式的代码，独立的变量就没办法应付这种情况了。你可以通过sass的混合器实现大段样式的重用。

混合器使用@mixin标识符定义。看上去很像其他的CSS @标识符，比如说@media或者@font-face。这个标识符给一大段样式赋予一个名字，这样你就可以轻易地通过引用这个名字重用这段样式。下边的这段sass代码，定义了一个非常简单的混合器，目的是添加跨浏览器的圆角边框。
```
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```
然后就可以在你的样式表中通过@include来使用这个混合器，放在你希望的任何地方。@include调用会把混合器中的所有样式提取出来放在@include被调用的地方。如果像下边这样写：
```
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
```
//sass最终生成：
```
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```
在.notice中的属性border-radius-moz-border-radius和-webkit-border-radius全部来自rounded-corners这个混合器。这一节将介绍使用混合器来避免重复。通过使用参数，你可以使用混合器把你样式中的通用样式抽离出来，然后轻松地在其他地方重用。实际上，混合器太好用了，一不小心你可能会过度使用。大量的重用可能会导致生成的样式表过大，导致加载缓慢。所以，首先我们将讨论混合器的使用场景，避免滥用。

#####5-1. 何时使用混合器;
利用混合器，可以很容易地在样式表的不同地方共享样式。如果你发现自己在**不停地重复一段样式**，那就应该把这段样式构造成优良的混合器，尤其是这段样式本身就是一个逻辑单元，比如说是一组放在一起有意义的属性。

判断一组属性是否应该组合成一个混合器，一条经验法则就是你**能否为这个混合器想出一个好的名字**。如果你能找到一个很好的短名字来描述这些属性修饰的样式，比如rounded-cornersfancy-font或者no-bullets，那么往往能够构造一个合适的混合器。如果你找不到，这时候构造一个混合器可能并不合适。

混合器在某些方面跟css类很像。都是让你给一大段样式命名，所以在选择使用哪个的时候可能会产生疑惑。最重要的区别就是类名是在html文件中应用的，而混合器是在样式表中应用的。这就意味着类名具有语义化含义，而不仅仅是一种展示性的描述：用来描述html元素的含义而不是html元素的外观。而另一方面，**混合器是展示性的描述，用来描述一条css规则应用之后会产生怎样的效果**。

在之前的例子中，.notice是一个有语义的类名。如果一个html元素有一个notice的类名，就表明了这个html元素的用途：向用户展示提醒信息。rounded-corners混合器是展示性的，它描述了包含它的css规则最终的视觉样式，尤其是边框角的视觉样式。混合器和类配合使用写出整洁的html和css，因为使用语义化的类名亦可以帮你避免重复使用混合器。为了保持你的html和css的易读性和可维护性，在写样式的过程中一定要铭记二者的区别。

有时候仅仅把属性放在混合器中还远远不够，可喜的是，sass同样允许你把css规则放在混合器中。

#####5-2. 混合器中的CSS规则;
混合器中不仅可以包含属性，也可以包含css规则，包含选择器和选择器中的属性，如下代码:
```
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}
```
当一个包含css规则的混合器通过@include包含在一个父规则中时，在混合器中的规则最终会生成父规则中的嵌套规则。举个例子，看看下边的sass代码，这个例子中使用了no-bullets这个混合器：
```
ul.plain {
  color: #444;
  @include no-bullets;
}
```
sass的@include指令会将引入混合器的那行代码替换成混合器里边的内容。最终，上边的例子如下代码:
```
ul.plain {
  color: #444;
  list-style: none;
}
ul.plain li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0px;
}
```
混合器中的规则甚至可以使用sass的父选择器标识符&。使用起来跟不用混合器时一样，sass解开嵌套规则时，用父规则中的选择器替代&。

如果一个混合器只包含css规则，不包含属性，那么这个混合器就可以在文档的顶部调用，写在所有的css规则之外。如果你只是为自己写一些混合器，这并没有什么大的用途，但是当你使用一个类似于Compass的库时，你会发现，这是提供样式的好方法，原因在于你可以选择是否使用这些样式。

接下来你将学习如何通过给混合器传参数来让混合器变得更加灵活和可重用。

#####5-3. 给混合器传参;
混合器并不一定总得生成相同的样式。可以通过在@include混合器时给混合器传参，来定制混合器生成的精确样式。当@include混合器时，参数其实就是可以赋值给css属性值的变量。如果你写过JavaScript，这种方式跟JavaScript的function很像：
```
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```
当混合器被@include时，你可以把它当作一个css函数来传参。如果你像下边这样写：
```
a {
  @include link-colors(blue, red, green);
}

//Sass最终生成的是：
a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```
当你@include混合器时，有时候可能会很难区分每个参数是什么意思，参数之间是一个什么样的顺序。为了解决这个问题，sass允许通过语法$name: value的形式指定每个参数的值。这种形式的传参，参数顺序就不必再在乎了，只需要保证没有漏掉参数即可：
```
a {
    @include link-colors(
      $normal: blue,
      $visited: green,
      $hover: red
  );
}
```
尽管给混合器加参数来实现定制很好，但是有时有些参数我们没有定制的需要，这时候也需要赋值一个变量就变成很痛苦的事情了。所以sass允许混合器声明时给参数赋默认值。

#####5-4. 默认参数值;
为了在@include混合器时不必传入所有的参数，我们可以给参数指定一个默认值。参数默认值使用$name: default-value的声明形式，默认值可以是任何有效的css属性值，甚至是其他参数的引用，如下代码：
```
@mixin link-colors(
    $normal,
    $hover: $normal,
    $visited: $normal
  )
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```
如果像下边这样调用：`@include link-colors(red)` `$hover`和`$visited`也会被自动赋值为red。

混合器只是sass样式重用特性中的一个。我们已经了解到混合器主要用于样式展示层的重用，如果你想重用语义化的类呢？这就涉及sass的另一个重要的重用特性：选择器继承。

#### 6. 使用选择器继承来精简CSS;
使用sass的时候，最后一个减少重复的主要特性就是选择器继承。基于Nicole Sullivan面向对象的css的理念，选择器继承是说一个选择器可以继承为另一个选择器定义的所有样式。这个通过@extend语法实现，如下代码:
```
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```
在上边的代码中，.seriousError将会继承样式表中任何位置处为.error定义的所有样式。以class="seriousError" 修饰的html元素最终的展示效果就好像是class="seriousError error"。相关元素不仅会拥有一个3px宽的边框，而且这个边框将变成红色的，这个元素同时还会有一个浅红色的背景，因为这些都是在.error里边定义的样式。

.seriousError不仅会继承.error自身的所有样式，任何跟.error有关的组合选择器样式也会被.seriousError以组合选择器的形式继承，如下代码:
```
//.seriousError从.error继承样式
.error a{  //应用到.seriousError a
  color: red;
  font-weight: 100;
}
h1.error { //应用到hl.seriousError
  font-size: 1.2rem;
}
```
如上所示，在class="seriousError"的html元素内的超链接也会变成红色和粗体。

本节将介绍与混合器相比，哪种情况下更适合用继承。接下来在探索继承的工作细节之前，我们先了解一下继承的高级用法。最后，我们将看看使用继承可能会有哪些坑，学习如何避免这些坑。

#####6-1. 何时使用继承;
5-1节介绍了混合器主要用于展示性样式的重用，而类名用于语义化样式的重用。因为继承是基于类的（有时是基于其他类型的选择器），所以继承应该是建立在语义化的关系上。当一个元素拥有的类（比如说.seriousError）表明它属于另一个类（比如说.error），这时使用继承再合适不过了。

这有点抽象，所以我们从几个方面来阐释一下。想象一下你正在编写一个页面，给html元素添加类名，你发现你的某个类（比如说.seriousError）另一个类（比如说.error）的细化。你会怎么做？

你可以为这两个类分别写相同的样式，但是如果有大量的重复怎么办？使用sass时，我们提倡的就是不要做重复的工作。
你可以使用一个选择器组（比如说.error.seriousError）给这两个选择器写相同的样式。如果.error的所有样式都在同一个地方，这种做法很好，但是如果是分散在样式表的不同地方呢？再这样做就困难多了。
你可以使用一个混合器为这两个类提供相同的样式，但当.error的样式修饰遍布样式表中各处时，这种做法面临着跟使用选择器组一样的问题。这两个类也不是恰好有相同的 样式。你应该更清晰地表达这种关系。
综上所述你应该使用@extend。让.seriousError从.error继承样式，使两者之间的关系非常清晰。更重要的是无论你在样式表的哪里使用.error.seriousError都会继承其中的样式。
现在你已经更好地掌握了何时使用继承，以及继承有哪些突出的优点，接下来我们看看一些高级用法。

#####6-2. 继承的高级用法;
任何css规则都可以继承其他规则，几乎任何css规则也都可以被继承。大多数情况你可能只想对类使用继承，但是有些场合你可能想做得更多。最常用的一种高级用法是继承一个html元素的样式。尽管默认的浏览器样式不会被继承，因为它们不属于样式表中的样式，但是你对html元素添加的所有样式都会被继承。

接下来的这段代码定义了一个名为disabled的类，样式修饰使它看上去像一个灰掉的超链接。通过继承a这一超链接元素来实现：
```
.disabled {
  color: gray;
  @extend a;
}
```
假如一条样式规则继承了一个复杂的选择器，那么它只会继承这个复杂选择器命中的元素所应用的样式。举例来说， 如果.seriousError@extend.important.error ， 那么.important.error 和h1.important.error 的样式都会被.seriousError继承， 但是.important或者.error下的样式则不会被继承。这种情况下你很可能希望.seriousError能够分别继承.important或者.error下的样式。

如果一个选择器序列（#main .seriousError）@extend另一个选择器（.error），那么只有完全匹配#main .seriousError这个选择器的元素才会继承.error的样式，就像单个类 名继承那样。拥有class="seriousError"的#main元素之外的元素不会受到影响。

像#main .error这种选择器序列是不能被继承的。这是因为从#main .error中继承的样式一般情况下会跟直接从.error中继承的样式基本一致，细微的区别往往使人迷惑。

现在你已经了解了通过继承能够做些什么事情，接下来我们将学习继承的工作细节，在生成对应css的时候，sass具体干了些什么事情。

#####6-3. 继承的工作细节;
跟变量和混合器不同，继承不是仅仅用css样式替换@extend处的代码那么简单。为了不让你对生成的css感觉奇怪，对这背后的工作原理有一定了解是非常重要的。

@extend背后最基本的想法是，如果.seriousError @extend .error， 那么样式表中的任何一处.error都用.error.seriousError这一选择器组进行替换。这就意味着相关样式会如预期那样应用到.error和.seriousError。当.error出现在复杂的选择器中，比如说h1.error.error a或者#main .sidebar input.error[type="text"]，那情况就变得复杂多了，但是不用担心，sass已经为你考虑到了这些。

关于@extend有两个要点你应该知道。

跟混合器相比，继承生成的css代码相对更少。因为继承仅仅是重复选择器，而不会重复属性，所以使用继承往往比混合器生成的css体积更小。如果你非常关心你站点的速度，请牢记这一点。
继承遵从css层叠的规则。当两个不同的css规则应用到同一个html元素上时，并且这两个不同的css规则对同一属性的修饰存在不同的值，css层叠规则会决定应用哪个样式。相当直观：通常权重更高的选择器胜出，如果权重相同，定义在后边的规则胜出。
混合器本身不会引起css层叠的问题，因为混合器把样式直接放到了css规则中，而继承存在样式层叠的问题。被继承的样式会保持原有定义位置和选择器权重不变。通常来说这并不会引起什么问题，但是知道这点总没有坏处。

#####6-4. 使用继承的最佳实践;
通常使用继承会让你的css美观、整洁。因为继承只会在生成css时复制选择器，而不会复制大段的css属性。但是如果你不小心，可能会让生成的css中包含大量的选择器复制。

避免这种情况出现的最好方法就是不要在css规则中使用后代选择器（比如.foo .bar）去继承css规则。如果你这么做，同时被继承的css规则有通过后代选择器修饰的样式，生成css中的选择器的数量很快就会失控：
```
.foo .bar { @extend .baz; }
.bip .baz { a: b; }
```
在上边的例子中，sass必须保证应用到.baz的样式同时也要应用到.foo .bar（位于class="foo"的元素内的class="bar"的元素）。例子中有一条应用到.bip .baz（位于class="bip"的元素内的class="baz"的元素）的css规则。当这条规则应用到.foo .bar时，可能存在三种情况，如下代码:
```
<!-- 继承可能迅速变复杂 -->
<!-- Case 1 -->
<div class="foo">
  <div class="bip">
    <div class="bar">...</div>
  </div>
</div>
<!-- Case 2 -->
<div class="bip">
  <div class="foo">
    <div class="bar">...</div>
  </div>
</div>
<!-- Case 3 -->
<div class="foo bip">
  <div class="bar">...</div>
</div>
```
为了应付这些情况，sass必须生成三种选择器组合（仅仅是.bip .foo .bar不能覆盖所有情况）。如果任何一条规则里边的后代选择器再长一点，sass需要考虑的情况就会更多。实际上sass并不总是会生成所有可能的选择器组合，即使是这样，选择器的个数依然可能会变得相当大，所以如果允许，尽可能避免这种用法。

值得一提的是，只要你想，你完全可以放心地继承有后代选择器修饰规则的选择器，不管后代选择器多长，但有一个前提就是，不要用后代选择器去继承。

####7. 小结;
本文介绍了sass最基本部分,你可以轻松地使用sass编写清晰、无冗余、语义化的css。对于sass提供的工具你已经有了一个比较深入的了解，同时也掌握了何时使用这些工具的指导原则。

变量是sass提供的最基本的工具。通过变量可以让独立的css值变得可重用，无论是在一条单独的规则范围内还是在整个样式表中。变量、混合器的命名甚至sass的文件名，可以互换通用_和-。同样基础的是sass的嵌套机制。嵌套允许css规则内嵌套css规则，减少重复编写常用的选择器，同时让样式表的结构一眼望去更加清晰。sass同时提供了特殊的父选择器标识符&，通过它可以构造出更高效的嵌套。

你也已经学到了sass的另一个重要特性，样式导入。通过样式导入可以把分散在多个sass文件中的内容合并生成到一个css文件，避免了项目中有大量的css文件通过原生的css @import带来的性能问题。通过嵌套导入和默认变量值，导入可以构建更强有力的、可定制的样式。混合器允许用户编写语义化样式的同时避免视觉层面上样式的重复。你不仅学到了如何使用混合器减少重复，同时学习到了如何使用混合器让你的css变得更加可维护和语义化。最后，我们学习了与混合器相辅相成的选择器继承。继承允许你声明类之间语义化的关系，通过这些关系可以保持你的css的整洁和可维护性。