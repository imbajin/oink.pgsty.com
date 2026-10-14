---
title: Expo 布局契约
linkTitle: Expo
description: 页面资源相册、三种图片布局、原尺寸查看、原生外壳集成与静态输出契约。
weight: 45
icon: fa-solid fa-images
contract_status: v1.3.0
---

> [!NOTE] OINK 1.3.0 本地标签
> Expo 已包含在本地 v1.3.0 标签中。公开模块发布与部署另行验收。

## 内容与导航 {#content-and-navigation}

`type: expo` 选择图片相册布局。在相册章节设置 `cascade: {type: expo}`。
每个叶子页面包只需要 `index.md` 和 `images/` 目录，不要求每张图各有一个 Markdown
或 YAML 文件。章节列出下级相册。导航复用普通外壳树，包括嵌套章节、移动抽屉、外观控件
和当前语言。Expo 默认使用全宽且没有目录，页面显式设置的 `page_width` 仍然有效。
已有 `gallery` 围栏继续作为正文组件。

```yaml
title: Field notes
type: expo
expo:
  images: images/*
  mode: wall
  size: 240
resources:
  - src: images/fern.jpg
    title: Fern
    params:
      id: fern
      alt: A fern frond seen from above
      caption: A study of branching forms.
      byline: Example author
      weight: 10
      original: originals/fern.jpg
```

`expo` 覆盖 `params.ui.expo` 映射。省略的字段采用解析器默认值：资源通配式 `images/*`、
模式 `wall`、目标尺寸 `240` CSS 像素。模式可选 `wall`、`cards`、`seamless`，尺寸为
160 至 360 的整数。无效输入产生警告并回退；将警告视为失败的发布检查会拒绝它。

`expo/items.html` 为全部输出统一选择图片与元数据，使用 Hugo 原生资源元数据及共享
媒体结果契约。非图片资源被排除。可选 `original` 必须指向页面包中的图片，不在构建时
抓取远程图片。GIF 原图保持动态。可处理的本地静态图片大于 960 像素时生成受限尺寸
WebP 预览；GIF 提供用于减少动态效果和暂停的静态预览。原图保持完整。

图片按数字 `params.weight` 排序，同权重沿用资源集合的名称顺序，省略权重时为零。
标题回退到文件名，替代文字回退到标题，简介和署名使用纯文本。可选 ID 使用 ASCII
字母、数字、下划线或连字符，生成 `img-<id>` 锚点；未提供时使用稳定的文件名哈希，
重命名文件会改变哈希。无效或重复 ID 产生警告。大型收藏由作者分册，当前没有自动资源分页。

## 布局与控件 {#layout-and-controls}

展墙使用六像素间距的等高拼贴；无缝采用相同几何计算但间距为零；卡片使用瀑布流并显示
说明。极端宽高比使用受限且完整容纳的预览，原图不裁切、不修改。布局和图片大小控件
使用图标、本地化名称与提示，以及可见键盘焦点。工具栏依次为有共同背景的三格单选组、
播放／暂停按钮和常驻横向滑杆；滑杆两端用小图与大图图标表示尺寸，全部控件垂直居中。
没有 GIF 的相册保留禁用的播放按钮，使操作条位置稳定。外观设置归属共享导航，
相册主体不显示外观控件与页面操作菜单。无 JavaScript 时图片链接和说明保留可读。

当滚动条占用布局宽度时，Expo 为文档保留稳定的滚动条空间。相册高度接近一屏时
必须收敛到稳定布局，不能反复重排；打开或关闭查看器也不能改变底层图片网格的可用宽度。

读者选择的布局和尺寸在同一站点来源下跨相册、刷新保存，并与外观预设相互独立。
`td-expo-mode` 和 `td-expo-size` 只接受合法值；有效的读者选择优先于作者默认值，
存储无效或不可用时安全回退，不影响相册浏览。

GIF 在懒加载图片网格和查看器中默认播放，暂停／播放图标可控制动态效果。
`prefers-reduced-motion: reduce` 默认展示静态预览，读者仍可主动播放。
Paper、Slate、Ink、Terminal 及明暗模式使用现有外壳颜色、排版和圆角变量，
不新增 Expo 专属外观或第三方灯箱依赖。

