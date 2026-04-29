"""
Create leads and quotes tables in Supabase.
We use the REST API with the anon key to insert/query.
Tables must be created via the Supabase dashboard SQL editor or via service_role.
This script tests the connection and verifies table existence.
"""
import requests, json

SUPABASE_URL = "https://nuctewfojowestxvmeuk.supabase.co"
ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Y3Rld2Zvam93ZXN0eHZtZXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMzMzNjcsImV4cCI6MjA5MjcwOTM2N30.Qsd_ZlQnhNGVL15Sl4_LuhyTE5m5uwWuKgeQVn2nG-8"

headers = {
    "apikey": ANON_KEY,
    "Authorization": f"Bearer {ANON_KEY}",
    "Content-Type": "application/json",
}

# Test: try to read from leads table
r = requests.get(f"{SUPABASE_URL}/rest/v1/leads?limit=1", headers=headers)
print(f"leads table check: {r.status_code} — {r.text[:200]}")

r2 = requests.get(f"{SUPABASE_URL}/rest/v1/quotes?limit=1", headers=headers)
print(f"quotes table check: {r2.status_code} — {r2.text[:200]}")
