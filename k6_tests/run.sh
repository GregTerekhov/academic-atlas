GRAFANA_PORT=3001
GRAFANA_DASHBOARD_URL="http://localhost:$GRAFANA_PORT/d/k6/k6-load-testing-results"
TEST_FILES=("/tests/load_test.js" "/tests/scenario_test.js" "/tests/soak_test.js" "/tests/spike_test.js" "/tests/stress_test.js")

cd ..
echo "Building Docker container for Next.js..."
sudo docker build -t local/nextjs:latest .
if [ $? -ne 0 ]; then
    echo "Error building Docker container for Next.js"
    exit 1
fi
cd k6_tests

# Start Docker Compose for InfluxDB and Grafana
echo "Starting InfluxDB and Grafana..."
sudo docker compose up -d influxdb grafana nextjs
if [ $? -ne 0 ]; then
    echo "Error starting InfluxDB or Grafana"
    exit 1
fi


# Wait for the project to start up
sleep 10

# Display information about the Grafana dashboard
echo "--------------------------------------------------------------------------------------"
echo "Load testing with Grafana dashboard $GRAFANA_DASHBOARD_URL"
echo "--------------------------------------------------------------------------------------"

# Run K6 tests
for TEST_FILE in "${TEST_FILES[@]}"; do
    echo "Running $TEST_FILE..."
    sudo docker compose run --rm k6 run "$TEST_FILE"
    if [ $? -ne 0 ]; then
        echo "Error running test $TEST_FILE"
        exit 1
    fi
done

# Stop the project
echo "Stopping the project..."
kill $PROJECT_PID