## 查看器行为 {#viewer-behavior}

相册图片在原生模态对话框中打开。默认缩放为
`min(1, viewportWidth/imageWidth, viewportHeight/imageHeight)`：小图保持 100%，
大图缩小到适屏。放大至适屏使用
`min(viewportWidth/imageWidth, viewportHeight/imageHeight)`：可以放大小图，
始终取更受约束的一边，宽和高都不超出可用区域。原尺寸／适屏与放大至适屏均不出现
图片区域滚动条；只有手动缩放超出区域时才允许滚动。查看器打开时禁止底层页面滚动。
加减按钮按 1.25 倍
调整缩放，恢复按钮回到初始适屏状态；百分比将原图像素按 CSS 像素计算。
缩放保留当前观看中心，切换图片则恢复初始尺寸。

查看器提供原图和相册稳定位置的图标链接。定位操作关闭查看器，滚动到图片并将焦点
返回触发链接。上一张／下一张限制在当前相册内。Escape 关闭并返回焦点；不需要横向
滚动时左右方向键翻图，横向放大后保留原生方向键滚动。放大图片后按住鼠标左键拖动，
图片随指针移动，并在图片边界停止；触摸保留原生滚动。松开、取消拖动、切换图片、
重置或窗口失焦都会结束拖动。

快捷键只在查看器内部生效，不接管文字输入、输入法组合或 Ctrl／Command／Alt 组合键。
按钮提示显示对应快捷键。

| 按键 | 操作 |
| --- | --- |
| W / A / S / D | 图片向上／左／下／右移动，每次 80 CSS 像素 |
| Q / H、E / L | 上一张、下一张；到达边界时保持当前视图 |
| J / −、K / + | 按 1.25 倍缩小、放大 |
| R / 0 | 恢复原尺寸适屏并居中 |
| F | 按受限边放大至可用显示区域并居中 |
| Escape | 关闭并返回焦点 |

平移仅沿超出显示区域的方向生效。重置和翻页清除之前的位移。F 与放大至适屏图标
执行相同操作，不改变浏览器的全屏状态。原生对话框负责约束焦点。

查看器注册到 `OinkSurfaceCoordinator`：打开时关闭其他浮层，`closeOthers()` 或
`closeAll()` 也能关闭查看器。移交到新界面后，焦点保持在新界面中。

Expo 序列和缩放脚本只在有图片的 HTML 相册加载。正文 Image Zoom 保持原有单图
行为，不会再次包裹 Expo 图片链接。无 JS 或不支持对话框的浏览器正常打开原图链接。

## 其他输出 {#other-outputs}

Print 纵向展开静态预览、标题、简介、署名及原图链接，不加载 Expo 脚本。
Markdown 与 LLMSFULL 从相同资源解析器生成图片链接及元数据，LLMS 沿用现有索引列出
相册页面，RSS 使用静态图片说明。普通 HTML 打印时展开相册并隐藏控件。
内容翻译仍由作者负责，图标名称已纳入全部 32 个界面语言目录。

## 验收与发布边界 {#acceptance-and-release-boundary}

主题的专项检查为 `python3 bin/check-expo.py`；几何计算由
`node --test tests/js/expo-geometry.test.js` 验证；schema 投影使用
`python3 bin/generate-config-schema.py --check`。公开示例位于 [Expo](/expo/)，具有
中英文页面。浏览器及可访问性测试位于文档站的 `tests/browser/expo.spec.mjs`。
`expo-stability.spec.mjs` 另外启用占宽度的滚动条，不依赖宿主的滚动条偏好，
在视口高度临界点采样连续帧。安装对应 Playwright 浏览器后，可运行
`npm run test:expo:engines` 检查 Chromium、Firefox 和 WebKit；同样使用本地模块替换。
Graph 副本作为额外的大型真实内容实验，不替代集成测试权威。

本地构建与回归结果不代表功能已经发布。后续仍需分别完成版本决定、标签及公开模块
验收、消费站升级和部署。
