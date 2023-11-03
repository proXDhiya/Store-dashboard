const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const { Resource } = require("@opentelemetry/resources");
const opentelemetry = require("@opentelemetry/sdk-node");
const {
  BasicTracerProvider,
  SimpleSpanProcessor,
} = require("@opentelemetry/tracing");

// Resource name
const provider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME || 'backend',
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION || '1.0.0'
  }),
});

// Zipkin exporter
const exporter = new ZipkinExporter({
  url: process.env.ZIPKIN_URL || 'http://localhost:9411/api/v2/spans',
  serviceName: process.env.SERVICE_NAME || 'backend',
});

// export spans to opentelemetry collector
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

// register the tracer
provider.register();

const sdk = new opentelemetry.NodeSDK({
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start()

process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("Tracing terminated"))
    .catch((error) => console.log("Error terminating tracing", error))
    .finally(() => process.exit(0));
});
