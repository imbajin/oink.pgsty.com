---
title: 章节 a
weight: 1
outputs: [HTML, PRINT]
---

<a href="#example-syntax-syntax">本章语法</a>

<a data-test-tab-link="single" title="fake href='#example-syntax-syntax'" href='#example-syntax-syntax'>Single quote</a>

<a data-test-tab-link="bare" title="fake href=#example-syntax-syntax > text" HREF = #example-syntax-syntax>Bare href</a>

<a data-test-tab-link="double" title='fake href="#example-syntax-syntax"' href="#example-syntax-syntax">Double quote</a>

<a data-test-tab-link="entity" title="encoded fragment" href='&#35;example-syntax-syntax'>Entity fragment</a>

<a data-test-tab-link="self" title="same page" href='/zh/tests/print-tabs/a/#example-syntax-syntax'>Same page</a>

[另一章语法](../a/#example-syntax-syntax)

<span id="authored-a"></span>

[嵌套标题](#嵌套打印标题)

{{< tabs group="example-syntax" >}}
{{< tab label="示例" value="example" >}}
章节 a 示例.
{{< /tab >}}
{{< tab label="语法" value="syntax" >}}
章节 a 语法.

### 章节 a 嵌套标题 {#嵌套打印标题}

{{< tabs group="platform" >}}
{{< tab label="Unix" value="unix" >}}
Unix.
{{< /tab >}}
{{< tab label="Windows" value="windows" >}}
Windows.
{{< /tab >}}
{{< /tabs >}}
{{< /tab >}}
{{< /tabs >}}

[编码标题](#打印片段)

## 章节 a 编码标题 {#打印片段}

<span data-test="encoded-heading">章节 a 编码标题</span>
