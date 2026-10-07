# 博罗站接入 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有车站商业空间展示平台中加入可独立浏览的博罗站，并把用户提供的规划图、车站封面和 1F03 实景照片接入现有交互流程。

**Architecture:** 用 `StationDataset` 将每座车站的基础信息、楼层、铺位、封面和汇总统计封装在一起。`App` 只保存当前车站 ID 与当前铺位，所有页面均从当前数据集取值，避免再出现写死的吴川站内容。

**Tech Stack:** React 19、TypeScript 5.9、Vite 6、Lucide React、CSS

**Spec:** `docs/superpowers/specs/2026-10-07-boluo-station-design.md`

## Global Constraints

- 保留吴川站全部现有数据、图片和交互。
- 博罗站封面必须使用用户最后提供的车站正立面图片。
- 博罗站 `1F03` 必须绑定保嘉利便利店门头与室内照片。
- 博罗站总览统计为 140㎡、234KW；铺位电量合计为 210KW，额外 24KW 来自按摩椅和自动售货机。
- 所有素材 URL 必须兼容 Vite 的 `/station/` 基础路径。
- 本轮不执行 `git push`；项目当前无 Git 元数据，因此不生成提交记录。

---

### Task 1: 建立多车站数据模型并导入素材

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data/mockData.ts`
- Create: `public/assets/boluo/boluo-station.png`
- Create: `public/assets/boluo/boluo-floor-plan.jpg`
- Create: `public/assets/boluo/1f03-storefront.jpg`
- Create: `public/assets/boluo/1f03-interior.jpg`

**Interfaces:**
- Produces: `StationDataset`，包含 `station`、`floor`、`shops`、`heroImage`、`totalArea`、`totalPower` 和可选 `supportingFacilities`。
- Produces: `stationDatasets: StationDataset[]` 与 `stationDatasetById(id: string): StationDataset`。

- [x] **Step 1: 复制并核对四个博罗站素材**

将用户提供的原图按上述文件名复制到 `public/assets/boluo/`，不重新压缩。用图片尺寸检查确认规划图为 9600×4152、封面为 1154×550、两张店铺图为 4032×3024。

- [x] **Step 2: 添加 `StationDataset` 类型**

```ts
export type StationDataset = {
  station: Station
  floor: Floor
  shops: Shop[]
  heroImage: string
  totalArea: number
  totalPower: number
  supportingFacilities?: string
}
```

- [x] **Step 3: 把吴川站改为数据集并新增博罗站**

博罗站使用 `boluo-station`、`boluo-1f` 和全局唯一铺位 ID。铺位字段严格录入为 `1F01 / 轻餐饮 / 60㎡ / 150KW`、`1F02 / 零售 / 40㎡ / 30KW`、`1F03 / 零售 / 40㎡ / 30KW`。`1F03` 的 `cover` 与 `interior` 媒体 URL 指向博罗站素材。

- [x] **Step 4: 校验数据与生产构建**

运行 `npm run build`。预期 TypeScript 编译与 Vite 构建均成功，并在 `dist/assets/boluo/` 中出现四个素材。

### Task 2: 接通车站选择与页面数据流

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/AppShell.tsx`
- Modify: `src/components/StationOverview.tsx`

**Interfaces:**
- Consumes: `stationDatasets` 与 `StationDataset`。
- Produces: `StationOverview({ datasets, onOpenStation })`，其中 `onOpenStation(stationId: string)` 打开指定车站。
- Produces: `AppShell` 的 `stationCount` 属性，用于展示 `02 / 02`。

- [x] **Step 1: 将 `App` 状态改为当前车站 ID**

初始化为吴川站。`openStation(id)` 查找数据集、把当前铺位重置为该站首个铺位并进入地图；从地图返回总览不丢失数据；退出登录保留现有行为。

- [x] **Step 2: 让总览渲染两座车站**

把单例 `station-feature` 提取为组件内部的重复条目。每项展示自己的封面、城市、说明、楼层、铺位数、总面积和总电量，按钮调用 `onOpenStation(dataset.station.id)`。

- [x] **Step 3: 更新顶部网络数量**

总览顶部显示 `02 / 02`，数字来自 `stationCount`，不写死。

- [x] **Step 4: 构建检查**

运行 `npm run build`。预期不存在旧单例导入或 TypeScript 属性错误。

### Task 3: 动态地图、统计口径和店铺详情

**Files:**
- Modify: `src/components/MapViewer.tsx`
- Modify: `src/components/StationMap.tsx`
- Modify: `src/components/ShopInfoDrawer.tsx`
- Modify: `src/components/ShopDetail.tsx`

**Interfaces:**
- Consumes: 当前 `station`、`floor`、`shops`、`totalArea`、`totalPower` 与 `supportingFacilities`。
- Produces: 地图与详情中不含任何写死的吴川站来源文案。

- [x] **Step 1: 动态化地图替代文本和来源**

`MapViewer` 的图片替代文本使用 `floor.name`。地图右侧底部和信息抽屉底部均使用 `station.code` 与 `floor.floorNumber`。

- [x] **Step 2: 使用数据集汇总统计**

`StationMap` 的面积和电量使用 `totalArea` 与 `totalPower`，使博罗站显示 140㎡ 和 234KW。存在 `supportingFacilities` 时在统计区附近显示“按摩椅 2 处、自动售货机 4 台，配套电量 24KW”。

- [x] **Step 3: 核对 1F03 媒体展示**

门头照片作为详情主图，媒体区同时显示门头与室内照片；`1F01`、`1F02` 继续显示待补充状态。

- [x] **Step 4: 构建检查**

运行 `npm run build`。预期所有动态属性类型正确，构建成功。

### Task 4: 布局适配与浏览器验收

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: 多个 `.station-feature` 条目和可选 `.side-panel__facilities`。
- Produces: 桌面和移动端可扫描、无重叠的车站总览与地图信息。

- [x] **Step 1: 添加多车站间距和配套说明样式**

新增 `.station-list`、`.station-list .station-feature + .station-feature` 与 `.side-panel__facilities`。保持现有白红主题，不引入新的主色。

- [x] **Step 2: 完成移动端总览适配**

在 760px 断点下允许应用宽度收缩，顶部栏与总览标题换行，车站数据区使用两列或单列，文字和按钮不得溢出。

- [x] **Step 3: 运行最终构建**

运行 `npm run build`。预期退出码为 0。

- [x] **Step 4: 浏览器检查桌面流程**

在 1440×900 视口依次检查登录、两站总览、博罗站地图、三个热区、1F03 抽屉和详情照片，再返回吴川站检查原功能。

- [ ] **Step 5: 浏览器检查移动流程**

在 390×844 视口检查登录和总览无横向溢出、图片比例正确、两座车站按钮可点击。地图允许在有限宽度内使用现有缩放和平移功能，不出现控件遮挡。

- [x] **Step 6: 检查生产资源路径**

启动 `npm run preview -- --host 127.0.0.1`，从 `/station/` 打开页面；确认博罗站封面、规划图和两张实景图片请求成功。
