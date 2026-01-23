---
title: "もし、XAMPP for LinuxやApacheのアクセス権限系のエラーが出たときは・・・。"
date: 2020-08-22
categories: 
  - "パソコン"
---

  

どうもりーくんです。

  
  
  
  

この系の記事がなかなか見つからなかったので備忘録がてら残しておくことにいたしましょう。

  
  
  
  

## アクセス権限系のエラーとは

  
  
  
  

XAMPPでWordPressをインストールした際にwp-config.phpが書き込めませんでしたとか更新するときにFTP情報を登録してくださいとかが出るときがあります。

  
  
  
  

それがアクセス権限系のエラーということになります。

  
  
  
  

Permissionというワードが出たときもそれに該当します。

  
  
  
  

解決方法をご紹介します。

  
  
  
  

## 解決方法

  
  
  
  

```
sudo chown -R daemon:apache /opt/lampp/htdocs
```

  
  
  
  

これだけです。

  
  
  
  

/opt/lampp/htdocsは適宜自分のサイトデータを保存してあるフォルダーを入力してください。

もしもXAMPPではなくApacheを使っていたら。

Apacheを使っていた場合daemon:apacheでは解決することができません。

その場合www-data:www-dataで解決することができます。
