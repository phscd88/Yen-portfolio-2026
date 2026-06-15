import React, { ChangeEvent, useState, useRef, useEffect, ReactNode } from "react";
// @ts-ignore
import profilePng from "../profile.png";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  MapPin, 
  Calendar,
  Briefcase,
  Copy,
  Check,
  Megaphone,
  Globe,
  TrendingUp,
  Award,
  Sparkles,
  Phone,
  ArrowUpRight,
  Cpu,
  BarChart3,
  Layers,
  CheckCircle2,
  Image,
  CloudUpload,
  Lock,
  X
} from "lucide-react";

// Initial Classic Cases
const MARKETING_CASES = [
  {
    id: "case-1",
    title: "人資系統官網建置與 B2B 線上流量增長案",
    period: "2023 - 2026",
    company: "壹一壹一科技股份有限公司 (人力銀行)",
    tag: "B2B 整合行銷",
    mainMetric: "+40%",
    metricLabel: "首年申請諮詢量年增率",
    secMetric: "95%",
    secMetricLabel: "次年半年達成前一整年總量",
    challenge: "既有系統僅有一頁式網頁，缺乏完整的品牌心智定位與潛在企業用戶（B2B）轉換路徑。",
    strategy: [
      "重新梳理 B2B 產品核心定位，打造高信賴感的垂直產業解決方案官網。",
      "執行精準搜尋意圖關鍵字研究（SEO），規劃高價值內容行銷，獲取自然搜尋流量。",
      "重新配置 Google Ads 與 FB 廣告投放策略，聚焦高效轉換群體，優化單次獲客成本 (CPA)。"
    ],
    tools: ["WordPress", "SEO 規劃", "Search Console", "Google Ads", "GA4", "GTM"]
  },
  {
    id: "case-2",
    title: "包袋電商官網營收爆發與嘖嘖募資案",
    period: "2020 - 2022",
    company: "大有創新有限公司 (包袋電商)",
    tag: "D2C 品牌增長",
    mainMetric: "26倍",
    metricLabel: "月營收成長 (5萬 🚀 130萬)",
    secMetric: "1500%+",
    secMetricLabel: "嘖嘖集資專案單檔達標率",
    challenge: "官網初期流量與信任感不足，月營收卡在 5 萬元瓶頸，急需快速提升曝光與首發買氣。",
    strategy: [
      "操刀群眾集資企劃，包裝具有生活共鳴的品牌故事，單次募資成果爆發突破 1500% 達標率。",
      "洽談關鍵意見消費領袖（KOC）進行精準多波段開箱，引爆社交媒體社群聲量。",
      "整合 Facebook 廣告成效追蹤，利用再行銷（Retargeting）機制穩步拉高官網日常 D2C 月營收至百萬級距。"
    ],
    tools: ["群眾集資", "KOC 行銷", "FB 廣告投放", "成效追蹤", "Photoshop", "嘖嘖平台"]
  },
  {
    id: "case-3",
    title: "高端珠寶品牌節慶檔期實體與線上整合行銷案",
    period: "2018 - 2020",
    company: "龍岩國際有限公司 (珠寶商)",
    tag: "整合行銷與 OMO",
    mainMetric: "3000萬",
    metricLabel: "母親節及週年慶檔期營業額",
    secMetric: "+80%",
    secMetricLabel: "官方網店流量提升幅度",
    challenge: "高單價奢侈品難以完全在線上完成轉換，需要將大流量轉化為線上訂單與線下門市預約。",
    strategy: [
      "設計雙向 OMO 促銷企劃，導入線上領券、實體鑑賞之客戶旅程（User Journey）。",
      "導入會員獎勵推薦機制（MGM），透過 LINE@ 官方帳號進行自動化引流與裂變行銷，增加 1300+ 有效好友。",
      "投放精緻化分眾廣告，鎖定高淨值受眾，搭配節慶氣氛活動，成功引爆關鍵兩大檔期營收績效。"
    ],
    tools: ["活動企劃", "LINE@自動化", "數位廣告投放", "Framer/Figma", "Looker Studio"]
  }
];

