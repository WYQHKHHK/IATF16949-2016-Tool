export interface GlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  definition: string;
  category: 'core_tool' | 'general' | 'process';
}

export const glossaryData: GlossaryTerm[] = [
  {
    id: 'apqp',
    term: '产品质量先期策划',
    acronym: 'APQP',
    definition: '一种结构化的策划方法，旨在定义和制定必要的步骤以确保产品满足客户需求。重点在于产品的早期质量策划、风险缓解以及确保顺利过渡到量产阶段。',
    category: 'core_tool'
  },
  {
    id: 'ppap',
    term: '生产件批准程序',
    acronym: 'PPAP',
    definition: '一个标准化的过程，用于证明供应商在实际量产运行阶段（以及使用规定的生产节拍与工装设备情况）具有持续稳定生产满足所有客户要求产品的潜在能力。',
    category: 'core_tool'
  },
  {
    id: 'fmea',
    term: '潜在失效模式及后果分析',
    acronym: 'FMEA',
    definition: '一种系统化的工具与方法，用于识别和探究设计、过程或产品中所有潜在的失效模式及其后果。它构成了缺陷预防和控制计划的基础。',
    category: 'core_tool'
  },
  {
    id: 'msa',
    term: '测量系统分析',
    acronym: 'MSA',
    definition: '一种运用数理统计方法来确定测量过程中存在的变差水平的方法。需明确因测量过程带来的变差对整理过程变差或判断公差能力造成的影响。',
    category: 'core_tool'
  },
  {
    id: 'spc',
    term: '统计过程控制',
    acronym: 'SPC',
    definition: '运用统计学方法来监控和控制过程（制程），确保其处于受控状态并最大化其潜力，从而生产出符合规范及预期的产品。',
    category: 'core_tool'
  },
  {
    id: 'control-plan',
    term: '控制计划',
    definition: '针对控制产品制造过程所需的系统和过程的书面描述文件。它规定了为最大程度减少过程和产品变差而在各阶段需落实的控制方法。',
    category: 'process'
  },
  {
    id: 'special-characteristic',
    term: '特殊特性',
    definition: '产品特性或制造过程参数的分类，这类参数的变动可能合理地预期会影响到产品的安全性、法规合规性、装配性、功能性、性能或是后续的产品加工。',
    category: 'general'
  },
  {
    id: 'csr',
    term: '客户特定要求',
    acronym: 'CSR',
    definition: '对汽车质量管理体系标准的特定条款的解释或补充的要求文本。在供应链运行以及 IATF 16949 审核中起着至关重要的作用。',
    category: 'general'
  },
  {
    id: 'nonconformity',
    term: '不符合项',
    definition: '指未满足既定的要求。这可能涉及特定的过程、生产的产品或体系相关活动未能达到指定的行业标准或客户预期的状态。',
    category: 'general'
  },
  {
    id: 'cqi',
    term: '持续质量改进',
    acronym: 'CQI',
    definition: '一种鼓励组织内部人员对持续发问、不断优化提升各项过程质量水平的理念和体系。也常指代 AIAG (美国汽车工业行动集团) 发布的特殊过程评估标准（如 CQI-9 热处理系统评估）。',
    category: 'process'
  },
  {
    id: '8d',
    term: '八项纪律问题解决法',
    acronym: '8D',
    definition: '解决结构性问题的经典步骤与工具体系，致力于寻找导致质量缺陷发生的根本原因，制定并实施短期应急以及长远的纠正和预防措施，在汽车行业应用广泛。',
    category: 'process'
  },
  {
    id: 'oee',
    term: '设备综合效率',
    acronym: 'OEE',
    definition: '反映设备实际运转情况转化的真实生产力价值比例的指标。OEE 分数为 100% 代表着非常理想的完美状况：即没有故障停机事件、设备按最快节拍运作而且只产出100%无缺陷的合格品。',
    category: 'process'
  }
];
