#!/bin/bash
# SIGNAL — Start Server + Open Browser
# Usage: ./start.sh [port]
set -e

PORT="${1:-8081}"
DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND="$DIR/backend"
FRONTEND="$DIR/frontend"

# Kill anything on our port
lsof -ti :$PORT | xargs kill -9 2>/dev/null || true
sleep 1

# Build if needed
if [ ! -f "$BACKEND/server" ] || [ "$BACKEND/main.go" -nt "$BACKEND/server" ]; then
    echo "Building Signal server..."
    cd "$BACKEND"
    go build -o server main.go
    echo "Build complete."
fi

# Start server
echo "Starting Signal on port $PORT..."
cd "$BACKEND"
PORT=$PORT ./server &
SERVER_PID=$!
echo "Server PID: $SERVER_PID"

# Wait for health check
echo "Waiting for server..."
for i in $(seq 1 15); do
    if curl -s "http://localhost:$PORT/health" > /dev/null 2>&1; then
        echo "Server is healthy."
        break
    fi
    sleep 1
done

# Open browser
URL="http://localhost:$PORT"
echo "Opening $URL in Chrome..."
open -a "Google Chrome" "$URL" 2>/dev/null || open "$URL" 2>/dev/null || echo "Open this URL: $URL"

echo ""
echo "═══════════════════════════════════════════"
echo "  SIGNAL IS LIVE"
echo "  URL: $URL"
echo "  PID: $SERVER_PID"
echo "  Frontend: $FRONTEND"
echo "  Backend:  $BACKEND"
echo "  API:      http://localhost:$PORT/v1/"
echo ""
echo "  To stop: kill $SERVER_PID"
echo "═══════════════════════════════════════════"
