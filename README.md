# GOLF＿ScoreMemo

## 概要

### ゴルフのスコアを記録できる簡単なアプリ

### 操作手順

### バックエンド

- SpringBoot(kotlin)

#### データベース作成

- ターミナルで psql 　 CREATE DATABASE another_lang;を実行しデータベースを作成する

#### マイグレーション実行・サーバー起動

- intelliJ にてこのフォルダを開き、GRadie で Tasks/application/bootRun を実行

#### シードについて

- シードファイルは準備していないので、ターミナルからデータベースにアクセスして下記を使用して直接プレイヤー名とゴルフ場名を入れてください

- プレイヤー名入力

  ```プレイヤーinsert:sample
  INSERT INTO player (name) VALUES ("ここに名前を入力");

  ```

- ゴルフ場名入力
  ```プレイヤーinsert:sample
  INSERT INTO golf_course (course_name) VALUES ("ここに名前を入力");
  ```

#### フロントエンド

- React(js)

#### 環境構築

- frontend ディレクトリに移動し、npm i を行う

#### アプリ起動

- npm run dev を行い
  http://localhost:5173
  にアクセスする
