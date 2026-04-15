#!/usr/bin/env python3
"""Signal Morning Launch — Start server + open Chrome at 8 AM"""
import subprocess, time, os, sys

PORT = 8081
BASEDIR = '/Users/mikerodgers/Desktop/Startup-Intelligence-OS/signal'

# Kill stale servers
subprocess.run(f'lsof -ti :{PORT} | xargs kill -9 2>/dev/null', shell=True, capture_output=True)
time.sleep(1)

# Start server
env = dict(os.environ, PORT=str(PORT))
proc = subprocess.Popen(
    [f'{BASEDIR}/backend/server'],
    cwd=f'{BASEDIR}/backend',
    env=env,
    stdout=open(f'{BASEDIR}/runs/server.log', 'a'),
    stderr=subprocess.STDOUT,
)

# Wait for health
for i in range(20):
    time.sleep(1)
    try:
        import urllib.request
        urllib.request.urlopen(f'http://localhost:{PORT}/health', timeout=2)
        break
    except Exception:
        pass

# Open Chrome
url = f'http://localhost:{PORT}'
subprocess.run(['open', '-a', 'Google Chrome', url], capture_output=True)

print(f'SIGNAL LIVE at {url} (PID {proc.pid})')
