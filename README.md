# Pattern-mining
## できること
2つの音声データから相関係数を算出し, 相関係数値と算出に使用したデータの波形をブラウザで表示する.   
( なお, 「あ」から「お」までの音声データしか計測できない. )  
## 実験環境
- winodws 10
- chocoratery
- python 2.7.16
- pip
- npm  
## システム概要  
pythonで相関係数計算を行うhttpサーバを, reactで表示のためのwebサーバを立てて使用する.  

httpサーバの仕様について, 今回はgetメソッドしか用いていない.  
以下にgetメソッドの仕様を書く.  
```javascript
GET {
 data0: (int)[],    // 相関係数を求める１つ目の音声データ(10000個)  
 data1: (int)[],    // 相関係数を求める２つ目の音声データ(10000個)
 corr: (float)      // 相関係数
}
```

また, データの指定は以下の様に指定する.  
`http://localhost:8000/{voice0}/{voice1}/` (voice0, voice1: A, I, U, E, O)

## How to use ? (You can do it, if you follow below steps ! Maybe...)
### setup  
ローカル環境で行うことを想定.  
( chocolateryは自分で頑張って入れてください. )

```shell
$ choco install python, pip, npm
```  

任意のディレクトリで行うこと.  
```shell
$ git clone https://github.com/Daichi-1637/Pattern-mining
```  
```shell
$ cd Pattern-mining
```  

### 相関係数計算サーバのセッティング
```shell
$ cd src/speech-analysis
```  
```shell
$ pip install matplot
```  
```shell
$ pip install scipy
```  
```shell
$ pip install pandas
```  
```shell
$ pip install falcon
```  
```shell
$ pip install json
```  

###  ブラウザ表示サーバのセッティング
```shell
$ cd src/web-app
```  
```shell
$ npm install --save react react-dom
```  
```shell
$ npm install --save-dev @types/react @types/react-dom
```  
```shell
$ npm install --save @amcharts/amcharts4
```   

### 音声データの置き場所  
以下のコマンドを打ち, 作成されたディレクトリvoicesに音声データを置くこと.  
```shell
$ cd ../..
```  
```shell
$ mkdir voices
```  
```shell
$ cd voices
```  

なお, 現段階では音声データは  
`20191016-@-retake.wav` (@: a, i, u, e, o)  
というファイル名としなければ処理できない.  

### 相関係数計算サーバの立ち上げ
```shell
$ cd ../src/speech-analysis
```  
```shell
$ python SpeechAnalysis.py
```
### ブラウザ表示サーバの立ち上げ  
```shell
$ cd ../../src/web-app
```  
```shell
$ npm start
```  
