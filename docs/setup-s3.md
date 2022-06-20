# S3 Setup

1. Create an AWS account
2. Create an S3 bucket
3. Create AWS secruity credentials
4. Add the bucket & credentials to your API's `.env` file

```
AWS_S3_BUCKET=<your-s3-bucket-name>
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
```

5. Update S3 bucket settings
   - In your S3 bucket's permissions tab, make sure the "block all public access" is off.
   - In the "Cross-origin resource sharing (CORS)" section, copy this in:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```
