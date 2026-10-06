# Analytics Dataset

Place your synthetic ticket data here as `tickets.json`.

## Expected schema (500 records minimum)
```json
{
  "ticket_id": "TKT-0001",
  "date": "2024-10-15",
  "channel": "chat",
  "contact_reason": "item_not_received",
  "issue_category": "shipping",
  "handle_time_mins": 12,
  "csat": 4,
  "first_contact_resolution": true,
  "escalated": false,
  "escalation_reason": null,
  "seller_tier": "top_rated",
  "resolution_type": "refund_issued",
  "sentiment": "neutral",
  "agent_id": "AGT-042",
  "region": "US"
}
```

## Field values
- channel: chat | phone | email
- contact_reason: item_not_received | item_not_as_described | return_request | payment_issue | account_access | policy_question | shipping_delay | feedback
- seller_tier: below_standard | standard | top_rated
- sentiment: positive | neutral | negative
- csat: 1-5
- region: US | UK | DE | AU | CA
