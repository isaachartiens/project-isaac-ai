#!/usr/bin/env node
/**
 * Generates 500 synthetic CX support tickets for the Analytics Bot demo.
 * Output: data/analytics/tickets.json
 */

const fs = require('fs');
const path = require('path');

// ─── Config ───────────────────────────────────────────────────────────────────

const TOTAL = 500;
const DAYS_BACK = 90;

const AGENTS = ['Dan', 'Mike', 'Patrick', 'Felicia', 'Annie', 'Bob', 'Penny', 'Leticia', 'Jose', 'Felipe', 'Ryan', 'Mark', 'Patricia', 'Steven'];
const TEAMS = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];
const CHANNELS = ['chat', 'phone', 'email'];
const REGIONS = ['US', 'UK', 'DE', 'AU', 'CA'];
const SELLER_TIERS = ['below_standard', 'standard', 'top_rated'];
const SENTIMENTS = ['positive', 'neutral', 'negative'];

const CONTACT_REASONS = [
  'item_not_received',
  'item_not_as_described',
  'return_request',
  'payment_issue',
  'account_access',
  'policy_question',
  'shipping_delay',
  'feedback',
  'cancellation_request',
  'refund_status'
];

const ISSUE_CATEGORIES = {
  item_not_received: 'shipping',
  item_not_as_described: 'product',
  return_request: 'returns',
  payment_issue: 'billing',
  account_access: 'account',
  policy_question: 'policy',
  shipping_delay: 'shipping',
  feedback: 'general',
  cancellation_request: 'orders',
  refund_status: 'billing'
};

const RESOLUTION_TYPES = [
  'refund_issued',
  'replacement_sent',
  'account_restored',
  'policy_explained',
  'case_opened',
  'escalated_to_tier2',
  'no_action_required',
  'tracking_provided',
  'credit_applied',
  'return_label_sent'
];

const ESCALATION_REASONS = [
  'fraud_suspected',
  'buyer_seller_dispute',
  'high_value_item',
  'repeat_contact',
  'policy_exception_needed',
  'legal_threat',
  'vip_seller',
  'system_error'
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedPick(arr, weights) {
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < arr.length; i++) {
    r -= weights[i];
    if (r <= 0) return arr[i];
  }
  return arr[arr.length - 1];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(daysBack) {
  const now = new Date();
  const past = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  const t = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(t).toISOString().split('T')[0];
}

function pad(n, width = 4) {
  return String(n).padStart(width, '0');
}

// ─── Generate ─────────────────────────────────────────────────────────────────

function generateTicket(index) {
  const contact_reason = weightedPick(CONTACT_REASONS, [
    18, // item_not_received — most common
    14, // item_not_as_described
    16, // return_request
    10, // payment_issue
    8,  // account_access
    6,  // policy_question
    12, // shipping_delay
    4,  // feedback
    6,  // cancellation_request
    6   // refund_status
  ]);

  const channel = weightedPick(CHANNELS, [45, 35, 20]); // chat > phone > email
  const seller_tier = weightedPick(SELLER_TIERS, [10, 55, 35]);
  const region = weightedPick(REGIONS, [50, 20, 10, 10, 10]);

  // Handle time varies by channel and reason
  const baseHandle = channel === 'phone' ? 12 : channel === 'chat' ? 8 : 6;
  const reasonMultiplier = ['item_not_as_described', 'return_request', 'payment_issue'].includes(contact_reason) ? 1.5 : 1;
  const handle_time_mins = Math.max(2, Math.round((baseHandle + randomInt(-3, 8)) * reasonMultiplier));

  // FCR is harder for complex issues
  const complexIssues = ['item_not_as_described', 'payment_issue', 'account_access'];
  const fcrBase = complexIssues.includes(contact_reason) ? 0.6 : 0.78;
  const first_contact_resolution = Math.random() < fcrBase;

  // Escalation — more likely for complex issues and non-FCR
  const escalationChance = first_contact_resolution ? 0.05 : 0.25;
  const escalated = Math.random() < escalationChance;
  const escalation_reason = escalated ? pick(ESCALATION_REASONS) : null;

  // CSAT correlates with FCR and handle time
  let csatBase = first_contact_resolution ? 4.2 : 3.1;
  if (handle_time_mins > 20) csatBase -= 0.4;
  if (escalated) csatBase -= 0.5;
  const csat = Math.min(5, Math.max(1, Math.round(csatBase + (Math.random() - 0.5) * 2)));

  // Sentiment correlates with CSAT
  const sentiment = csat >= 4 ? weightedPick(SENTIMENTS, [70, 25, 5])
    : csat === 3 ? weightedPick(SENTIMENTS, [20, 55, 25])
    : weightedPick(SENTIMENTS, [5, 30, 65]);

  // Resolution type
  const resolution_type = escalated
    ? 'escalated_to_tier2'
    : pick(RESOLUTION_TYPES.filter(r => r !== 'escalated_to_tier2'));

  // Agent assignment — some agents handle more volume
  const agent_name = pick(AGENTS);
  const team = pick(TEAMS);

  // Agent ID derived from name for consistency
  const agent_id = `AGT-${pad(AGENTS.indexOf(agent_name) + 1, 3)}`;

  return {
    ticket_id: `TKT-${pad(index + 1)}`,
    date: randomDate(DAYS_BACK),
    channel,
    contact_reason,
    issue_category: ISSUE_CATEGORIES[contact_reason],
    handle_time_mins,
    csat,
    first_contact_resolution,
    escalated,
    escalation_reason,
    seller_tier,
    resolution_type,
    sentiment,
    agent_name,
    agent_id,
    team,
    region
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const tickets = Array.from({ length: TOTAL }, (_, i) => generateTicket(i));

// Sort by date for realism
tickets.sort((a, b) => new Date(a.date) - new Date(b.date));

const outPath = path.join(__dirname, '../data/analytics/tickets.json');
fs.writeFileSync(outPath, JSON.stringify(tickets, null, 2));

// ─── Summary ─────────────────────────────────────────────────────────────────

const total = tickets.length;
const escalated = tickets.filter(t => t.escalated).length;
const fcr = tickets.filter(t => t.first_contact_resolution).length;
const avgCsat = (tickets.reduce((s, t) => s + t.csat, 0) / total).toFixed(2);
const avgHandle = (tickets.reduce((s, t) => s + t.handle_time_mins, 0) / total).toFixed(1);

console.log(`\n✅ Generated ${total} tickets → data/analytics/tickets.json\n`);
console.log(`📊 Quick stats:`);
console.log(`   CSAT avg:         ${avgCsat}/5`);
console.log(`   FCR rate:         ${((fcr/total)*100).toFixed(1)}%`);
console.log(`   Escalation rate:  ${((escalated/total)*100).toFixed(1)}%`);
console.log(`   Avg handle time:  ${avgHandle} mins`);
console.log(`   Date range:       last ${DAYS_BACK} days`);
console.log(`   Agents:           ${AGENTS.length} (${AGENTS.join(', ')})`);
console.log(`   Teams:            ${TEAMS.join(', ')}\n`);
