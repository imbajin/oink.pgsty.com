---
title: Chapter b
weight: 2
outputs: [HTML, PRINT]
---

<a href="#example-syntax-syntax">Own syntax</a>

<a data-test-tab-link="single" title="fake href='#example-syntax-syntax'" href='#example-syntax-syntax'>Single quote</a>

<a data-test-tab-link="bare" title="fake href=#example-syntax-syntax > text" HREF = #example-syntax-syntax>Bare href</a>

<a data-test-tab-link="double" title='fake href="#example-syntax-syntax"' href="#example-syntax-syntax">Double quote</a>

<a data-test-tab-link="entity" title="encoded fragment" href='&#35;example-syntax-syntax'>Entity fragment</a>

<a data-test-tab-link="self" title="same page" href='/tests/print-tabs/b/#example-syntax-syntax'>Same page</a>

[Other chapter syntax](../a/#example-syntax-syntax)

<span id="authored-b"></span>

[Nested heading](#嵌套打印标题)

{{< tabs group="example-syntax" >}}
{{< tab label="Example" value="example" >}}
Chapter b example.
{{< /tab >}}
{{< tab label="Syntax" value="syntax" >}}
Chapter b syntax.

### Chapter b nested heading {#嵌套打印标题}

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

[Encoded heading](#打印片段)

## Chapter b encoded heading {#打印片段}

<span data-test="encoded-heading">Chapter b encoded heading</span>
