# 你必须懂的css样式权重和优先级

**什么是权重**

1.  权重决定了你css规则怎样被浏览器解析直到生效。“css权重关系到你的css规则是怎样显示的”。
2.  当很多的样式被应用到某一个元素上时，权重是一个决定哪种样式生效，或者是优先级的过程。
3.  每个选择器都有自己的权重。你的每条css规则，都包含一个权重级别。 这个级别是由不同的选择器加权计算的，通过权重，不同的样式最终会作用到你的网页中 。
4.  如果两个选择器同时作用到一个元素上，权重高者生效。

**权重记忆口诀**：*从0开始，一个行内样式+1000，一个id选择器+100，一个属性选择器、class或者伪类+10，一个元素选择器，或者伪元素+1，通配符+0。*
>css权重值记忆图
![css权重值记忆图](https://upload-images.jianshu.io/upload_images/2323089-568b555e715eb570.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


接下来增加一下记忆，下面是我瞎写的一个样式，只看选择器那里就可以了，具体样式请忽略，我分别用了id选择器、class选择器和标签选择器各一次。

![image](https://upload-images.jianshu.io/upload_images/2323089-55a6e4fa4fc49349.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**样式重复多写情况**

在css样式表中，同一个CSS样式你写了两次，后面的会覆盖前面的，在开发中基本不会使用。

```
#box {
 background-color: green;
}
/* 这条生效 */
#box {
 background-color: blue;
}
```

**不同的权重，权重值高则生效**

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>权重高的样式生效</title>
		<style>
			/* 权重值：1 */
			div{
				width: 100px;
				height: 100px;
				background-color: red;
			}

			/* 权重值：10 */
			.box2{
				width: 100px;
				height: 100px;
				background-color: yellow;
			}

			/* 权重值：100 */
			#box{
				width: 100px;
				height: 100px;
				background-color: green;
			}
		</style>
	</head>
	<body>
		<div id='box' class='box2'></div>
	</body>
</html>
```
>id的权重高，所以id选择器中的样式生效
![id的权重高，所以id选择器中的样式生效](https://upload-images.jianshu.io/upload_images/2323089-409d7e6513a57bcb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

从上面的例子不难看出，id选择器的权重值高于其它2种选择器的权重值，所以id选择器中的样式生效了。

**!important(提升样式优先级)**

!important的作用是提升样式优先级，如果加了这句的样式的优先级是最高的。不过我这里***建议大家一下，!important最好不要使用。***

```
<style>
	        div{
	        	background: blue !important;
	        }
	        #box{
	            background-color: green;
	        }
</style>
	</head>
	<body>
		<div id="box" style="background-color: red;width: 100px;height: 100px;"></div>
	</body>
