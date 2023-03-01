/**
 * Generated by "@vuepress/internal-site-data"
 */
export const siteData = {
  "title": "前端知识汇总",
  "description": "Just playing around",
  "base": "./",
  "headTags": [],
  "pages": [
    {
      "title": "Home",
      "frontmatter": {
        "home": true,
        "heroImage": "/img/header-logo.png",
        "heroText": "Hero 标题",
        "tagline": "Hero 副标题",
        "actionText": "快速上手 →",
        "actionLink": "/zh/guide/",
        "features": [
          {
            "title": "简洁至上",
            "details": "以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。"
          },
          {
            "title": "Vue驱动",
            "details": "享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。"
          },
          {
            "title": "高性能",
            "details": "VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。"
          }
        ],
        "footer": "MIT Licensed | Copyright © 2018-present Evan You"
      },
      "regularPath": "/",
      "relativePath": "README.md",
      "key": "v-10bfe02b",
      "path": "/"
    },
    {
      "title": "four",
      "frontmatter": {},
      "regularPath": "/bar/four.html",
      "relativePath": "bar/four.md",
      "key": "v-5dedc36b",
      "path": "/bar/four.html"
    },
    {
      "title": "bar",
      "frontmatter": {
        "title": "bar"
      },
      "regularPath": "/bar/",
      "relativePath": "bar/index.md",
      "key": "v-7375187c",
      "path": "/bar/"
    },
    {
      "title": "three",
      "frontmatter": {},
      "regularPath": "/bar/three.html",
      "relativePath": "bar/three.md",
      "key": "v-27b77d43",
      "path": "/bar/three.html"
    },
    {
      "title": "one",
      "frontmatter": {
        "title": "one"
      },
      "regularPath": "/foo/one.html",
      "relativePath": "foo/one.md",
      "key": "v-79ed91ba",
      "path": "/foo/one.html"
    },
    {
      "frontmatter": {},
      "regularPath": "/foo/two.html",
      "relativePath": "foo/two.md",
      "key": "v-68a1aa3a",
      "path": "/foo/two.html"
    }
  ],
  "themeConfig": {
    "logo": "/img/header-logo.png",
    "search": false,
    "searchMaxSuggestions": 10,
    "nav": [
      {
        "text": "主页",
        "link": "/"
      },
      {
        "text": "foo",
        "items": [
          {
            "text": "one",
            "link": "/foo/one/"
          },
          {
            "text": "two",
            "link": "/foo/two/"
          }
        ]
      },
      {
        "text": "bar",
        "link": "/bar/"
      }
    ],
    "sidebar": {
      "/bar/": [
        "",
        "three",
        "four"
      ],
      "/": [
        ""
      ]
    }
  }
}