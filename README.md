# n8nのあれこれ
* zohocrmの情報を読み取る方法\
** Zoho API Console を作成する．** \
zoho crmと同一のアカウントで zoho API Console にアクセスする．
** Zoho API の Credential を入手する** \
  備え付けられている zoho Oauth2 API は日本に対応してないので使えない．そのため一般的な Oauth2 API から作成する必要がある．各ノードは以下のようになった．\
  **OAuth Redirect URL** : https://oauth.n8n.cloud/oauth2/callback \
  **Grant Type** : Authorization Code \
  **Authorization URL** : https://accounts.zoho.jp/oauth/v2/auth \
  **Access Token URL** : https://accounts.zoho.jp/oauth/v2/token \
  **Client ID** : API Consoleから入手 \
  **Client Secret** : API Consoleから入手  \
  **Scope** : ZohoCRM.modules.READ,ZohoCRM.settings.READ,ZohoCRM.users.READ  \
  **Auth URI Query Parameters** : access_type=offline \
  **Authentication** : Header \
  つなげられたら適宜 Credential の名前を設定する．
* HTTP Request\
**Method** : GEt \
**URL** :  https://www.zohoapis.jp/crm/v2/settings/modulesでモジュール名取得\
           https://www.zohoapis.jp/crm/v2/[module名]でアクセス
**Authentication** Generic Credential Type \
**Oauth2 API** Credential の名前 \
**Options** Response <- json \
* 要素抽出のjavascript code \
  
