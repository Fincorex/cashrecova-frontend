import Zebra from '@/assets/Product-Images/Zebra.png';
import Corepoint from '@/assets/Product-Images/Corepoint.png';
import CashRecova from '@/assets/Product-Images/CashRecova.png';
import Agentix from '@/assets/Product-Images/Agentix.png';

export const productsData = {
  corepoint: {
    id: "corepoint",
    name: "Corepoint",
    image: Corepoint,
    tagline: "Core Banking Infrastructure for Modern Financial Institutions",
    description: "Power your entire banking operation with a real-time, API-first core designed for scale, flexibility, and control.",
    overview: "Corepoint is the central engine of financial operations, enabling institutions to manage customers, accounts, transactions, and financial products from a single unified platform. Built for performance and reliability, Corepoint supports both traditional and digital-first financial institutions.",
    whatYouCanDo: [
      "Onboard and verify customers with integrated KYC workflows",
      "Manage savings and current accounts",
      "Configure and manage loan products",
      "Process transactions in real time",
      "Automate interest calculations and financial operations"
    ],
    keyCapabilities: [
      "Real-time transaction processing engine",
      "General ledger management",
      "Multi-branch and multi-tenant support",
      "Role-based access control",
      "Full audit trails and compliance logs",
      "API-first integration with external systems"
    ],
    howItWorks: [
      "Customers are onboarded and verified",
      "Accounts are created and linked to the ledger",
      "Transactions are processed instantly",
      "External systems connect via secure APIs"
    ],
    builtFor: "Microfinance institutions, digital banks, fintech startups, and lenders.",
    ctaText: "Request a Demo",
    color: "blue",
    icon: "ti-building-bank"
  },
  cashrecova: {
    id: "cashrecova",
    name: "CashRecova",
    image: CashRecova,
    tagline: "Direct Debit Infrastructure for Automated Payment Collection",
    description: "Collect recurring payments directly from customer bank accounts — reliably and at scale.",
    overview: "CashRecova enables institutions to automate payment collections through secure direct debit mandates, reducing manual effort and improving cash flow predictability.",
    whatYouCanDo: [
      "Set up and manage debit mandates",
      "Schedule recurring collections",
      "Automatically retry failed transactions",
      "Track payment status in real time"
    ],
    keyCapabilities: [
      "Mandate authorization and storage",
      "Intelligent retry logic for failed debits",
      "Settlement and reconciliation engine",
      "Compliance and reporting logs",
      "API integration with any banking or wallet system"
    ],
    howItWorks: [
      "Customer authorizes a debit mandate",
      "Mandate is securely stored and verified",
      "System schedules recurring debits",
      "Funds are settled into your account"
    ],
    builtFor: "Lenders, fintech companies, subscription platforms, and financial institutions.",
    ctaText: "Start Collecting Payments",
    color: "emerald",
    icon: "ti-refresh"
  },
  zebra: {
    id: "zebra",
    name: "Zebra",
    image: Zebra,
    tagline: "Card Issuing & Processing Infrastructure",
    description: "Launch and manage debit and prepaid card programs without building your own issuer stack.",
    overview: "Zebra is a complete card issuing and management platform that enables institutions to deploy card programs quickly and operate them efficiently.",
    whatYouCanDo: [
      "Issue virtual and physical cards",
      "Authorize transactions in real time",
      "Set spending limits and controls",
      "Monitor and prevent fraud"
    ],
    keyCapabilities: [
      "Card lifecycle management",
      "Real-time authorization routing",
      "Fraud detection and monitoring",
      "Settlement and reconciliation",
      "API integrations with core banking or wallet systems"
    ],
    howItWorks: [
      "Configure your card program",
      "Issue cards linked to accounts or wallets",
      "Transactions are processed and authorized in real time",
      "Settlement and reporting are automated"
    ],
    builtFor: "Banks, fintechs, wallet providers, and payment companies.",
    ctaText: "Launch Your Card Program",
    color: "purple",
    icon: "ti-credit-card"
  },
  agentix: {
    id: "agentix",
    name: "Agentix",
    image: Agentix,
    tagline: "Agency Banking Infrastructure for Financial Inclusion",
    description: "Extend your reach and serve customers anywhere through agent networks.",
    overview: "Agentix enables institutions to deploy and manage agent banking networks, bringing financial services closer to underserved communities.",
    whatYouCanDo: [
      "Onboard and manage agents",
      "Enable cash-in and cash-out transactions",
      "Automate commissions and incentives",
      "Monitor agent performance in real time"
    ],
    keyCapabilities: [
      "Agent wallet management",
      "Float and liquidity management",
      "Commission automation",
      "Real-time reporting dashboards",
      "API integration with banking or wallet systems"
    ],
    howItWorks: [
      "Agents are onboarded and verified",
      "Wallets are assigned and funded",
      "Transactions sync with your core system",
      "Commissions are automatically calculated"
    ],
    builtFor: "Microfinance institutions, banks, fintechs, and financial service providers expanding distribution.",
    ctaText: "Build Your Agent Network",
    color: "orange",
    icon: "ti-users-group"
  }
};