// ==========================================
// 💡 作品展示區資料配置 (Portfolio Data Setup)
// ==========================================
const PORTFOLIO_PROJECTS = [
  {
    id: "proj-1",
    title: "品牌形象官網從零到有規劃與 PM 專案管理",
    category: "web_pm",
    categoryLabel: "網頁與PM (Web & PM)",
    description: "全面主導品牌形象官網重整。從痛點分析、介面重劃到功能定義，協同設計、前後端工程師導入流暢的網站架構，成功將原本停滯的舊官網蛻變為高轉換的品牌門面。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=650&q=80", 
    tags: ["#官網PM", "#品牌重整", "#UI_UX", "#資訊架構"],
    metric: "網站從零到有建置完成",
    link: "https://1hr.1111.com.tw/"
  },
  {
    id: "proj-2",
    title: "氣氛編程辦公 APP：優化進銷存與 CRM 系統",
    category: "web_pm",
    categoryLabel: "網頁與PM (Web & PM)",
    description: "利用 AI 工具與 Vibe Coding 敏捷開發辦公軟體，使電商經營能以極低成本導入進銷存與客情管理系統。同時持續延伸開發專案管理與股票技術指標判斷系統，展現強大獨立開發與問題解決能力。",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=650&q=80", 
    tags: ["#氣氛編程", "#Vibe_Coding", "#軟體開發", "#系統架構"],
    metric: "前後端獨立開發完成", 
    link: "https://ai.studio/apps/1b09c819-c855-4edd-bc61-1f643e07932a"
  },
  {
    id: "proj-3",
    title: "AI 多媒體工作流：規模化行銷影片與創意素材生成",
    category: "ai_creative",
    categoryLabel: "AI影音與內容 (AI & Creative)",
    description: "深度整合 AI 影音生成工具，將傳統繁瑣的腳本企劃、分鏡與後製剪輯全面自動化。針對多管道（社群、EDM、銷售頁）快速產出高點擊率的動態視覺素材，極大化內容產出效率。",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=650&q=80", 
    tags: ["#AI影音生成", "#素材優化", "#內容行銷", "#創意發想"],
    metric: "素材點擊率與產能倍增",
    link: "https://drive.google.com/drive/folders/1dortG8ciCSqjESXlcLcAmaebfFfQUMYn?usp=sharing"
  },
  {
    id: "proj-4",
    title: "數位內容增長：高價值部落格文章與銷售頁撰寫",
    category: "ai_creative",
    categoryLabel: "AI影音與內容 (AI & Creative)",
    description: "結合市場消費者洞察，撰寫具備高搜尋意圖（Search Intent）的部落格文章與高說服力的產品銷售頁（Landing Page）。透過直擊痛點的文案與誘餌設計，吸引精準潛在客戶並引導轉換。",
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=650&q=80", 
    tags: ["#文章撰寫", "#銷售頁文案", "#SEO內容", "#內容增長"],
    metric: "長尾流量與轉換率優化",
    link: "https://guide.1111.com.tw/article/workplace-laws"
  },
  {
    id: "proj-5",
    title: "Looker Studio 全通路廣告投放與預算多維度分析看板",
    category: "data_growth",
    categoryLabel: "數據與增長 (Data & Growth)",
    description: "運用 Looker Studio 搭建即時視覺化數據儀表板，打破數據孤島，整合跨平台廣告投放與營運預算數據，提供管理層一目了然的 ROI 調配與營運決策依據。",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=650&q=80", 
    tags: ["#Looker_Studio", "#數據視覺化", "#廣告投放分析", "#預算控制"],
    metric: "數據監控與 ROI 決策優化",
    link: "https://lookerstudio.google.com/reporting/81dd3e76-d68b-4c01-a777-b75da5c24a77"
  },
  {
    id: "proj-6",
    title: "品牌群眾集資專案操作與 KOC 網紅裂變行銷",
    category: "data_growth",
    categoryLabel: "數據與增長 (Data & Growth)",
    description: "完整操作市場群眾集資專案。從前測問卷、熱度堆疊到正式上線，搭配精準的 KOC 網紅開箱體驗與社群裂變機制，在極短時間內成功引爆專案話題，達成超乎預期的集資成效。",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=650&q=80", 
    tags: ["#集資專案操作", "#KOC網紅行銷", "#社群裂變", "#活動規劃"],
    metric: "集資專案高效超標達成",
    link: "https://www.zeczec.com/projects/shuttle-backpack"
  },
  {
    id: "proj-7",
    title: "Python 數據科學应用與自動化工程實務",
    category: "data_growth",
    categoryLabel: "數據與增長 (Data & Growth)",
    description: "具備 Python 程式開發與微開發經驗，涉獵從機器學習模型到基礎影像辨識（Computer Vision）應用。核心強項聚焦於「數據驅動行銷」，能將程式邏輯完美融合行銷數據分析，打造科技賦能的行銷觀點。",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=650&q=80", 
    tags: ["#Python程式", "#機器學習", "#數據科學", "#科技行銷"],
    metric: "科技賦能型行銷人才", 
    link: "https://drive.google.com/drive/folders/1JocDpIHe8bjQzrRs_Y-paZGyN8YUO6oX?usp=drive_link"
  },
  {
    id: "proj-8",
    title: "NASA Space Apps Challenge 全球黑客松挑戰賽",
    category: "web_pm", 
    categoryLabel: "網頁與PM (Web & PM)",
    description: "參與 NASA 全球黑客松競賽，在極短的 48 小時高壓限制內，與不同專業領域的隊友跨界協作。負責產品 PM 與數據技術整合，集思廣益開發創新軟體專案，具備極強的團隊協作、抗壓性與敏捷開發思維。",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=650&q=80", 
    tags: ["#NASA黑客松", "#黑客松專案", "#跨領域協作", "#產品PM"],
    metric: "48HR 跨界極速敏捷開發", 
    link: "https://2022.spaceappschallenge.org/challenges/2022-challenges/through-the-looking-glass/teams/the-space-runner/project"
  }
];

