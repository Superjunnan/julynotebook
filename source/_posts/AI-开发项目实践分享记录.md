title: AI 开发项目实践分享学习
author: 楠木
tags: []
categories: []
date: 2026-02-27 16:14:00
---

# 背景
去年的年度报告项目因多方原因使用了AI进行项目的 coding 开发，但发起和负责此项目的产品已经离职，因此本次的项目分享由参与此项目的正式员工负责。虽然项目的主要思路和开发并非其主导，但作为开发的分享视角给了我一些启发和借鉴点，因此希望记录当下技术条件下使用 AI协同进行项目开发的一些流程方法，以及我个人的经验和总结。

# 主要流程介绍
本次的分享更多是围绕实践操作的细节，因此主要记录开发实施过程的流程准备，但由于分享者提供的项目过于简单，主要是流程上对自己有一些帮助，所以主要记录流程相关的内容。
## 一、模型 & 工具选型
claude：美国anthropic公司推出大模型，可以胜任复杂项目的代码开发和任务分析执行，但token 较贵并且会员没办法白嫖，因此暂时未大规模使用过；（配套工具：claude code）
ChatGPT：openai的模型，使用GPT5.3基本可以和 claude 保持差不多的编程和任务处理水平，因为我自己有付费账号可以免费使用，对比下来更适合实现功能能力，因此选择了此方案；（配套工具：vscode + codex插件）
gemini：前端代码品味较好，但使用下来前后端代码一起写时，交付质量不如GPT，翻译平台选择使用其生成&修改前端页面代码；（配套工具：antigravcy）
kimi2.5、minimax 2.5：暂时都没有使用过，但均可以接入 claude code or vscode 唤起IDE使用；

## 二、开发准备
### 1、系统提示词
#### 什么是系统提示词？
为了规范大模型的行为要求准则，我们通常需要在提示词内设定规范，为了不要每次对话都手动输入这类提示词，因而引入了“系统提示词“，每次的对话请求都会默认将这部分的内容作为提示词的一部分传输给服务器作为上下文交互。因为不同的项目对于模型开发的限定会不一样，因此也会有支持全局（即整个工具维度，不限项目）or 支持制定项目范围的系统提示词。
#### 如何配置系统提示词？
以下是从知乎上找到的各类工具/平台的系统提示词。
![alt text](image.png)

在这个背景下，openai 和 google 联手统一了一个简单的开放标准：AGENTS.md (claude code 似乎不支持)
这个文档也很简单，就是一个 markdown 的文件，openai 提供的官方示例：
````
```
# Sample AGENTS.md file

## Dev environment tips
        - Use `pnpm dlx turbo run where <project_name>` to jump to a package instead of scanning with `ls`.
        - Run `pnpm install --filter <project_name>` to add the package to your workspace so Vite, ESLint, and TypeScript can see it.
        - Use `pnpm create vite@latest <project_name> -- --template react-ts` to spin up a new React + Vite package with TypeScript checks ready.
        - Check the name field inside each package's package.json to confirm the right name—skip the top-level one.

        ## Testing instructions
        - Find the CI plan in the .github/workflows folder.
        - Run `pnpm turbo run test --filter <project_name>` to run every check defined for that package.
        - From the package root you can just call `pnpm test`. The commit should pass all tests before you merge.
        - To focus on one step, add the Vitest pattern: `pnpm vitest run -t "<test name>"`.
        - Fix any test or type errors until the whole suite is green.
        - After moving files or changing imports, run `pnpm lint --filter <project_name>` to be sure ESLint and TypeScript rules still pass.
        - Add or update tests for the code you change, even if nobody asked.

        ## PR instructions
        - Title format: [<project_name>] <Title>
        - Always run `pnpm lint` and `pnpm test` before committing.
```
````

（若要全局生效，放置在 codex等工具根目录下，若要项目内生效，则需要放置在项目根目录下）
目前我搜集到网站上分享的提示词：（未实际在项目中使用过； 为了提升效率，我个人觉得系统提示词应该遵循简洁明了的原则，约定一些原则性的要求即可）
codex：https://linux.do/t/topic/1275669
gemini：https://linux.do/t/topic/1255677

###### 2、Skill & MCP）
1）什么是SKill
当我们在进行不同项目&功能的具体开发时，可能很多抽象出来的特定流程、方法论，其实是可以抽象出来的，例如我们可能会对一个项目有“需求洞察-需求整理-功能设计-系统架构设计-技术选型-代码开发-功能测试-安全性检测“这样的流程设定，这类可以被复用且具有特定业务特定场景知识的内容便被整理成了大模型的技能包SKILL.md（因为 skill 的用途还是很广泛的，因此后续会专门开一个文档来说明skill的原理和构造）。

对比MCP：经常会看到MCP这个名词，MCP解决的是大模型外部数据源获取的问题，就是一系列设定好的输入输出（接口）规则，大模型可以通过约定的规范提供MCP需要的输入信息，并获得对应的数据返回以用于流程的推进和决策

2）关于SKill 的安装 & 调用
目前我了解到的 skill的安装方式有3 种（其实就一种，让大模型帮安装）：
1、针对 skill plugin（技能包）：可以根据 github 上提供的安装方式，让大模型阅读后安装；
2、针对单个 skill：可以手动下载单个 skill 文件放到根目录的 skills 文件夹下；
3、使用skill installer 命令（/唤出），直接告诉大模型安装即可；

调用 skill 的方式：
1、自然语言：用自然语言和大模型对话，每次对话请求工具（vscode、claude code 等）都会将所有的 skill 说明作为上下文进行交互，大模型会根据对话要求分析后判断是否有匹配场景的 skill 可以使用，如果大模型计划调用 skill 功能，则其会在返回时询问是否要调用对应 skill。
2、手动调用：使用/来调用工具，可以唤起列表，选择后即可调用对应 skill，高亮展示的 skill 点击后还可以阅读其内容（vscode 是支持的）
![alt text](image-1.png)

3）优秀的SKill 推荐
小红书上搜了一些工具，并非全部都使用过，有空的时候会尝试仅作为记录：
新手建议：官方常用Skills
- docx - Word文档处理（创建、编辑、追踪修改）
- pdf - PDF提取（文本、表格、元数据、合并）
- pptx - PPT生成与调整
- xlsx - Excel操作（公式、图表、数据转换）
- web-artifacts-builder - 构建复杂的Web组件

开发者：
obra/superpowers 让大模型按规范流程写代码。Coding Agent Skills 最佳实践之一。
OthmanAdi/planning-with-files：号称Manus开源平替，Agent 界的“Notion”。通过建立 task_plan.md，让AI干活前先写计划，干完了打个钩 。不管任务多复杂，AI 都能通过读写本地文件来“回忆”，逻辑永远在线。适合场景： 那些需要跑几个小时、甚至几天的超复杂自动化任务。
Agent-Skills-for-Context-Engineering：专治 AI “间歇性失忆”和“胡言乱语”。教你怎么做 Context 压缩、解决 token 大杀器。

###### 3、需求准备
1、需求分析
2、需求规划
3、需求拆解

#### 三、项目开发 & 调试 & 部署
项目开发：
1）本地运行
2）github 托管

项目调试：

项目部署（github 静态页面）



####


#vibe coding


其他课题：skill 的使用方式 （秋芝等等）