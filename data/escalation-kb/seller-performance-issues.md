# Seller Performance Issues — Tier 1 Agent Guide

**Document Type:** Internal SOP
**Audience:** Tier 1 Support Agents
**Last Updated:** 2026-10-01
**Version:** 2.5

---

## Purpose

Guide for Tier 1 agents to identify, document, and act on seller performance issues. Tier 1 does not set policy but plays a critical role in detecting and logging issues for the Seller Performance team.

---

## Seller Performance Metrics Overview

| Metric | Minimum Threshold | Measured Over |
|--------|-------------------|---------------|
| Order Defect Rate (ODR) | < 2.0% | 90 days |
| Cancellation Rate | < 2.5% | 30 days |
| Late Shipment Rate | < 4.0% | 30 days |
| Valid Tracking Rate | > 95% | 30 days |
| On-Time Delivery | > 90% | 30 days |

**Any metric below threshold → Seller enters Performance Review status.**

---

## Step 1: Detecting Performance Issues

Agents encounter seller performance issues through three channels:

**Channel A: Buyer Complaints**
1. Buyer reports an issue with a seller.
2. Follow the relevant SOP (INR, INAD) to resolve the buyer's immediate issue.
3. After resolution, check the seller's performance dashboard in OMS.

**Channel B: System Alerts**
1. OMS auto-generates alerts when a seller crosses a performance threshold.
2. Alerts appear in the Seller Performance Queue.
3. Review and determine if Tier 1 action is needed.

**Channel C: Pattern Detection**
1. While working cases, notice patterns (same seller in multiple cases).
2. Search OMS for seller's recent case history (last 30 days).
3. If 3+ cases involving the same seller in 30 days → Log a Pattern Alert.

---

## Step 2: Reviewing Seller Performance

1. Open OMS → Seller Search → Enter seller ID or store name.
2. Navigate to the Performance tab.
3. Review all five metrics and recent case history.

**All metrics above threshold:** No action needed. Log complaint for trend tracking. Close: SP-MONITORING.

**One metric below threshold (first time):** Send Performance Warning Notice (template: SP-WARN-01). Log warning. Set 30-day follow-up. Close: SP-WARNING-ISSUED.

**Multiple metrics below threshold OR same metric repeatedly below:** **Escalation Trigger: Repeated Performance Failure** → Escalate to Tier 2. Do NOT restrict seller at Tier 1.

**ODR > 5.0% OR Cancellation Rate > 10%:** **Escalation Trigger: Critical Performance Failure** → Escalate to Tier 2 URGENT. Do not inform seller of potential suspension.

---

## Step 3: Common Seller Performance Issues

### Issue A: High Cancellation Rate
- If cancellations due to inventory → Send inventory advisory (SP-INV-01).
- If cancellations due to pricing errors → Send pricing advisory (SP-PRICE-01).
- If cancellations have no reason logged → Send warning notice (SP-WARN-01).
- If cancellation rate > 10% → **Escalation Trigger:** Escalate to Tier 2.

### Issue B: High Late Shipment Rate
- Send shipping performance advisory (SP-SHIP-01).
- Recommend seller update handling time settings if unrealistic.
- If late shipment rate > 10% → **Escalation Trigger:** Escalate to Tier 2.

### Issue C: Low Valid Tracking Rate
- If tracking simply not uploaded → Send tracking requirement advisory (SP-TRACK-01).
- If seller using unsupported carrier → Send carrier integration advisory (SP-CARRIER-01).
- If invalid/fake tracking numbers confirmed → **Escalation Trigger: Potential Fraud** → Escalate to Tier 2 immediately.

### Issue D: High Order Defect Rate (ODR)
- If INAD claims primarily "condition mismatch" → Send listing accuracy advisory (SP-LIST-01).
- If INAD claims primarily "wrong item" → Send fulfillment accuracy advisory (SP-FULFILL-01).
- If chargebacks are significant → **Escalation Trigger: Chargeback Pattern** → Escalate to Tier 2.
- If ODR > 5% → **Escalation Trigger: Critical ODR** → Escalate to Tier 2 URGENT.

### Issue E: Counterfeit/Inauthentic Claims
- ANY counterfeit claim → Escalate to Tier 2 Counterfeit team (follow INAD SOP).
- 2+ counterfeit claims in 90 days → **Escalation Trigger: Serial Counterfeit Risk** → Escalate to Tier 2 URGENT.
- Do NOT communicate with seller about counterfeit investigations at Tier 1.

---

## Step 4: Documenting Seller Performance Issues

All seller performance actions must be documented in OMS Seller Record → Performance Notes:
- Date and agent ID
- Triggering event
- Metrics reviewed (current values)
- Action taken and template used
- Follow-up date (if applicable)

---

## Step 5: Seller Communication Standards

1. **Use approved templates only** — Do not freelance performance communications.
2. **Be professional and specific** — Reference the metric, timeframe, and expected improvement.
3. **Do not threaten** — Never say "you will be banned." Only Tier 2/3 can make those determinations.
4. **Do not reveal internal thresholds** — State "performance is below our minimum standards."
5. **Offer resources** — Direct sellers to Seller Performance Help Center and Seller Academy.

---

## Escalation Triggers Summary

**Escalate to Tier 2 (Standard):**
- Multiple metrics below threshold
- Same metric below threshold repeatedly
- Cancellation rate > 10%
- Late shipment rate > 10%
- Chargeback pattern detected
- Seller requests performance review or disputes a strike

**Escalate to Tier 2 (URGENT):**
- ODR > 5.0%
- Invalid/fake tracking numbers confirmed
- 2+ counterfeit claims in 90 days
- Seller conduct violation (harassment, threats, abuse)

**Escalate to Tier 3 (via Tier 2):**
- Seller threatens legal action regarding performance
- Seller is top-volume (> $1M annual GMV) with performance issues
- Media or public attention on a seller's performance
- Pattern suggests systemic platform issue
