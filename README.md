# my_html_template

HTML 制作時のテンプレート

## How to use

`npm install`
`npx gulp` or `gulp`

### 静的サイトとWordPressサイトに対応
`--php`のオプションを指定することでWordPressサイトとしてのビルドが可能。
ただし、watchする場合は`npx gulp watchwp --php`と、watch関数とオプションを指定する必要あり。

## 解説

src フォルダで開発を進める。
コンパイル？トランスパイル？された生成物は dist フォルダに生成される。（dist フォルダがなければ作成される）

### HTML テンプレートエンジン

HTML のテンプレートは ejs と pug があるが、標準では pug を使う。
ejs を使うようにするには gulpfile を書き換える必要あり。（できればオプション指定などで変更できるようにしたい）

### css

css は scss の記法で src>sass フォルダ内で記述。
.browerslistrc ファイルでサポートブラウザを指定している。

### Javascript

babel を使って変換してる。変換しないと uglify で圧縮できなかった。
生成されるのは改行やスペースがなくなった圧縮されたコード。
全ての js を一つのファイルに結合するには gulpfile で concat のコメントを外す。
gulpfile には typescript のトランスパイルも記述されてるけどコピペしただけ。

### image

画像ファイルは圧縮する。
