# n8nのあれこれ
* zohocrmの情報を読み取る方法\
** Zoho API の Credential を入手する**/
  備え付けられている zoho Oauth2 API は日本に対応してないので使えない．そのため一般的な Oauth2 API から作成する必要がある．\
  **OAuth Redirect URL** : https://oauth.n8n.cloud/oauth2/callback\
  **Grant Type** : Authorization Code\
  **Authorization URL** : https://accounts.zoho.jp/oauth/v2/auth\
  **Access Token URL** : https://accounts.zoho.jp/oauth/v2/token\
  **Client ID** : API Consoleから入手\
  **Client Secret** : API Consoleから入手\
  **Scope** : ZohoCRM.modules.READ,ZohoCRM.settings.READ,ZohoCRM.users.READ\
  **Auth URI Query Parameters** : access_type=offline\
  **Authentication** : Header\