```
>!important 优先级是最高的，不建议使用
![!important 优先级是最高的，不建议使用](https://upload-images.jianshu.io/upload_images/2323089-329811ac55a83b94.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**两种样式都使用!important时**

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>当两个样式都使用!important时</title>
		<style>
			.box{
				width: 100px;
				height: 100px;
				background-color: red !important;
			}

			div{
				width: 100px;
				height: 100px;
				background-color: green !important;
			}
		</style>
	</head>
	<body>
		<!-- 当两个样式都使用!important时，权重值大的优先级更高 -->
		<div class='box'></div>
	</body>
</html>
```
>当两个样式都使用!important时，权重值大的优先级更高
![当两个样式都使用!important时，权重值大的优先级更高](https://upload-images.jianshu.io/upload_images/2323089-f84eedb8a9558d70.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**!important应用于简写样式**

如果!important被用于一个简写的样式属性，那么这条简写的样式属性所代表的子属性都会被作用上!important。

例如：*background: blue !important;*
>简单写的样式如果使用!important，子属性也会默认加上important
![简单写的样式如果使用!important，子属性也会默认加上important](https://upload-images.jianshu.io/upload_images/2323089-d3e0a576132e3449.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


上述结果可以看出，background的子属性都加上了!important，到这里，我提醒一下开发者们，这种复合性样式不建议大量使用，如果里面的属性大多数是可以用到的，还是可以写复合性样式的。我经常看到一些开发都，给某一元素加上颜色，经常性的写成这样

```
background:red;
```

这个样式从表面来说，和background-color:red;一样可以实现效果。

这时你可以通过浏览器的调试工具来查看它具体的样式：

![goolge下的效果图](https://upload-images.jianshu.io/upload_images/2323089-239dfe111558747e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


使用复合写法的时候，它不光只加载了背景颜色样式，还加载了其它一些样式。可想而知，如果一个项目的前台全部都采用复合写法的方式，第设置一个background样式时background相关的样式都会被加载进去，这样性能一定非常差，这也是一种不合理的设计方 案，而单例写法却看不到这种情况。

**行内、内联和外联样式优先级**

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>css优先级</title>
		<link rel='stylesheet' href='css/styles.css'>
		<style>
	        div{
	        	background-color: blue;
	        }
	        #box{
	            background-color: green;
	        }
		</style>
	</head>
	<body>
		<!-- 行内样式生效 -->
		<div id="box" style="background-color: red;width: 100px;height: 100px;"></div>
	</body>
</html>
```

![效果图](https://upload-images.jianshu.io/upload_images/2323089-8ff7c9dbc9ba27d0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


根据权重值来计算，行内样式的权重值最大，所以行内样式生效了。

**内联和外联样式优先级**

这里我曾经一直以为内联样式的优先级一定大于外联样式的，直到最近的几天我才发现我一直都学错了，所以这里也是给大家提个醒，希望自己也牢记这个教训。

```
/* styles.css */
#box{
	background-color: yellow;
}
#div{
	width: 500px;
	height: 500px;
	background-color: pink;
}
```

* * *

1.外联样式写前面，内联样式写后面

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>内联和外联样式的优先级问题</title>
		<link rel='stylesheet' href='css/styles.css'>
		<style>
			#div{
				width: 200px;
				height: 200px;
				background-color: yellow;
			}
		</style>
	</head>
	<body>
		<!-- 内联样式生效 -->
		<div id='div'></div>
	</body>
</html>
```
>内联样式生效
![内联样式生效](https://upload-images.jianshu.io/upload_images/2323089-6c1cd52f8e861a79.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2.内联样式写前面，外联样式写后面

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>内联和外联样式的优先级问题</title>
		<style>
			#div{
				width: 200px;
				height: 200px;
				background-color: yellow;
			}
		</style>
		<link rel='stylesheet' href='css/styles.css'>
	</head>
	<body>
		<!-- 内联样式生效 -->
		<div id='div'></div>
	</body>
</html>
```
>外联样式生效
![外联样式生效](https://upload-images.jianshu.io/upload_images/2323089-26e6b21b395a3d68.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


上面的例子足以说明内联样式的优先级并不一定比外联样式高，因为css样式是单线程，依次从上向下加载的，这也就证明了***内联样式和外联样式的优先级和加载顺序有关***。

总结一下：***!important > 行内样式 > 内联样式 and 外联样式***
>样式优先级
![样式优先级](https://upload-images.jianshu.io/upload_images/2323089-47b91a5ace9a7064.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**样式应用于非目标标签时**

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>样式应用于非目标标签时</title>
		<style>
			div p{color: red};
			#box{color: blue}
		</style>
	</head>
	<body>
		<!-- 选中非目标元素的情况下，离目标越近者优先 -->
		<div id="box">
		  <p>
		    <span>神来之笔</span>
		  </p>
		</div>
	</body>
</html>
```

![效果图](https://upload-images.jianshu.io/upload_images/2323089-5e0625cffeb7f26f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**权重相等的情况下**

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>权重相等的情况下</title>
		<style>
			/* 权重值：201 */
			#box #box2 p{
				width: 200px;
				height: 200px;
				background-color: red;
			}
			/* 权重值：201,离目标最近 */
			#box #box3 p{
				width: 200px;
				height: 200px;
				background-color: yellow;
			}
		</style>
	</head>
	<body>
		<!-- 同等权重下,靠近目标的优先 -->
		<div id="box" class="boxs">
			<div id="box2" class="boxs2">
		    	        <div id="box3" class="boxs3">
		      		        <p></p>
		    	        </div>
		 	</div>
		</div>
	</body>
</html>
```
>同等权重下,靠近目标的优先
![同等权重下,靠近目标的优先](https://upload-images.jianshu.io/upload_images/2323089-176cda82aef63eed.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**总结**

1.  常用选择器权重优先级：***!important > id > class > tag***
2.  !important可以提升样式优先级，但不建议使用。如果!important被用于一个简写的样式属性，那么这条简写的样式属性所代表的子属性都会被应用上!important。 例如：*background: blue !important;*
3.  如果两条样式都使用!important，则权重值高的优先级更高
4.  在css样式表中，同一个CSS样式你写了两次，后面的会覆盖前面的
5.  样式指向同一元素，权重规则生效，权重大的被应用
6.  样式指向同一元素，权重规则生效，权重相同时，就近原则生效，后面定义的被应用
7.  样式不指向同一元素时，权重规则失效，就近原则生效，离目标元素最近的样式被应用
