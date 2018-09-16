github-to-epub
=========

GitHubリポジトリからePubを作成します。

## Usage

```
git clone https://github.com/8amjp/github-to-epub.git
npm install
```

次にconfig.jsonを修正します。

### config.json

#### token
GitHubの 'Settings' > 'Developer settings' > 'Personal access tokens' メニューでトークンを生成し貼り付けてください。

#### url

#### epub
[epub-gen](https://github.com/cyrilis/epub-gen)を参照してください。

### Publish

`node publish.js` とコマンドを入力するとePubファイルが出力されます。
