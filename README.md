# n8n
AIエージェント作成用ファイル倉庫\\
***5/30***\\
zohoフォームでテストベンチ用の簡単なアンケートフォームを作成\\
ubuntu にn8nをダウンロード\\
# Dockerのインストール
sudo apt update
sudo apt install -y docker.io

# Docker Composeのインストール
sudo apt install -y docker-compose

# Docker起動＆有効化
sudo systemctl enable docker
sudo systemctl start docker

# 権限付与（再ログインで有効）
sudo usermod -aG docker $USER

****docker-compose作成
mkdir ~/n8n
cd ~/n8n
nano docker-compose.yml

#　lsで.n8nがなければ（任意）
~$ mkdir -p ~/.n8n
~$ sudo chown -R 1000:1000 ~/.n8n
~$ sudo chmod -R 700 ~/.n8n

#docker起動
~/n8n$ vim docker-compose.yml
********************************************
version: '3'

services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=youruser      # 任意の管理ユーザー名に変更してください
      - N8N_BASIC_AUTH_PASSWORD=yourpass  # 任意の管理パスワードに変更してください
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - GENERIC_TIMEZONE=Asia/Tokyo
      - N8N_LOG_LEVEL=info
      # Zoho, Google, SlackのAPIキーはn8nのCredential管理で登録するのでここでは不要
    volumes:
      - ./n8n_data:/home/node/.n8n
**************************************
これを書き，:wqで終了
~$ sudo docker-compose up -d
~$ sudo docker psで動作確認
http://localhost:5678をブラウザで実行

***古いコンテナやイメージを一度削除してから再作成する
sudo docker-compose down --rmi all -v --remove-orphans
sudo docker-compose up -d
$ sudo docker run -d --name n8n -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

***nginxインストール
sudo apt update
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
$ sudo nano /etc/nginx/sites-available/n8n
****zoho開発者コンソールを作成(しなくてよい事判明)
https://api-console.zoho.com/
右上の「Add Client」をクリック。
Client Type → Server-based Applications を選択。
Client Name	任意（例: n8n Integration）
Homepage URL	任意（例: http://localhost:5678）
Authorized Redirect URIs	http://localhost:5678/rest/oauth2-credential/callback ←必須。n8nの仕様通りに。
Client Domain	空白でOK（または localhost）
java ローカルの場合:http://localhost:5678

Client ID:1000.V5H4E0RV7FQ5RVBWEEJ7R23NDDDRDL
Client Secret:be1d36f3fba41b5a4e71a94ec824590fba777ce229

****webhook作成
2. Zoho FormsでWebhook設定をする
Zoho Formsにログイン
対象フォームの設定画面へ
Integrations（連携） > Webhooks へ移動
「新規Webhook作成」または「Add Webhook」ボタンをクリック
URL欄に、n8nのWebhook URL（例: http://<あなたのIP>:5678/webhook/zohoform-webhook）を貼り付け
HTTPメソッドは POST に設定
必要に応じてヘッダーや認証設定（できるなら）を入力
保存してWebhookを有効化
