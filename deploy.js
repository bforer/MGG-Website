import FtpDeploy from "ftp-deploy";
import dotenv from "dotenv";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Determine which environment to deploy to
const environment = process.argv[2] || "temp"; // 'temp' or 'prod'

const config = {
	user:
		environment === "prod"
			? process.env.FTP_PROD_USER || process.env.FTP_USER
			: process.env.FTP_USER,
	password:
		environment === "prod"
			? process.env.FTP_PROD_PASSWORD || process.env.FTP_PASSWORD
			: process.env.FTP_PASSWORD,
	host:
		environment === "prod"
			? process.env.FTP_PROD_HOST || process.env.FTP_HOST
			: process.env.FTP_HOST,
	port:
		environment === "prod"
			? parseInt(process.env.FTP_PROD_PORT || process.env.FTP_PORT || "21")
			: parseInt(process.env.FTP_PORT || "21"),
	localRoot: join(__dirname, "dist"),
	remoteRoot:
		environment === "prod"
			? process.env.FTP_PROD_REMOTE_DIR || process.env.FTP_REMOTE_DIR
			: process.env.FTP_REMOTE_DIR,
	include: ["*", "**/*", ".htaccess", "**/.htaccess"],
	exclude: ["node_modules/**", ".git/**", ".env*", "*.log"],
	// Explicitly include .htaccess for 404 page configuration
	deleteRemote: false, // Don't delete remote files - only upload changed/new files
	// This makes ftp-deploy only upload files that have changed (different size or modification time)
	forcePasv: true, // Force passive mode for FTP
	sftp:
		(environment === "prod"
			? process.env.FTP_PROD_SECURE === "true"
			: process.env.FTP_SECURE === "true") || false,
	// Additional FTP connection options for timeout issues
	connTimeout: 10000, // Connection timeout in milliseconds
	pasvTimeout: 10000, // Passive mode timeout
	keepalive: 10000 // Keep connection alive
};

// Validate required environment variables
const requiredVars = ["user", "password", "host", "remoteRoot"];
const missing = requiredVars.filter(key => !config[key]);

if (missing.length > 0) {
	console.error(`❌ Missing required FTP configuration: ${missing.join(", ")}`);
	console.error("Please check your .env file.");
	process.exit(1);
}

console.log(
	`🚀 Deploying to ${
		environment === "prod" ? "PRODUCTION" : "TEMPORARY"
	} environment...`
);
console.log(`📤 Host: ${config.host}`);
console.log(`📁 Remote directory: ${config.remoteRoot}`);

const ftpDeploy = new FtpDeploy();

// Track upload statistics
let filesToUpload = 0;
let filesSkipped = 0;
let filesUploaded = 0;

// Add event listeners for verbose output
ftpDeploy.on("uploading", data => {
	filesToUpload = data.totalFileCount || 0;
	console.log(
		`📤 Uploading: ${data.filename} (${data.transferredFileCount}/${data.totalFileCount})`
	);
});

ftpDeploy.on("uploaded", data => {
	filesUploaded++;
	console.log(`✅ Uploaded: ${data.filename}`);
});

ftpDeploy.on("log", data => {
	// Only show important log messages, skip verbose connection details
	if (
		typeof data === "string" &&
		!data.includes("Connected") &&
		!data.includes("Server message")
	) {
		console.log(`ℹ️  ${data}`);
	}
});

ftpDeploy
	.deploy(config)
	.then(res => {
		console.log("\n✅ Deployment completed successfully!");
		console.log(`📊 Summary:`);
		console.log(`   • Files uploaded: ${res.length}`);
		console.log(
			`   • Files skipped (unchanged): ${filesToUpload - res.length}`
		);
		console.log(`   • Total files checked: ${filesToUpload || res.length}`);

		if (res.length > 0) {
			console.log("\n📋 Files uploaded (changed or new):");
			res.slice(0, 20).forEach((file, index) => {
				console.log(`   ${index + 1}. ${file}`);
			});
			if (res.length > 20) {
				console.log(`   ... and ${res.length - 20} more files`);
			}
		} else {
			console.log("\n✨ No files needed uploading - everything is up to date!");
		}
	})
	.catch(err => {
		console.error("❌ Deployment failed:", err);
		process.exit(1);
	});