// Elegant Color Palettes & Categories for Skills
const SKILL_CATEGORIES = [
  {
    id: "ads",
    title: "廣告投放 & 預算規劃",
    icon: Megaphone,
    skills: [
      { name: "FB 廣告投放 & 策略調整", level: 95, desc: "精準受眾包設定、相似受眾 (LAL) 擴展與廣告創意測試。" },
      { name: "Google Ads 關鍵字/PMax 廣告", level: 90, desc: "關鍵字競價規劃、多資產投放，以 ACoS 與 ROI 為導向優化。" },
      { name: "行銷成效與預算分配再平衡", level: 92, desc: "根據即時轉換數據與留存率，動態微調多渠道預算，降低單客獲取成本。" }
    ]
  },
  {
    id: "seo",
    title: "網站架設 & 流量增長",
    icon: Globe,
    skills: [
      { name: "WordPress 網站建置與優化", level: 82, desc: "搭建高轉換率的一頁市或品牌官網，提升頁面載入速度與使用者體驗。" },
      { name: "SEO / AIEO / GEO 搜尋與生成引擎優化戰略", level: 88, desc: "規劃長效型關鍵字佈局、技術型 SEO，並融入 AIEO (AI搜尋引擎優化) 與 GEO (生成式引擎優化) 策略以應對新形態搜尋革命。" },
      { name: "Search Console 站務分析", level: 85, desc: "監控檢索異常、點擊趨勢、排除索引錯誤，確保自然搜尋版型最大化。" }
    ]
  },
  {
    id: "data",
    title: "工具追蹤 & 數據量化",
    icon: BarChart3,
    skills: [
      { name: "GA4 行為分析與資料解讀", level: 88, desc: "自訂探查報表、追蹤用戶旅程、分析流失漏斗，將數據轉化為營運洞察。" },
      { name: "GTM 代碼管家事件設定", level: 90, desc: "自訂觸發條件、追蹤滾動深度、點擊與表單遞交，維持乾淨的追蹤像素環境。" },
      { name: "Looker Studio 視覺化儀表板", level: 85, desc: "串接多渠道 API 數據，為團隊或管理階層提供直觀、即時的數據檢視看板。" },
      { name: "Python / SQL / 基礎前端技術", level: 59, desc: "利用 Python 進行資料整理分析，掌握 HTML/CSS 順暢與研發工程師溝通。" }
    ]
  },
  {
    id: "branding",
    title: "社群、視覺與 AI 生產力",
    icon: Sparkles,
    skills: [
      { name: "社群自動化與 LINE@ 經營", level: 80, desc: "利用 Chatbot 設定、LINE@分眾群發及模組化訊息，實現品牌高互動率。" },
      { name: "視覺語境設計 (Ps, Ai, Figma)", level: 66, desc: "產出兼具美感與點擊率的社群廣告素材、產品首發圖及動態橫幅。" },
      { name: "AI 生產力整合 (GPT, Gemini)", level: 85, desc: "深度結合行銷工作流，輔助海量文案發想、社群排程企劃架構。技術賦能提升效率。" }
    ]
  }
];

