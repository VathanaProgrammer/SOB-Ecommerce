# load_test.py
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
import time
import random
import threading

# CONFIGURE THESE
TARGET_URL = "http://localhost:8000/login"   # <-- change only if you own/are allowed to test the server
TOTAL_REQUESTS = 100
CONCURRENCY = 20             # number of worker threads
MAX_RETRIES = 3
MIN_DELAY = 0.01             # minimum random delay between requests (seconds)
MAX_DELAY = 0.05             # maximum random delay between requests (seconds)

# payload to send (form data). Use only for your own test server.
PAYLOAD = {
    "_token": "uNocT6h78Le7vP8yIZQ6Fm9ETKzGIkIPzYCtbMBo",
    "username": "admin@sob.com",
    "password": "123456",
    "remember": "on"
}

# simple counters for stats
lock = threading.Lock()
stats = {"success": 0, "fail": 0, "status_codes": {}}

def send_request(session: requests.Session, payload: dict, attempt=1):
    """
    Send a single POST request with retries and exponential backoff.
    Returns tuple (ok: bool, status_code: int or None)
    """
    try:
        resp = session.post(TARGET_URL, data=payload, timeout=10)
        code = resp.status_code
        ok = 200 <= code < 300
        return ok, code
    except requests.RequestException as e:
        if attempt <= MAX_RETRIES:
            backoff = 0.5 * (2 ** (attempt - 1)) + random.random() * 0.1
            time.sleep(backoff)
            return send_request(session, payload, attempt + 1)
        return False, None

def worker(task_id):
    """
    Worker that sends one request (used by executor)
    """
    # Each thread gets its own session for connection reuse
    session = requests.Session()
    # random short delay to avoid synchronized bursts
    time.sleep(random.uniform(MIN_DELAY, MAX_DELAY))

    ok, code = send_request(session, PAYLOAD)
    with lock:
        if ok:
            stats["success"] += 1
        else:
            stats["fail"] += 1
        stats["status_codes"].setdefault(code, 0)
        stats["status_codes"][code] += 1
    return ok, code

def main():
    print(f"Starting load test -> {TOTAL_REQUESTS} requests, concurrency={CONCURRENCY}")
    start = time.time()
    tasks = []

    with ThreadPoolExecutor(max_workers=CONCURRENCY) as exe:
        futures = [exe.submit(worker, i) for i in range(TOTAL_REQUESTS)]
        for future in as_completed(futures):
            try:
                ok, code = future.result()
            except Exception as e:
                with lock:
                    stats["fail"] += 1
                # continue
    elapsed = time.time() - start
    print("Done.")
    print(f"Time: {elapsed:.2f}s")
    print(f"Success: {stats['success']}, Fail: {stats['fail']}")
    print("Status codes breakdown:")
    for k, v in sorted(stats["status_codes"].items(), key=lambda x: (str(x[0]))):
        print(f"  {k!s}: {v}")

if __name__ == "__main__":
    main()
