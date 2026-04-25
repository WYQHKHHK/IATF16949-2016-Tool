export interface Clause {
  id: string;
  title: string;
  subClauses?: Clause[];
  content?: string;
}

export const iatfData: Clause[] = [
  {
    id: "4",
    title: "组织环境",
    subClauses: [
      { id: "4.1", title: "理解组织及其环境" },
      { id: "4.2", title: "理解相关方的需求和期望" },
      { id: "4.3", title: "确定质量管理体系范围", subClauses: [
        { id: "4.3.1", title: "确定质量管理体系范围—补充" },
        { id: "4.3.2", title: "顾客特殊要求" },
      ]},
      { id: "4.4", title: "质量管理体系及其过程", subClauses: [
        { id: "4.4.1", title: "（仅章节号）", subClauses: [
          { id: "4.4.1.1", title: "产品和过程符合性" },
          { id: "4.4.1.2", title: "产品安全" },
        ]},
        { id: "4.4.2", title: "（仅章节号）" },
      ] }
    ]
  },
  {
    id: "5",
    title: "领导作用",
    subClauses: [
      { id: "5.1", title: "领导作用和承诺", subClauses: [
        { id: "5.1.1", title: "总则", subClauses: [
          { id: "5.1.1.1", title: "企业责任" },
          { id: "5.1.1.2", title: "过程有效性和效率" },
          { id: "5.1.1.3", title: "过程所有者" },
        ]},
        { id: "5.1.2", title: "以顾客为关注点" }
      ]},
      { id: "5.2", title: "方针", subClauses: [
        { id: "5.2.1", title: "质量方针的制定" },
        { id: "5.2.2", title: "质量方针的沟通" }
      ]},
      { id: "5.3", title: "组织的角色、职责和权限", subClauses: [
        { id: "5.3.1", title: "组织的角色、职责和权限—补充" },
        { id: "5.3.2", title: "产品要求和纠正措施的职责和权限" }
      ]}
    ]
  },
  {
    id: "6",
    title: "策划",
    subClauses: [
      { id: "6.1", title: "应对风险和机遇的措施", subClauses: [
        { id: "6.1.1", title: "（仅章节号）" },
        { id: "6.1.2", title: "（仅章节号）", subClauses: [
          { id: "6.1.2.1", title: "风险分析" },
          { id: "6.1.2.2", title: "预防措施" },
          { id: "6.1.2.3", title: "应急计划" }
        ]}
      ]},
      { id: "6.2", title: "质量目标及其实现的策划", subClauses: [
        { id: "6.2.1", title: "（仅章节号）" },
        { id: "6.2.2", title: "（仅章节号）", subClauses: [
          { id: "6.2.2.1", title: "质量目标及其实现的策划—补充" }
        ]}
      ]},
      { id: "6.3", title: "变更的策划" }
    ]
  },
  {
    id: "7",
    title: "支持",
    subClauses: [
      { id: "7.1", title: "资源", subClauses: [
        { id: "7.1.1", title: "总则" },
        { id: "7.1.2", title: "人员" },
        { id: "7.1.3", title: "基础设施", subClauses: [
          { id: "7.1.3.1", title: "工厂、设施和设备策划" }
        ]},
        { id: "7.1.4", title: "过程运行环境", subClauses: [
          { id: "7.1.4.1", title: "过程运行环境—补充" }
        ]},
        { id: "7.1.5", title: "监视和测量资源", subClauses: [
          { id: "7.1.5.1", title: "总则", subClauses: [
            { id: "7.1.5.1.1", title: "测量系统分析" }
          ]},
          { id: "7.1.5.2", title: "测量溯源", subClauses: [
            { id: "7.1.5.2.1", title: "校准/验证记录" }
          ]},
          { id: "7.1.5.3", title: "实验室要求", subClauses: [
             { id: "7.1.5.3.1", title: "内部实验室" },
             { id: "7.1.5.3.2", title: "外部实验室" }
          ]}
        ]},
        { id: "7.1.6", title: "组织的知识" },
      ]},
      { id: "7.2", title: "能力", subClauses: [
        { id: "7.2.1", title: "能力—补充" },
        { id: "7.2.2", title: "能力—在职培训" },
        { id: "7.2.3", title: "内部审核员能力" },
        { id: "7.2.4", title: "二方审核员能力" }
      ]},
      { id: "7.3", title: "意识", subClauses: [
        { id: "7.3.1", title: "意识—补充" },
        { id: "7.3.2", title: "员工激励和授权" }
      ]},
      { id: "7.4", title: "沟通" },
      { id: "7.5", title: "形成文件的信息", subClauses: [
         { id: "7.5.1", title: "总则", subClauses: [
           { id: "7.5.1.1", title: "质量管理体系文件" }
         ]},
         { id: "7.5.2", title: "创建与更新" },
         { id: "7.5.3", title: "形成文件的信息的控制", subClauses: [
           { id: "7.5.3.1", title: "（仅章节号）" },
           { id: "7.5.3.2", title: "（仅章节号）", subClauses: [
             { id: "7.5.3.2.1", title: "记录的保存" },
             { id: "7.5.3.2.2", title: "工程规范" }
           ]}
         ]}
      ]}
    ]
  },
  {
    id: "8",
    title: "运行",
    subClauses: [
      { id: "8.1", title: "运行策划和控制", subClauses: [
        { id: "8.1.1", title: "运行策划和控制—补充" },
        { id: "8.1.2", title: "保密" }
      ]},
      { id: "8.2", title: "产品和服务的要求", subClauses: [
        { id: "8.2.1", title: "顾客沟通", subClauses: [
          { id: "8.2.1.1", title: "顾客沟通—补充" }
        ]},
        { id: "8.2.2", title: "产品和服务要求的确定", subClauses: [
          { id: "8.2.2.1", title: "产品和服务要求的确定—补充" }
        ]},
        { id: "8.2.3", title: "产品和服务要求的评审", subClauses: [
          { id: "8.2.3.1", title: "（仅章节号）", subClauses: [
            { id: "8.2.3.1.1", title: "产品和服务要求的评审—补充" },
            { id: "8.2.3.1.2", title: "顾客指定的特殊特性" },
            { id: "8.2.3.1.3", title: "组织制造可行性" }
          ]},
          { id: "8.2.3.2", title: "（仅章节号）" }
        ]},
        { id: "8.2.4", title: "产品和服务要求的更改" }
      ]},
      { id: "8.3", title: "产品和服务的设计和开发", subClauses: [
         { id: "8.3.1", title: "总则", subClauses: [
           { id: "8.3.1.1", title: "产品和服务的设计和开发—补充" }
         ]},
         { id: "8.3.2", title: "设计和开发策划", subClauses: [
           { id: "8.3.2.1", title: "设计和开发策划—补充" },
           { id: "8.3.2.2", title: "产品设计技能" },
           { id: "8.3.2.3", title: "带油嵌入式软件的产品的开发" }
         ]},
         { id: "8.3.3", title: "设计和开发输入", subClauses: [
           { id: "8.3.3.1", title: "产品设计输入" },
           { id: "8.3.3.2", title: "制造过程设计输入" },
           { id: "8.3.3.3", title: "特殊特性" }
         ]},
         { id: "8.3.4", title: "设计和开发控制", subClauses: [
           { id: "8.3.4.1", title: "监视" },
           { id: "8.3.4.2", title: "设计和开发确认" },
           { id: "8.3.4.3", title: "原型样件方案" },
           { id: "8.3.4.4", title: "产品批准过程" }
         ]},
         { id: "8.3.5", title: "设计和开发输出", subClauses: [
           { id: "8.3.5.1", title: "设计和开发输出—补充" },
           { id: "8.3.5.2", title: "制造过程设计输出" }
         ]},
         { id: "8.3.6", title: "设计和开发更改", subClauses: [
           { id: "8.3.6.1", title: "设计和开发更改—补充" }
         ]}
      ]},
      { id: "8.4", title: "外部提供过程、产品和服务的控制", subClauses: [
        { id: "8.4.1", title: "总则", subClauses: [
          { id: "8.4.1.1", title: "总则—补充" },
          { id: "8.4.1.2", title: "供应商选择过程" },
          { id: "8.4.1.3", title: "顾客指定供货来源（也称“指向性购买”）" }
        ]},
        { id: "8.4.2", title: "控制类型和程度", subClauses: [
          { id: "8.4.2.1", title: "控制类型和程度—补充" },
          { id: "8.4.2.2", title: "法律和法规要求" },
          { id: "8.4.2.3", title: "供应商质量管理体系开发", subClauses: [
            { id: "8.4.2.3.1", title: "汽车产品相关软件或带有嵌入式软件的汽车产品" }
          ]},
          { id: "8.4.2.4", title: "供应商监视", subClauses: [
            { id: "8.4.2.4.1", title: "二方审核" }
          ]},
          { id: "8.4.2.5", title: "供应商开发" }
        ]},
        { id: "8.4.3", title: "外部供方的信息", subClauses: [
          { id: "8.4.3.1", title: "外部供方的信息—补充" }
        ]}
      ]},
      { id: "8.5", title: "生产和服务提供", subClauses: [
         { id: "8.5.1", title: "生产和服务提供的控制", subClauses: [
           { id: "8.5.1.1", title: "控制计划" },
           { id: "8.5.1.2", title: "标准化作业—操作指导书和可视化标准" },
           { id: "8.5.1.3", title: "作业准备验证" },
           { id: "8.5.1.4", title: "停机后验证" },
           { id: "8.5.1.5", title: "全面生产维护" },
           { id: "8.5.1.6", title: "生产工装及制造、试验、检验工装和设备的管理" },
           { id: "8.5.1.7", title: "生产计划" }
         ]},
         { id: "8.5.2", title: "标识和可追溯性", subClauses: [
           { id: "8.5.2.1", title: "标识和可追溯性—补充" }
         ]},
         { id: "8.5.3", title: "顾客或外部供方的财产" },
         { id: "8.5.4", title: "防护", subClauses: [
           { id: "8.5.4.1", title: "防护—补充" }
         ]},
         { id: "8.5.5", title: "交付后的活动", subClauses: [
           { id: "8.5.5.1", title: "服务信息反馈" },
           { id: "8.5.5.2", title: "与顾客的服务协议" }
         ]},
         { id: "8.5.6", title: "更改控制", subClauses: [
           { id: "8.5.6.1", title: "更改控制—补充", subClauses: [
             { id: "8.5.6.1.1", title: "过程控制的临时更改" }
           ]}
         ]}
      ]},
      { id: "8.6", title: "产品和服务的放行", subClauses: [
         { id: "8.6.1", title: "产品和服务的放行—补充" },
         { id: "8.6.2", title: "全尺寸检验和功能试验" },
         { id: "8.6.3", title: "外观项目" },
         { id: "8.6.4", title: "外部供方提供的产品和服务符合性的验证和接受" },
         { id: "8.6.5", title: "法律和法规符合性" },
         { id: "8.6.6", title: "接收准准则" }
      ]},
      { id: "8.7", title: "不合格输出的控制", subClauses: [
        { id: "8.7.1", title: "（仅章节号）", subClauses: [
          { id: "8.7.1.1", title: "顾客让步授权" },
          { id: "8.7.1.2", title: "不合格产品控制—顾客规定的过程" },
          { id: "8.7.1.3", title: "可疑产品控制" },
          { id: "8.7.1.4", title: "返工产品的控制" },
          { id: "8.7.1.5", title: "返修产品的控制" },
          { id: "8.7.1.6", title: "顾客通知" },
          { id: "8.7.1.7", title: "不合格品的处置" }
        ]},
        { id: "8.7.2", title: "（仅章节号）" }
      ]}
    ]
  },
  {
    id: "9",
    title: "绩效评价",
    subClauses: [
      { id: "9.1", title: "监视、测量、分析和评价", subClauses: [
        { id: "9.1.1", title: "总则", subClauses: [
          { id: "9.1.1.1", title: "制造过程的监视和测量" },
          { id: "9.1.1.2", title: "统计工具识别" },
          { id: "9.1.1.3", title: "统计概念的应用" }
        ]},
        { id: "9.1.2", title: "顾客满意", subClauses: [
          { id: "9.1.2.1", title: "顾客满意—补充" }
        ]},
        { id: "9.1.3", title: "分析与评价", subClauses: [
          { id: "9.1.3.1", title: "优先级" }
        ]}
      ]},
      { id: "9.2", title: "内部审核", subClauses: [
        { id: "9.2.1", title: "（仅章节号）" },
        { id: "9.2.2", title: "（仅章节号）", subClauses: [
          { id: "9.2.2.1", title: "内部审核方案" },
          { id: "9.2.2.2", title: "质量管理体系审核" },
          { id: "9.2.2.3", title: "制造过程审核" },
          { id: "9.2.2.4", title: "产品审核" }
        ]}
      ]},
      { id: "9.3", title: "管理评审", subClauses: [
        { id: "9.3.1", title: "总则", subClauses: [
          { id: "9.3.1.1", title: "管理评审—补充" }
        ]},
        { id: "9.3.2", title: "管理评审输入", subClauses: [
          { id: "9.3.2.1", title: "管理评审输入—补充" }
        ]},
        { id: "9.3.3", title: "管理评审输出", subClauses: [
          { id: "9.3.3.1", title: "管理评审输出—补充" }
        ]}
      ]}
    ]
  },
  {
    id: "10",
    title: "改进",
    subClauses: [
      { id: "10.1", title: "总则" },
      { id: "10.2", title: "不合格和纠正措施", subClauses: [
        { id: "10.2.1", title: "（仅章节号）" },
        { id: "10.2.2", title: "（仅章节号）" },
        { id: "10.2.3", title: "问题解决" },
        { id: "10.2.4", title: "防错" },
        { id: "10.2.5", title: "保修管理体系" },
        { id: "10.2.6", title: "顾客投诉及使用现场失效试验分析" }
      ]},
      { id: "10.3", title: "持续改进", subClauses: [
        { id: "10.3.1", title: "持续改进—补充" }
      ]}
    ]
  }
];

export const flattenClauses = (clauses: Clause[]): Clause[] => {
  let result: Clause[] = [];
  for (const clause of clauses) {
    if (clause.title !== "（仅章节号）") {
      result.push({ id: clause.id, title: clause.title });
    }
    if (clause.subClauses) {
      result = result.concat(flattenClauses(clause.subClauses));
    }
  }
  return result;
};

export const flatIatfData = flattenClauses(iatfData);