function SectionTitle({ children, subtitle }: { children: ReactNode, subtitle?: string }) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
        <p className="text-xs uppercase tracking-[0.3em] font-medium text-brand-accent">
          {subtitle}
        </p>
      </div>
      <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-brand-ink">
        {children}
      </h2>
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // State for active category of skills
  const [activeCategory, setActiveCategory] = useState("ads");
  
  // State for Case study slider / selector
  const [selectedCaseId, setSelectedCaseId] = useState("case-1");
  const activeCase = MARKETING_CASES.find(c => c.id === selectedCaseId) || MARKETING_CASES[0];

  // State for filtering portfolio grid
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Password validation state for protected portfolio links
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pendingLink, setPendingLink] = useState("");
  const [pendingProjectTitle, setPendingProjectTitle] = useState("");

  const handleProtectedLinkClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, link: string, title: string) => {
    e.preventDefault();
    // Check if password was already verified in this session
    if (sessionStorage.getItem("portfolio_verified_9527") === "true") {
      window.open(link, "_blank", "noopener,noreferrer");
      return;
    }
    setPendingLink(link);
    setPendingProjectTitle(title);
    setPasswordInputValue("");
    setPasswordError("");
    setPasswordModalOpen(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInputValue.trim() === "9527") {
      sessionStorage.setItem("portfolio_verified_9527", "true");
      setPasswordModalOpen(false);
      window.open(pendingLink, "_blank", "noopener,noreferrer");
    } else {
      setPasswordError("密碼不正確！若您是合作夥伴或雇主，歡迎直接與我聯繫諮詢密碼 🤝");
    }
  };

  // Copy Status UI feedback
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Live avatar selection state for testing/cooperation preview
  const [avatarUrl, setAvatarUrl] = useState<string>(profilePng || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Attempt to load previously saved avatar from localStorage
    const saved = localStorage.getItem("portfolio_user_avatar");
    if (saved) {
      setAvatarUrl(saved);
    } else if (profilePng) {
      setAvatarUrl(profilePng);
    }
  }, []);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatarUrl(reader.result);
          localStorage.setItem("portfolio_user_avatar", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetAvatar = () => {
    localStorage.removeItem("portfolio_user_avatar");
    setAvatarUrl(profilePng || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800");
  };

  const triggerCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-cream text-brand-ink selection:bg-brand-accent selection:text-white pb-12">
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent origin-left z-50"
        style={{ scaleX }}
      />

      {/* Decorative Canvas Backgrounds */}
      <div className="absolute top-0 right-0 w-1/2 h-[100vh] bg-gradient-to-l from-brand-accent/5 to-transparent pointer-events-none -z-10" />

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-40 px-6 py-5 md:px-16 flex justify-between items-center bg-brand-cream/80 backdrop-blur-md border-b border-brand-ink/5">
        <div className="flex items-baseline gap-4">
          <span className="text-xl font-serif font-semibold tracking-wide">
            Yen Chih-Yi 
          </span>
          <span className="text-xs uppercase tracking-widest text-brand-accent font-medium hidden sm:inline border-l border-brand-ink/15 pl-4">
            Senior Marketing Planner
          </span>
        </div>
        
        <div className="flex gap-10 text-xs uppercase tracking-widest font-medium text-brand-ink/80">
          <a href="#about" className="hover:text-brand-accent transition-colors">關於</a>
          <a href="#skills" className="hover:text-brand-accent transition-colors">技能指標</a>
          <a href="#cases" className="hover:text-brand-accent transition-colors">行銷實戰</a>
          <a href="#contact" className="hover:text-brand-accent transition-colors">聯繫</a>
        </div>
      </nav>

      {/* Hero Header Space */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto w-full">
          
          {/* Hero Bio Left */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-medium tracking-wide">
                <Award className="w-3.5 h-3.5" /> 8年+品牌整合與數位行銷實務
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-none text-brand-ink">
                你好，我是 <br />
                <span className="font-medium">Yen Chih-Yi</span>
              </h1>
              <p className="text-2xl font-serif text-brand-accent italic mt-2">
                資深整合行銷企劃 / 數據增長顧問
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-lg text-brand-ink/80 leading-relaxed font-light max-w-xl"
            >
              我深信好的行銷來自對市場脈動與用戶心理的最佳洞察。
              擅長將複雜的產品定位，轉化為帶有感性敘事力量、且經得起數據驗證的商業成長方案。
            </motion.p>

            {/* Micro Stats Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 border-y border-brand-ink/10 py-6 max-w-lg text-left"
            >
              <div>
                <span className="block text-3xl font-serif font-semibold text-brand-accent text-brand-accent">8+ 年</span>
                <span className="text-xs uppercase tracking-wider text-brand-ink/60">電商與品牌實戰</span>
              </div>
              <div>
                <span className="block text-3xl font-serif font-semibold text-brand-accent text-brand-accent">130 萬+</span>
                <span className="text-xs uppercase tracking-wider text-brand-ink/60">小型電商輔導單月營收突破</span>
              </div>
              <div>
                <span className="block text-3xl font-serif font-semibold text-brand-accent text-brand-accent">1500%+</span>
                <span className="text-xs uppercase tracking-wider text-brand-ink/60">群眾募資紀錄</span>
              </div>
            </motion.div>

            {/* Quick Contact & Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a 
                href="#cases" 
                className="group flex items-center gap-2 px-6 py-3.5 bg-brand-ink text-brand-cream rounded-full text-sm font-medium hover:bg-brand-accent hover:shadow-lg transition-all"
              >
                探索行銷案例 
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a 
                href="#contact" 
                className="px-6 py-3.5 border border-brand-ink/20 hover:border-brand-ink rounded-full text-sm font-medium transition-all"
              >
                誠摯合作洽談
              </a>
            </motion.div>
          </div>

          {/* Interactive Profile Photo Right */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-brand-accent/5 group"
            >
              <img 
                src={avatarUrl} 
                alt="Yen Chih-Yi Headshot" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-6 text-center">
                <CloudUpload className="w-8 h-8 mb-2 animate-bounce text-brand-cream" />
                <p className="text-sm font-medium">想要預覽您合適的大頭貼照？</p>
                <p className="text-xs opacity-75 mt-1">點選下方按鈕即可於本站即時換上測試</p>
              </div>
              
              {/* Modern elegant frame indicator */}
              <div className="absolute inset-4 rounded-full border border-white/20 pointer-events-none" />
            </motion.div>

            {/* Client-Side Live Image Changer Widget */}
            <div className="mt-4 flex gap-3 text-xs">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 text-brand-accent hover:text-brand-ink font-medium tracking-wide transition-colors bg-white hover:bg-brand-cream px-3 py-1.5 rounded-full border border-brand-accent/20"
              >
                <Image className="w-3.5 h-3.5" /> 換上您的帥氣大頭貼
              </button>
              {localStorage.getItem("portfolio_user_avatar") && (
                <button 
                  onClick={resetAvatar}
                  className="text-brand-ink/50 hover:text-brand-ink underline"
                >
                  恢復預設
                </button>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleAvatarChange} 
                className="hidden" 
              />
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-30 hidden lg:block">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">往下探索</span>
            <div className="w-px h-8 bg-brand-ink" />
          </motion.div>
        </div>
      </section>

      {/* About Me Details Section */}
      <section id="about" className="py-24 md:py-36 px-6 md:px-16 lg:px-24 bg-white border-y border-brand-ink/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Slogan Sticky Left */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-semibold block">關於我 / Vision</span>
              <blockquote className="text-2xl sm:text-3xl font-serif font-light leading-snug border-l-2 border-brand-accent pl-6 py-2 text-brand-ink">
                「我擅長從內容到策略，讓行銷專案更有故事、更有效果。」
              </blockquote>
              <p className="text-sm font-light text-brand-ink/70 leading-relaxed">
                具備品牌端 8 年整合行銷企劃經驗，熟悉從產品定位、用戶旅程、廣告創意到轉換追蹤的完整流程。
                良好的行銷來自對市場的細密洞察，以結構化、數據化的思維落實每一步轉換可能。
              </p>
            </div>

            {/* Core bullets Details Right */}
            <div className="lg:col-span-7 space-y-8">
              <div className="prose text-brand-ink/80 font-light leading-relaxed space-y-6">
                <p className="text-base">
                  我熱愛數位行銷與品牌策略，日前擔任知名人力銀行行銷企劃與就讀國立大學 EMBA 在職專班，努力不斷拓展商業視野。
                  喜歡在多變的市場與複雜的局勢中，抽絲剝繭拆解問題本質。
                </p>

                {/* Core Strengths Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {[
                    "喜歡拆解問題，找出本質並解決",
                    "擅長跨部門協作，推動複雜專案落地",
                    "從 0 到 1 打造高轉換官網、廣告、集資專案",
                    "對數據分析與新興 AI 行銷應用保持持續學習熱情"
                  ].map((strength, sidx) => (
                    <div key={sidx} className="flex items-start gap-3 bg-brand-cream/30 p-4 rounded-xl border border-brand-ink/5">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-brand-ink">{strength}</span>
                    </div>
                  ))}
                </div>

                {/* Partnership description */}
                <div className="bg-brand-cream/40 p-6 rounded-2xl border border-brand-accent/10 mt-6">
                  <h4 className="font-serif font-semibold text-lg text-brand-accent mb-2">我喜歡與企業陪跑，做最合適的策略</h4>
                  <p className="text-sm text-brand-ink/75 font-light leading-relaxed">
                    讓許多看似「冷門的產業」也能重新被市場看見。整合網站優化、內容策略、SEO、廣告投放到各類型活動企劃。
                    將品牌遠程目標，化為精準可衡量的行銷行動，並透過持續小步快跑、優化迭代，讓每一分行銷預算都能帶來極佳的效益。
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Value Pillars Section - 我能做到什麼？ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Core Pillars">我能為您的產品做到什麼？</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Card 1: SEO */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-brand-ink/5 shadow-sm transition-all relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-brand-ink mb-4">搜尋與生成優化 / SEO & GEO/AIEO</h3>
              <p className="text-sm text-brand-ink/70 leading-relaxed font-light mb-4">
                我擅長透過細緻的關鍵字意圖研究與內容分眾策略，並超前佈局 AIEO 與 GEO（生成式引擎優化）系統，確保品牌在大語言模型搜尋時代仍優先被檢索。
              </p>
              <ul className="text-xs text-brand-ink/60 space-y-2 mt-4 pt-4 border-t border-brand-ink/10">
                <li className="flex items-center gap-2">✓ 定期優化網站結構與內外部連結權重</li>
                <li className="flex items-center gap-2">✓ AIEO (AI搜尋引擎) & GEO 分析佈局</li>
                <li className="flex items-center gap-2">✓ 長期累積免費自然搜尋高價值流量</li>
              </ul>
            </motion.div>

            {/* Card 2: Advertising */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-brand-ink/5 shadow-sm transition-all relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-brand-ink mb-4">廣告精準投放</h3>
              <p className="text-sm text-brand-ink/70 leading-relaxed font-light mb-4">
                我以核心數據為依歸動態調整投放策略，摒棄無謂的預算虛擲，確保每一分精準點擊發揮最大效益。
              </p>
              <ul className="text-xs text-brand-ink/60 space-y-2 mt-4 pt-4 border-t border-brand-ink/10">
                <li className="flex items-center gap-2">✓ 受眾建模 (Custom Audience) 精準分析</li>
                <li className="flex items-center gap-2">✓ 從點擊、轉發到最終成交漏斗完整追蹤</li>
                <li className="flex items-center gap-2">✓ A/B 廣告創意測試與預算動態分配</li>
              </ul>
            </motion.div>

            {/* Card 3: Product Strategy */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-brand-ink/5 shadow-sm transition-all relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-brand-ink mb-4">產品策略與數據分析</h3>
              <p className="text-sm text-brand-ink/70 leading-relaxed font-light mb-4">
                透過 GA4 與 GTM 細部的用戶行爲記錄，找出產品在市場定位的落差、優化購買轉換點。
              </p>
              <ul className="text-xs text-brand-ink/60 space-y-2 mt-4 pt-4 border-t border-brand-ink/10">
                <li className="flex items-center gap-2">✓ 用戶行為漏斗量化分析支援決策</li>
                <li className="flex items-center gap-2">✓ 客戶購買路徑 (User Journey) 熱點分析</li>
                <li className="flex items-center gap-2">✓ 定制可執行的行銷反饋與優化提案</li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Interactive Skills Matrix Section */}
      <section id="skills" className="py-24 md:py-36 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Capabilities">全方位行銷技能指標</SectionTitle>

          <p className="text-brand-ink/70 font-light max-w-xl mb-12">
            行銷不只是創意，更是一門結合數據統計與技術邏輯的工程學。以下為我的核心能力架構，提供您專業與成效的雙重保障：
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Skill categories tabs - Left */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {SKILL_CATEGORIES.map((cat) => {
                const CatIcon = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-4 text-left p-5 rounded-2xl border transition-all ${
                      isSelected 
                        ? "bg-brand-ink text-white border-brand-ink shadow-md" 
                        : "bg-brand-cream/25 text-brand-ink/80 border-brand-ink/5 hover:bg-brand-cream/60"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${isSelected ? "bg-brand-accent text-white" : "bg-brand-ink/5 text-brand-accent"}`}>
                      <CatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-wider font-semibold">{cat.title}</h4>
                      <p className="text-xs opacity-60 mt-0.5">{cat.skills.length} 項核心指標項目</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Gauge indicators list - Right */}
            <div className="lg:col-span-7 bg-brand-cream/20 border border-brand-ink/5 rounded-3xl p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <h3 className="text-xl font-serif font-medium text-brand-accent pb-4 border-b border-brand-ink/10 flex items-center justify-between">
                    <span>{SKILL_CATEGORIES.find(c => c.id === activeCategory)?.title} 項目清單</span>
                    <span className="text-[10px] uppercase font-sans tracking-widest text-brand-ink/50">精準量化</span>
                  </h3>

                  <div className="space-y-6">
                    {SKILL_CATEGORIES.find(c => c.id === activeCategory)?.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-2 group">
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-semibold tracking-wide text-brand-ink text-base group-hover:text-brand-accent transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-sm font-serif font-bold text-brand-accent">
                            {skill.level}%
                          </span>
                        </div>
                        
                        {/* Elegant Progress bar bar */}
                        <div className="w-full h-2.5 bg-brand-ink/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-brand-accent rounded-full"
                          />
                        </div>
                        
                        <p className="text-xs text-brand-ink/65 leading-relaxed pt-1">
                          {skill.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Work Experiences Section */}
      <section className="py-24 md:py-36 px-6 md:px-16 lg:px-24 bg-brand-ink text-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Header left */}
          <div className="lg:w-1/3 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
              <p className="text-xs uppercase tracking-[0.3em] font-medium text-brand-accent">
                Journey / Experience
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
              淬煉多段 <br />
              行銷實戰經歷
            </h2>
            <p className="text-base font-light opacity-60 leading-relaxed">
              每一段經歷，都是一個品牌從未知走向卓越、產品從冷門邁向熱銷的真實見證。我樂於用數位策略重啟增長。
            </p>

            <div className="pt-6 border-t border-brand-cream/10 space-y-4">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-brand-accent" />
                <span className="text-sm opacity-80">人力銀行 / 電商 D2C / 高端珠寶實體 OMO</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-accent" />
                <span className="text-sm opacity-80">台北, 台灣 | 可接受混合辦公或遠端顧問模式</span>
              </div>
            </div>
          </div>

          {/* Timeline details right */}
          <div className="lg:w-2/3 space-y-16 relative">
            {/* Custom Vertical Timelime Line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-brand-cream/10 hidden md:block" />

            {/* Experience Card 1 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-0 md:pl-10 space-y-3 group"
            >
              <div className="hidden md:block absolute left-[-4.5px] top-2.5 w-2.5 h-2.5 rounded-full bg-brand-cream group-hover:bg-brand-accent transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                <h3 className="text-2xl font-serif text-white group-hover:text-brand-accent transition-colors">產品行銷企劃</h3>
                <span className="text-xs uppercase tracking-widest opacity-40 md:ml-auto flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> 2023 - 2026
                </span>
              </div>
              <p className="text-brand-accent font-medium uppercase tracking-widest text-xs">
                日前擔任知名人力銀行行銷企劃
              </p>
              
              <div className="text-sm opacity-70 leading-relaxed font-light space-y-2">
                <p>負責人資系統的 B2B 行銷推廣：</p>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mt-2 space-y-1.5 font-normal">
                  <div className="text-xs text-brand-accent tracking-widest font-semibold">🏆 行銷戰果亮點</div>
                  <p className="text-emerald-400 font-medium font-serif">🎯 首年創下申請諮詢數年成長 40% 的歷史紀錄</p>
                  <p className="text-emerald-400 font-medium">🎯 第二年上半年，僅用六個月時間即達成前一整年 95% 的申請量</p>
                  <p className="text-white/80 font-light text-xs pt-1">
                    主導官方網站建置專案，帶領跨團隊成員持續優化官網 UI 及 SEO / AIEO / GEO 架構，穩健拓展潛在企業客戶名單。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Experience Card 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-0 md:pl-10 space-y-3 group"
            >
              <div className="hidden md:block absolute left-[-4.5px] top-2.5 w-2.5 h-2.5 rounded-full bg-brand-cream group-hover:bg-brand-accent transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                <h3 className="text-2xl font-serif text-white group-hover:text-brand-accent transition-colors">網路行銷企劃</h3>
                <span className="text-xs uppercase tracking-widest opacity-40 md:ml-auto flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> 2020 - 2022
                </span>
              </div>
              <p className="text-brand-accent font-medium uppercase tracking-widest text-xs">
                大有創新有限公司 (包袋電商)
              </p>
              
              <div className="text-sm opacity-70 leading-relaxed font-light space-y-2">
                <p>負責品牌電商整合推廣與群眾募資專案整合：</p>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mt-2 space-y-1.5 font-normal">
                  <div className="text-xs text-brand-accent tracking-widest font-semibold">🏆 行銷戰果亮點</div>
                  <p className="text-emerald-400 font-medium font-serif">🎯 協助小型電商輔導單月營收突破 130 萬元</p>
                  <p className="text-emerald-400 font-medium">🎯 策劃兩次群眾募資案，其中單檔嘖嘖募資突破 1500% 驚人完成度</p>
                  <p className="text-white/80 font-light text-xs pt-1">
                    主理 KOC 精準裂變行銷與多通路零售布局，穩健撐起年銷售超 300 萬元的傲人零售佳績。
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Experience Card 3 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-0 md:pl-10 space-y-3 group"
            >
              <div className="hidden md:block absolute left-[-4.5px] top-2.5 w-2.5 h-2.5 rounded-full bg-brand-cream group-hover:bg-brand-accent transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                <h3 className="text-2xl font-serif text-white group-hover:text-brand-accent transition-colors">門市 & 網路行銷</h3>
                <span className="text-xs uppercase tracking-widest opacity-40 md:ml-auto flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> 2018 - 2020
                </span>
              </div>
              <p className="text-brand-accent font-medium uppercase tracking-widest text-xs">
                龍岩國際有限公司 (珠寶商)
              </p>
              
              <div className="text-sm opacity-70 leading-relaxed font-light space-y-2">
                <p>主持奢侈高單價珠寶品牌的實體與線上 OMO 整合：</p>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mt-2 space-y-1.5 font-normal">
                  <div className="text-xs text-brand-accent tracking-widest font-semibold">🏆 行銷戰果亮點</div>
                  <p className="text-emerald-400 font-medium font-serif">🎯 於大節慶「母親節」及「週年慶」核心檔期豪奪三千萬元營收業績</p>
                  <p className="text-emerald-400 font-medium">🎯 自投放精準引流，拉高品牌官網瀏覽量達 80% 增幅</p>
                  <p className="text-white/80 font-light text-xs pt-1">
                    全面重整並導入數位廣告與精美線上線下會員點數推薦機制 (MGM)，單年使 LINE 官方有效好友激增 1300 人。
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Highly Crafted Interactive Marketing Portfolio Section */}
      <section id="cases" className="py-24 md:py-36 px-6 md:px-16 lg:px-24 bg-brand-cream relative">
        <div className="absolute inset-0 bg-radial-at-t from-brand-accent/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div>
              <SectionTitle subtitle="Creative Work">精選行銷推廣案例演練</SectionTitle>
              <p className="text-sm text-brand-ink/75 font-light max-w-xl">
                這是我為您打造的<b>現代化行銷作品展</b>。精選多個跨領域專案實務，您可以點擊分類標籤快速篩選，檢視我在各維度的實戰轉換成果。
              </p>
            </div>

            {/* Modern Tab list styled beautifully */}
            <div className="flex flex-wrap gap-1.5 bg-brand-ink/5 p-1.5 rounded-2xl border border-brand-ink/5 self-start lg:self-end">
              {[
                { id: "all", label: "全部" },
                { id: "web_pm", label: "網頁與PM (Web & PM)" },
                { id: "ai_creative", label: "AI影音與內容 (AI & Creative)" },
                { id: "data_growth", label: "數據與增長 (Data & Growth)" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    selectedFilter === tab.id 
                      ? "bg-brand-accent text-white shadow-md shadow-brand-accent/15" 
                      : "text-brand-ink/70 hover:text-brand-ink hover:bg-brand-ink/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Card Grid container with AnimatePresence & Layout motion for fluid responsive transitions */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {(() => {
                const filtered = selectedFilter === "all" 
                  ? PORTFOLIO_PROJECTS 
                  : PORTFOLIO_PROJECTS.filter(p => p.category === selectedFilter);

                return filtered.map((proj) => (
                  <motion.div
                    layout
                    key={proj.id}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white border border-brand-ink/5 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    {/* Visual Media Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img 
                        src={proj.image} 
                        alt={proj.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Metric Floating Badge */}
                      <span className="absolute top-4 right-4 bg-brand-accent/95 hover:bg-brand-accent text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-md transition-colors">
                        {proj.metric}
                      </span>

                      {/* Small category indicator */}
                      <span className="absolute bottom-4 left-4 bg-brand-ink/80 text-brand-cream text-[9px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-lg backdrop-blur-md">
                        {proj.categoryLabel.split(" ")[0]}
                      </span>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest block">
                          {proj.categoryLabel}
                        </span>
                        <h4 className="text-xl font-serif text-brand-ink font-semibold leading-snug group-hover:text-brand-accent transition-colors duration-200">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-brand-ink/70 font-light leading-relaxed">
                          {proj.description}
                        </p>
                        
                        {proj.link && (
                          <button 
                            onClick={(e) => handleProtectedLinkClick(e, proj.link, proj.title)}
                            className="inline-flex items-center gap-1 text-xs text-brand-accent font-bold hover:underline w-fit pt-1 mt-1 cursor-pointer transition-all border-0 bg-transparent text-left outline-none"
                          >
                            <span>線上查看此作品</span>
                            <ExternalLink className="w-3 h-3 ml-0.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </button>
                        )}
                      </div>

                      {/* Tags List */}
                      <div className="flex flex-wrap gap-1.5 pt-6 mt-6 border-t border-brand-ink/5">
                        {proj.tags.map((t, idx) => (
                          <span 
                            key={idx} 
                            className="text-[10px] bg-brand-cream text-brand-ink/75 px-2.5 py-1 rounded-lg border border-brand-ink/5 font-medium hover:border-brand-accent/25 hover:text-brand-accent transition-colors duration-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                ));
              })()}
            </AnimatePresence>
          </motion.div>

          {/* Quick interactive touch conversion drawer/banner */}
          <div className="mt-16 bg-white rounded-3xl p-6 md:p-8 border border-brand-ink/5 shadow-sm text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="text-base font-serif font-medium text-brand-ink">想看特定專案、或更多隱藏版操作簡報嗎？</h4>
              <p className="text-xs text-brand-ink/60 font-light leading-relaxed">
                部分合作案礙於 NDA 保密條約無法於公開網站展示完整成果，歡迎點擊下方與我建立聯繫，我可以直接與您深度交流。
              </p>
            </div>
            <a 
              href="#contact" 
              className="px-6 py-3 bg-brand-ink text-brand-cream rounded-xl text-xs font-semibold hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-md shrink-0 block"
            >
              一鍵與我聯繫
            </a>
          </div>

        </div>
      </section>

      {/* Fine-Tuned Beautiful Contact Details with real Inquiry Form */}
      <footer id="contact" className="py-24 md:py-36 px-6 md:px-16 lg:px-24 bg-white border-t border-brand-ink/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left side: Contact Cards & Info */}
            <div className="lg:col-span-5 space-y-8">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-semibold block">聯絡方式 / Connect</span>
              
              <h2 className="text-3xl md:text-5xl font-serif font-light text-brand-ink">
                開啟我們的 <br />
                合作契機。
              </h2>
              
              <p className="text-sm text-brand-ink/75 leading-relaxed font-light">
                不論是全職的行銷職缺機會、特定的顧問專案合作預算推估，還是想要討論與新創陪跑方案，都歡迎立即與我聯繫。
              </p>

              {/* Actionable Copies List */}
              <div className="space-y-4">
                
                {/* Email Card clickable and copyable */}
                <div 
                  onClick={() => triggerCopy("madao3191@gmail.com", "email")}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-brand-cream/30 border border-brand-ink/5 hover:border-brand-accent hover:bg-brand-cream/50 transition-all cursor-pointer shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-accent shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-ink/50 block">電子郵件信箱 / Email</span>
                    <span className="text-sm font-semibold tracking-wide text-brand-ink">madao3191@gmail.com</span>
                  </div>
                  <button className="ml-auto opacity-40 group-hover:opacity-100 text-brand-accent transition-opacity">
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Card copyable */}
                <div 
                  onClick={() => triggerCopy("0919-511-528", "phone")}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-brand-cream/30 border border-brand-ink/5 hover:border-brand-accent hover:bg-brand-cream/50 transition-all cursor-pointer shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-accent shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-ink/50 block">行動電話 / Mobile</span>
                    <span className="text-sm font-semibold tracking-wide text-brand-ink">0919-511-528</span>
                  </div>
                  <button className="ml-auto opacity-40 group-hover:opacity-100 text-brand-accent transition-opacity">
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

              </div>

              {/* Social icons */}
              <div className="flex gap-4 pt-4">
                <a 
                  href="#" 
                  className="p-3.5 rounded-full border border-brand-ink/10 hover:bg-brand-ink hover:text-brand-cream transition-all group"
                  title="Linkedin"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="#" 
                  className="p-3.5 rounded-full border border-brand-ink/10 hover:bg-brand-ink hover:text-brand-cream transition-all group"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right side: Embedded Google Form */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Responsive Iframe container adjusted to seamless fits */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-brand-ink/5 bg-white shadow-sm" style={{ height: "830px" }}>
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdP1flPqKw7lL7Mfrlsva6346jmRUoO-HewXmDNHkpNnHPfOg/viewform?embedded=true" 
                  className="absolute inset-0 w-full h-full border-0"
                  title="Google Form"
                >
                  載入中…
                </iframe>
              </div>

              {/* Helpful footer actions */}
              <div className="mt-4 pt-4 border-t border-brand-ink/5 flex flex-wrap gap-2 justify-between items-center text-xs text-brand-ink/65">
                <span>網頁中無法正常填寫表單？</span>
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdP1flPqKw7lL7Mfrlsva6346jmRUoO-HewXmDNHkpNnHPfOg/viewform" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-brand-accent hover:underline inline-flex items-center gap-1"
                >
                  在新分頁中直接開啟 Google 表單 <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Footer baseline */}
          <div className="border-t border-brand-ink/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider opacity-60">
            <p>&copy; {new Date().getFullYear()} Yen 9527. All rights reserved.</p>
            <p className="font-serif">Timeless Aesthetic Portfolio Studio</p>
          </div>

        </div>
      </footer>

      {/* Password protection Modal overlay */}
      <AnimatePresence>
        {passwordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPasswordModalOpen(false)}
              className="absolute inset-0 bg-brand-ink/40 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-white border border-brand-ink/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-accent/50 via-brand-accent to-brand-accent/50" />

              {/* Close Button */}
              <button
                onClick={() => setPasswordModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-brand-cream text-brand-ink/40 hover:text-brand-ink transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center space-y-6 pt-4">
                {/* Lock icon container */}
                <div className="w-14 h-14 bg-brand-accent/10 text-brand-accent rounded-2xl flex items-center justify-center">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-semibold text-brand-ink">
                    此作品集專案受密碼保護
                  </h3>
                  <p className="text-xs text-brand-ink/65 font-light px-4 leading-relaxed">
                    正在解鎖：<span className="font-semibold text-brand-accent">{pendingProjectTitle}</span>
                  </p>
                </div>

                {/* Password Form */}
                <form onSubmit={handlePasswordSubmit} className="w-full space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-left block text-[10px] uppercase tracking-wider font-bold text-brand-ink/50 ml-1">
                      請輸入安全密碼 / Password
                    </label>
                    <input
                      type="password"
                      placeholder="請輸入密碼以解鎖..."
                      value={passwordInputValue}
                      onChange={(e) => {
                        setPasswordInputValue(e.target.value);
                        setPasswordError("");
                      }}
                      className="w-full px-5 py-4 bg-brand-cream/40 border border-brand-ink/10 rounded-2xl text-center text-base tracking-widest placeholder:tracking-normal placeholder:text-brand-ink/30 focus:border-brand-accent focus:bg-white outline-none transition-all duration-200"
                      autoFocus
                    />
                  </div>

                  {passwordError && (
                    <p className="text-xs text-rose-600 font-medium bg-rose-50 border border-rose-100 p-3 rounded-xl leading-relaxed">
                      {passwordError}
                    </p>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-brand-accent text-white font-semibold text-sm hover:bg-brand-accent/90 shadow-md shadow-brand-accent/15 transition-all text-center cursor-pointer"
                    >
                      驗證並開啟連結
                    </button>
                    
                    <a
                      href="#contact"
                      onClick={() => {
                        setPasswordModalOpen(false);
                      }}
                      className="w-full py-4 rounded-2xl bg-brand-cream hover:bg-brand-cream/80 text-brand-ink/80 text-xs font-semibold tracking-wider text-center transition-all block border border-brand-ink/5 cursor-pointer"
                    >
                      與我聯繫索取密碼 🤝
                    </a>
                  </div>
                </form>

                <p className="text-[10px] text-brand-ink/40 font-light leading-relaxed">
                  💡 貼心提示：密碼驗證通過後，此瀏覽器視窗在您關閉前，後續開啟其他作品都無需重複輸入。
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

