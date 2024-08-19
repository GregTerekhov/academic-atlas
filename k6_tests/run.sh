GRAFANA_PORT=3001
GRAFANA_DASHBOARD_URL="http://localhost:$GRAFANA_PORT/d/k6/k6-load-testing-results"
TEST_FILES=("/tests/load_test.js" "/tests/scenario_test.js" "/tests/soak_test.js" "/tests/spike_test.js" "/tests/stress_test.js")

# Start Docker Compose for InfluxDB and Grafana
echo "Starting InfluxDB and Grafana..."
sudo docker compose up -d influxdb grafana
if [ $? -ne 0 ]; then
    echo "Error starting InfluxDB or Grafana"
    exit 1
fi

# Install dependencies and build the project
echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error installing dependencies"
    exit 1
fi

echo "Building the project..."
npm run build
if [ $? -ne 0 ]; then
    echo "Error building the project"
    exit 1
fi

# Start the project in the background
echo "Starting the project..."
npm run start &
PROJECT_PID=$!
if [ $? -ne 0 ]; then
    echo "Error starting the project"
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