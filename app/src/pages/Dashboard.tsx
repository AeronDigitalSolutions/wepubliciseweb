import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Key,
  ShieldCheck,
  Layers,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
  Bell,
  Smartphone,
  Lock,
  Info,
  Radio,
  Zap,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import LiquidButton from '../components/LiquidButton';

// Mock Approved Templates Database
interface Template {
  id: string;
  name: string;
  category: 'authentication' | 'transactional_utility' | 'scheduled_utility' | 'marketing';
  channel: 'api_only' | 'campaign_only' | 'both';
  sampleText: string;
  variables: string[];
  status: 'Approved' | 'Pending';
  pricingTier: string;
}

const templatesData: Template[] = [
  {
    id: 'TPL_AUTH_LOGIN_01',
    name: 'User Sign-In Verification (Login OTP)',
    category: 'authentication',
    channel: 'api_only',
    sampleText: 'Your we Publicise login code is {{otp}}. Valid for 5 minutes. Do not share this code.',
    variables: ['otp'],
    status: 'Approved',
    pricingTier: 'Authentication (Lowest Rate)',
  },
  {
    id: 'TPL_AUTH_LEAD_02',
    name: 'Lead Contact Verification (Form OTP)',
    category: 'authentication',
    channel: 'api_only',
    sampleText: 'Verify your consultation request for we Publicise. Your security code is {{otp}}.',
    variables: ['otp'],
    status: 'Approved',
    pricingTier: 'Authentication (Lowest Rate)',
  },
  {
    id: 'TPL_UTIL_RECEIPT_03',
    name: 'Instant Payment & Retainer Receipt',
    category: 'transactional_utility',
    channel: 'api_only',
    sampleText: 'Receipt confirmed: Payment of {{amount}} for project {{project_id}} was successful.',
    variables: ['amount', 'project_id'],
    status: 'Approved',
    pricingTier: 'Utility (Transactional)',
  },
  {
    id: 'TPL_UTIL_REMINDER_04',
    name: 'Scheduled Strategy Session Reminder',
    category: 'scheduled_utility',
    channel: 'both',
    sampleText: 'Reminder: Your strategy sync with we Publicise is scheduled tomorrow at {{time}}.',
    variables: ['time'],
    status: 'Approved',
    pricingTier: 'Utility (Batch / Scheduled)',
  },
  {
    id: 'TPL_UTIL_MAINTENANCE_05',
    name: 'Scheduled Cloud Maintenance Notice',
    category: 'scheduled_utility',
    channel: 'both',
    sampleText: 'Scheduled maintenance: System telemetry will undergo routine upgrades on {{date}} from {{hours}}.',
    variables: ['date', 'hours'],
    status: 'Approved',
    pricingTier: 'Utility (Batch / Scheduled)',
  },
  {
    id: 'TPL_MKT_SUMMER_06',
    name: 'Q3 Agency Growth & Case Study Launch',
    category: 'marketing',
    channel: 'campaign_only',
    sampleText: 'Discover how we achieved +280% brand recall for our enterprise partners. Book a 2026 audit: {{link}}.',
    variables: ['link'],
    status: 'Approved',
    pricingTier: 'Marketing (Standard Rate)',
  },
  {
    id: 'TPL_MKT_EXCLUSIVE_07',
    name: 'Exclusive VIP Retainer Invitation',
    category: 'marketing',
    channel: 'campaign_only',
    sampleText: 'Limited slot: Scale your brand with dedicated digital growth architecture. Claim your audit today.',
    variables: [],
    status: 'Approved',
    pricingTier: 'Marketing (Standard Rate)',
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'campaign' | 'api' | 'registry'>('campaign');

  // Campaign Maker State
  const [campaignType, setCampaignType] = useState<'marketing' | 'scheduled_utility'>('marketing');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('TPL_MKT_SUMMER_06');
  const [campaignName, setCampaignName] = useState('Summer Growth Outreach 2026');
  const [audienceGroup, setAudienceGroup] = useState('Enterprise Leads (1,420 contacts)');
  const [scheduleOption, setScheduleOption] = useState<'now' | 'scheduled'>('now');
  const [campaignSuccess, setCampaignSuccess] = useState(false);

  // API Explorer State
  const [selectedApiTemplate, setSelectedApiTemplate] = useState<string>('TPL_AUTH_LOGIN_01');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [simulatedMobile, setSimulatedMobile] = useState('+91 98765 43210');
  const [simulatedOtp, setSimulatedOtp] = useState('482910');
  const [apiSimulationSuccess, setApiSimulationSuccess] = useState(false);

  const apiKey = 'pk_live_wepublicise_a7f920bc481e59d';

  // Filter templates strictly for campaign creation (OTP EXCLUDED 100%)
  const campaignEligibleTemplates = templatesData.filter(
    (t) =>
      (campaignType === 'marketing' && t.category === 'marketing') ||
      (campaignType === 'scheduled_utility' && t.category === 'scheduled_utility')
  );

  const selectedTemplate = templatesData.find((t) => t.id === selectedTemplateId) || campaignEligibleTemplates[0];

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const curlCode = `curl -X POST https://api.wepublicise.com/v1/messages/dispatch \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "${simulatedMobile}",
    "template_id": "${selectedApiTemplate}",
    "params": {
      ${selectedApiTemplate.includes('AUTH') ? `"otp": "${simulatedOtp}"` : `"amount": "$4,500", "project_id": "PRJ-902"`}
    }
  }'`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCode);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleTriggerCampaign = () => {
    setCampaignSuccess(true);
    setTimeout(() => setCampaignSuccess(false), 4000);
  };

  const handleTriggerApiSimulation = () => {
    setApiSimulationSuccess(true);
    setTimeout(() => setApiSimulationSuccess(false), 4000);
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Header & Breadcrumbs */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E2B37] pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#141C24] border border-[#1E2B37] text-[#00F5A0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0] animate-pulse"></span>
                  LIVE GATEWAY ENGINE
                </span>
                <span className="text-xs text-zinc-500 font-mono">v2.4.0 • PRODUCTION</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Communications & Messaging Engine
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 mt-1 max-w-2xl">
                Unified broadcast campaign creator and real-time event-driven API gateway with strict template classification.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-zinc-400 font-mono">GLOBAL API STATUS</p>
                <p className="text-sm font-semibold text-[#00F5A0] flex items-center gap-1.5 justify-end">
                  <span className="w-2 h-2 rounded-full bg-[#00F5A0]"></span> Operational (99.98%)
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setActiveTab('campaign')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all border ${
                activeTab === 'campaign'
                  ? 'bg-[#0E141B] border-[#00F5A0] text-white shadow-lg'
                  : 'bg-[#0E141B]/50 border-[#1E2B37] text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Send size={16} className={activeTab === 'campaign' ? 'text-[#00F5A0]' : 'text-zinc-400'} />
              <span>Campaign Dispatcher</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#141C24] text-zinc-300 border border-[#1E2B37]">
                1-to-Many Broadcast
              </span>
            </button>

            <button
              onClick={() => setActiveTab('api')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all border ${
                activeTab === 'api'
                  ? 'bg-[#0E141B] border-[#7C3AED] text-white shadow-lg'
                  : 'bg-[#0E141B]/50 border-[#1E2B37] text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Terminal size={16} className={activeTab === 'api' ? 'text-[#7C3AED]' : 'text-zinc-400'} />
              <span>API & Webhook Triggers</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1E1035] text-[#A78BFA] border border-[#7C3AED]/40">
                OTP & Instant Utility
              </span>
            </button>

            <button
              onClick={() => setActiveTab('registry')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all border ${
                activeTab === 'registry'
                  ? 'bg-[#0E141B] border-white text-white shadow-lg'
                  : 'bg-[#0E141B]/50 border-[#1E2B37] text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Layers size={16} className={activeTab === 'registry' ? 'text-white' : 'text-zinc-400'} />
              <span>Template Registry</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#141C24] text-zinc-300 border border-[#1E2B37]">
                DLT / Meta Matrix
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: CAMPAIGN MAKER */}
        {activeTab === 'campaign' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Campaign Form */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Architecture Rule Notice */}
              <div className="bg-[#0E141B] border border-[#1E2B37] rounded-2xl p-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#141C24] border border-[#1E2B37] flex items-center justify-center shrink-0 text-[#00F5A0]">
                  <Info size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Strict Campaign Rule Applied</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Authentication (OTP) templates are strictly excluded from campaign broadcasting. Campaigns are dedicated to{' '}
                    <strong className="text-zinc-200">Marketing</strong> and{' '}
                    <strong className="text-zinc-200">Scheduled / Batch Utility</strong> alerts.
                  </p>
                </div>
              </div>

              {/* Step 1: Campaign Category */}
              <div className="bg-[#0E141B] border border-[#1E2B37] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-mono tracking-wider text-zinc-400 uppercase">
                    Step 1 • Select Campaign Category
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">2 Types Eligible</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Category A: Marketing */}
                  <div
                    onClick={() => {
                      setCampaignType('marketing');
                      setSelectedTemplateId('TPL_MKT_SUMMER_06');
                    }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      campaignType === 'marketing'
                        ? 'bg-[#141C24] border-[#00F5A0] ring-1 ring-[#00F5A0]'
                        : 'bg-[#080B0E] border-[#1E2B37] hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-lg bg-[#0E141B] border border-[#1E2B37] flex items-center justify-center text-[#00F5A0]">
                        <Zap size={16} />
                      </span>
                      <Radio
                        size={16}
                        className={campaignType === 'marketing' ? 'text-[#00F5A0]' : 'text-zinc-600'}
                      />
                    </div>
                    <p className="font-semibold text-sm text-white">Marketing</p>
                    <p className="text-xs text-zinc-400 mt-1">Offers, launches, VIP newsletters, retargeting.</p>
                    <div className="mt-3 inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#0E141B] border border-[#1E2B37] text-zinc-300">
                      Standard Rate
                    </div>
                  </div>

                  {/* Category B: Scheduled Utility */}
                  <div
                    onClick={() => {
                      setCampaignType('scheduled_utility');
                      setSelectedTemplateId('TPL_UTIL_REMINDER_04');
                    }}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      campaignType === 'scheduled_utility'
                        ? 'bg-[#141C24] border-[#00F5A0] ring-1 ring-[#00F5A0]'
                        : 'bg-[#080B0E] border-[#1E2B37] hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-lg bg-[#0E141B] border border-[#1E2B37] flex items-center justify-center text-[#39bda7]">
                        <Calendar size={16} />
                      </span>
                      <Radio
                        size={16}
                        className={campaignType === 'scheduled_utility' ? 'text-[#00F5A0]' : 'text-zinc-600'}
                      />
                    </div>
                    <p className="font-semibold text-sm text-white">Scheduled Utility</p>
                    <p className="text-xs text-zinc-400 mt-1">Event reminders, monthly billing, system alerts.</p>
                    <div className="mt-3 inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#0D2A26] border border-[#00F5A0]/40 text-[#00F5A0]">
                      Lower Tier Rate
                    </div>
                  </div>

                  {/* Category C: Authentication OTP (STRICTLY LOCKED) */}
                  <div className="p-4 rounded-xl border border-zinc-800 bg-[#080B0E]/60 opacity-60 relative group cursor-not-allowed">
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-lg bg-[#141C24] border border-zinc-800 flex items-center justify-center text-zinc-500">
                        <Lock size={15} />
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60">
                        BLOCKED
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-zinc-400 line-through">Authentication (OTP)</p>
                    <p className="text-xs text-zinc-500 mt-1">Real-time synchronous verification only.</p>
                    <div className="mt-3 inline-flex items-center gap-1 text-[10px] text-amber-400/90 font-mono">
                      <AlertTriangle size={11} /> API Gateway Only
                    </div>
                  </div>

                </div>
              </div>

              {/* Step 2: Campaign Configuration */}
              <div className="bg-[#0E141B] border border-[#1E2B37] rounded-2xl p-6 space-y-5">
                <h3 className="text-sm font-mono tracking-wider text-zinc-400 uppercase">
                  Step 2 • Campaign Parameters
                </h3>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full bg-[#080B0E] border border-[#1E2B37] focus:border-[#00F5A0] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors font-sans"
                    placeholder="e.g. Q3 Growth Campaign"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                    Select Pre-Approved Template
                  </label>
                  <select
                    value={selectedTemplateId}
                    onChange={(e) => setSelectedTemplateId(e.target.value)}
                    className="w-full bg-[#080B0E] border border-[#1E2B37] focus:border-[#00F5A0] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    {campaignEligibleTemplates.map((t) => (
                      <option key={t.id} value={t.id}>
                        [{t.id}] {t.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-zinc-500 mt-1 font-mono">
                    Showing approved {campaignType === 'marketing' ? 'Marketing' : 'Utility'} templates. OTP templates are excluded from this list.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                      Audience Target
                    </label>
                    <select
                      value={audienceGroup}
                      onChange={(e) => setAudienceGroup(e.target.value)}
                      className="w-full bg-[#080B0E] border border-[#1E2B37] focus:border-[#00F5A0] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    >
                      <option>Enterprise Leads (1,420 contacts)</option>
                      <option>Active Retainer Clients (380 contacts)</option>
                      <option>Webinar Registrants (2,850 contacts)</option>
                      <option>Custom CSV Import (Upload New File)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                      Dispatch Schedule
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setScheduleOption('now')}
                        className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          scheduleOption === 'now'
                            ? 'bg-[#141C24] border-[#00F5A0] text-[#00F5A0]'
                            : 'bg-[#080B0E] border-[#1E2B37] text-zinc-400'
                        }`}
                      >
                        Send Immediately
                      </button>
                      <button
                        type="button"
                        onClick={() => setScheduleOption('scheduled')}
                        className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          scheduleOption === 'scheduled'
                            ? 'bg-[#141C24] border-[#00F5A0] text-[#00F5A0]'
                            : 'bg-[#080B0E] border-[#1E2B37] text-zinc-400'
                        }`}
                      >
                        Schedule Later
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <LiquidButton
                    onClick={handleTriggerCampaign}
                    className="w-full justify-center bg-[#00F5A0] text-black border-[#00F5A0] font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <Send size={16} />
                      Launch {campaignType === 'marketing' ? 'Marketing' : 'Scheduled Utility'} Campaign
                    </span>
                  </LiquidButton>
                </div>

                {campaignSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-[#0D2A26] border border-[#00F5A0] flex items-center gap-3 text-sm text-white"
                  >
                    <CheckCircle2 size={18} className="text-[#00F5A0]" />
                    <span>
                      Campaign <strong>"{campaignName}"</strong> has been queued for dispatch to {audienceGroup}!
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column: Live Mobile Preview & Rules Inspector */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Smartphone Mockup */}
              <div className="bg-[#0E141B] border border-[#1E2B37] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-zinc-400 uppercase flex items-center gap-2">
                    <Smartphone size={14} className="text-[#00F5A0]" /> Live Message Preview
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141C24] text-zinc-300 border border-[#1E2B37]">
                    Sender: WE-PUBLC
                  </span>
                </div>

                {/* Device Frame */}
                <div className="bg-[#080B0E] border-2 border-[#1E2B37] rounded-3xl p-5 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono pb-3 border-b border-[#1E2B37] mb-4">
                    <span>9:41 AM</span>
                    <span>5G • 100%</span>
                  </div>

                  {/* Bubble */}
                  <div className="bg-[#141C24] border border-[#1E2B37] rounded-2xl p-4 text-xs text-zinc-200 leading-relaxed space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono border-b border-[#1E2B37] pb-1.5">
                      <span className="font-semibold text-white">we Publicise</span>
                      <span className="text-[#00F5A0]">Official</span>
                    </div>
                    <p className="text-sm font-sans text-white">{selectedTemplate?.sampleText}</p>
                    <div className="text-[9px] text-zinc-500 text-right pt-1 font-mono">10:28 AM • SMS / WhatsApp</div>
                  </div>

                  {/* Metadata Tag */}
                  <div className="mt-4 pt-4 border-t border-[#1E2B37] space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Template ID:</span>
                      <span className="text-white">{selectedTemplate?.id}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Category:</span>
                      <span className="text-[#00F5A0] uppercase font-semibold">
                        {selectedTemplate?.category.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Pricing Tier:</span>
                      <span className="text-zinc-300">{selectedTemplate?.pricingTier}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architectural Guard Summary */}
              <div className="bg-[#0E141B] border border-[#1E2B37] rounded-2xl p-6 space-y-3">
                <h4 className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#00F5A0]" />
                  Campaign Safety Protocol
                </h4>
                <ul className="text-xs text-zinc-400 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0] mt-1.5 shrink-0"></span>
                    <span><strong>No OTP in Broadcasts:</strong> Prevents unauthorized batching of temporary security credentials.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0] mt-1.5 shrink-0"></span>
                    <span><strong>Divided Utilities:</strong> Scheduled alerts (reminders, billing) stay in Campaigns; instant receipts stay in the API.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0] mt-1.5 shrink-0"></span>
                    <span><strong>Meta / DLT Compliance:</strong> Prevents message rejection and carrier account penalties.</span>
                  </li>
                </ul>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: API & WEBHOOK GATEWAY */}
        {activeTab === 'api' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: API Credentials & Template Switcher */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* API Key Box */}
              <div className="bg-[#0E141B] border border-[#1E2B37] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <Key size={14} className="text-[#7C3AED]" /> Live Project API Key
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E1035] text-[#A78BFA] border border-[#7C3AED]/40">
                    Bearer Auth
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  Your master key authorizes all real-time programmatic dispatches. It stays identical across all OTP & utility templates.
                </p>

                <div className="flex items-center gap-2 bg-[#080B0E] border border-[#1E2B37] rounded-xl px-4 py-3">
                  <code className="text-sm font-mono text-[#00F5A0] flex-1 truncate">{apiKey}</code>
                  <button
                    onClick={handleCopyKey}
                    className="p-1.5 rounded-lg bg-[#141C24] hover:bg-[#1E2B37] text-zinc-300 transition-colors shrink-0"
                    title="Copy API Key"
                  >
                    {copiedKey ? <Check size={16} className="text-[#00F5A0]" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Template Picker for API Dispatch */}
              <div className="bg-[#0E141B] border border-[#1E2B37] rounded-2xl p-6 space-y-5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Step 1 • Select Trigger Template
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  The API key tells the server <em>who you are</em>. The <code className="text-[#00F5A0]">template_id</code> parameter in the payload tells the server <em>which OTP or notification to send</em>.
                </p>

                <div className="space-y-3">
                  {templatesData
                    .filter((t) => t.category === 'authentication' || t.category === 'transactional_utility')
                    .map((tpl) => {
                      const isSelected = selectedApiTemplate === tpl.id;
                      return (
                        <div
                          key={tpl.id}
                          onClick={() => setSelectedApiTemplate(tpl.id)}
                          className={`cursor-pointer p-4 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-[#141C24] border-[#7C3AED] ring-1 ring-[#7C3AED]'
                              : 'bg-[#080B0E] border-[#1E2B37] hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                              {tpl.category === 'authentication' ? (
                                <Lock size={13} className="text-[#00F5A0]" />
                              ) : (
                                <Bell size={13} className="text-[#7C3AED]" />
                              )}
                              {tpl.id}
                            </span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                tpl.category === 'authentication'
                                  ? 'bg-[#0D2A26] border-[#00F5A0]/40 text-[#00F5A0]'
                                  : 'bg-[#1E1035] border-[#7C3AED]/40 text-[#A78BFA]'
                              }`}
                            >
                              {tpl.category === 'authentication' ? 'OTP VERIFICATION' : 'TRANSACTIONAL UTILITY'}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-zinc-200">{tpl.name}</p>
                          <p className="text-xs text-zinc-400 mt-1 font-sans">{tpl.sampleText}</p>
                        </div>
                      );
                    })}
                </div>

                {/* Quick Simulation Input */}
                <div className="pt-2 border-t border-[#1E2B37] space-y-4">
                  <h4 className="text-xs font-mono uppercase text-zinc-400">Interactive Simulation Input</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-500 uppercase mb-1">
                        Recipient Mobile
                      </label>
                      <input
                        type="text"
                        value={simulatedMobile}
                        onChange={(e) => setSimulatedMobile(e.target.value)}
                        className="w-full bg-[#080B0E] border border-[#1E2B37] focus:border-[#7C3AED] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    {selectedApiTemplate.includes('AUTH') && (
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-500 uppercase mb-1">
                          Generated OTP (Server Generated)
                        </label>
                        <input
                          type="text"
                          value={simulatedOtp}
                          onChange={(e) => setSimulatedOtp(e.target.value)}
                          className="w-full bg-[#080B0E] border border-[#1E2B37] focus:border-[#00F5A0] rounded-xl px-3 py-2 text-xs text-[#00F5A0] font-mono focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  <LiquidButton
                    onClick={handleTriggerApiSimulation}
                    className="w-full justify-center bg-[#7C3AED] border-[#7C3AED] text-white font-bold"
                  >
                    <span className="flex items-center gap-2">
                      <Zap size={16} /> Simulate Real-time API Dispatch
                    </span>
                  </LiquidButton>

                  {apiSimulationSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-[#1E1035] border border-[#7C3AED] flex items-center gap-3 text-xs text-white"
                    >
                      <CheckCircle2 size={16} className="text-[#00F5A0]" />
                      <span>
                        Simulated API dispatch to <strong>{simulatedMobile}</strong> with template{' '}
                        <code className="text-[#00F5A0]">{selectedApiTemplate}</code> delivered in 1.4s!
                      </span>
                    </motion.div>
                  )}
                </div>

              </div>
            </div>

            {/* Right Column: Code Snippet & Dispatch Architecture */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Code Snippet */}
              <div className="bg-[#0E141B] border border-[#1E2B37] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-2">
                    <Terminal size={14} className="text-[#00F5A0]" /> Generated API Request
                  </h4>
                  <button
                    onClick={handleCopyCurl}
                    className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedCurl ? (
                      <>
                        <Check size={14} className="text-[#00F5A0]" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy cURL
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-[#080B0E] border border-[#1E2B37] rounded-xl p-4 overflow-x-auto text-xs font-mono text-zinc-300">
                  <pre className="whitespace-pre">{curlCode}</pre>
                </div>

                <div className="mt-4 pt-4 border-t border-[#1E2B37] text-xs text-zinc-400 space-y-2">
                  <p className="font-semibold text-white">How the server chooses the template:</p>
                  <p className="leading-relaxed">
                    1. <code className="text-[#7C3AED]">Authorization: Bearer</code> verifies your identity & permissions.
                  </p>
                  <p className="leading-relaxed">
                    2. <code className="text-[#00F5A0]">"template_id": "{selectedApiTemplate}"</code> specifies whether to deliver OTP Template 1, OTP Template 2, or Transactional Utility.
                  </p>
                </div>
              </div>

              {/* Delivery Architecture Card */}
              <div className="bg-[#0E141B] border border-[#1E2B37] rounded-2xl p-6 space-y-3">
                <h4 className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-2">
                  <Clock size={14} className="text-[#00F5A0]" />
                  Synchronous SLA & Delivery
                </h4>
                <div className="space-y-2 text-xs text-zinc-400 leading-relaxed font-mono">
                  <div className="flex justify-between py-1.5 border-b border-[#1E2B37]">
                    <span>Dispatch Latency:</span>
                    <span className="text-[#00F5A0] font-bold">&lt; 2.1 Seconds</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#1E2B37]">
                    <span>OTP Expiry Window:</span>
                    <span className="text-white">300 Seconds (5 Mins)</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Retry Fallback:</span>
                    <span className="text-white">Voice OTP / WhatsApp</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 3: TEMPLATE REGISTRY & MATRIX */}
        {activeTab === 'registry' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-[#0E141B] border border-[#1E2B37] rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Approved Template Master Registry</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Complete routing table showing allowed dispatch mechanisms and carrier classifications.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-lg bg-[#080B0E] border border-[#1E2B37] text-zinc-300">
                    Total: {templatesData.length} Templates
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#080B0E] border-b border-[#1E2B37] text-zinc-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Template ID & Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Allowed Channel</th>
                      <th className="py-3 px-4">Sample Template Content</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2B37]">
                    {templatesData.map((tpl) => (
                      <tr key={tpl.id} className="hover:bg-[#141C24]/50 transition-colors">
                        <td className="py-4 px-4 font-mono font-medium text-white">
                          <div>{tpl.id}</div>
                          <div className="text-[11px] text-zinc-400 font-sans mt-0.5">{tpl.name}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono border ${
                              tpl.category === 'authentication'
                                ? 'bg-[#0D2A26] border-[#00F5A0]/40 text-[#00F5A0]'
                                : tpl.category === 'scheduled_utility'
                                ? 'bg-[#141C24] border-[#39bda7]/40 text-[#39bda7]'
                                : tpl.category === 'transactional_utility'
                                ? 'bg-[#1E1035] border-[#7C3AED]/40 text-[#A78BFA]'
                                : 'bg-[#141C24] border-zinc-700 text-zinc-300'
                            }`}
                          >
                            {tpl.category.toUpperCase().replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono">
                          {tpl.channel === 'api_only' && (
                            <span className="text-[#00F5A0] font-semibold flex items-center gap-1.5">
                              <Terminal size={13} /> Direct API Only
                            </span>
                          )}
                          {tpl.channel === 'campaign_only' && (
                            <span className="text-zinc-300 flex items-center gap-1.5">
                              <Send size={13} /> Campaign Only
                            </span>
                          )}
                          {tpl.channel === 'both' && (
                            <span className="text-[#39bda7] flex items-center gap-1.5">
                              <Layers size={13} /> API & Campaign
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-zinc-300 max-w-sm font-sans leading-relaxed">
                          "{tpl.sampleText}"
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#00F5A0]">
                            <CheckCircle2 size={12} /> {tpl.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </PageWrapper>
  );
};

export default Dashboard;
