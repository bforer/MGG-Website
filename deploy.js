import FtpDeploy from "ftp-deploy";
import dotenv from "dotenv";
import {fileURLToPath} from "url";
import {dirname, join} from "path";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ftpDeploy = new FtpDeploy();

const config = {
	user: process.env.FTP_USER,
	password: process.env.FTP_PASSWORD,
	host: process.env.FTP_HOST,
	port: parseInt(process.env.FTP_PORT || "21"),
	localRoot: join(__dirname, "dist"),
	remoteRoot: "/public_html/mgg/",
	include: ["*", "**/*"],
	exclude: ["node_modules/**", ".git/**", ".env", "*.log"],
	deleteRemote: false, // Set to true if you want to delete files on remote that don't exist locally
	forcePasv: true,
	sftp: false
};

console.log("🚀 Starting deployment to xneelo...");
console.log(`📁 Deploying from: ${config.localRoot}`);
console.log(`🌐 Deploying to: ${config.remoteRoot}`);
console.log(`🔗 Host: ${config.host}`);

ftpDeploy
	.deploy(config)
	.then(res => {
		console.log("✅ Deployment completed successfully!");
		console.log(`📊 Files uploaded: ${res.length}`);
	})
	.catch(err => {
		console.error("❌ Deployment failed:", err);
		process.exit(1);
	});
