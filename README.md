# heatmap-gen-web

**单文件离线热力图**：给定二维矩阵（行 × 列），按数值大小渲染蓝白色阶的颜色深浅，并带图例与悬停数值提示。内置示例数据，双击 `index.html` 即可打开。配套 `test.js` 用 Node 断言校验颜色映射。

## 功能简介

- 数值越大颜色越深（蓝白色阶），自动按矩阵 min/max 归一。
- 顶部一行色阶**图例**。
- 单元格**悬停/点击**显示具体数值。
- 完全离线，无外部依赖。

## 快速开始

```bash
open index.html
node test.js
```

输出形如：

```
PASS: 矩阵为 5x4 规整结构
PASS: 最大值颜色比最小值更深（蓝通道更小）
全部断言通过
```

## 如何替换数据

编辑 `index.html` 里 `<script id="heatmap-data" type="application/json">` 块：

```json
{
  "rows": ["周一", "周二"],
  "cols": ["第1周", "第2周"],
  "matrix": [[3, 8], [1, 5]]
}
```

## 目录说明

```
heatmap-gen-web/
├── index.html   # 单文件热力图
├── test.js      # Node 断言（颜色映射）
├── README.md
├── LICENSE
└── .gitignore
```

## License

MIT License，Copyright (c) 2026 ljiang9。
