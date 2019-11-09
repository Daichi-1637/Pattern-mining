# Pattern-mining
## できること
2つの音声データから相関係数を算出し, 相関係数値と算出に使用したデータの波形をブラウザで表示します.  
## 実験環境
### 環境
- winodws 10
- chocoratery
- python 2.7.16
- pip
- npm
### How to use ? (You can do it, if you follow below steps. Maybe...)
ローカル環境で行うことを想定しています.  
chocolateryは自分で頑張ってい入れてください. 

`$ choco install python, pip, npm`
 
 Pattern-mining/src/speech-analysis  
`$ pip install matplot`  
`$ pip install scipy`  
`$ pip install pandas`  
`$ pip install falcon`  
`$ pip install json`  

 Pattern-mining/src/web-app  
`npm install --save react react-dom`  
`npm install --save-dev @types/react @types/react-dom`  
`npm install --save @amcharts/amcharts4`   

## 使い方
### 音声データの置き場所  
以下のコマンドを打ち, 作成されたディレクトリvoicesに音声データを置いてください.  
`cd ../Pattern-mining`  
`mkdir voices`  
### 相関係数計算サーバの立ち上げ
Pattern-mining/src/speech-analysis  
`python SpeechAnalysis.py`
### ブラウザ表示サーバの立ち上げ  
Pattern-mining/src/web-app  
`npm start`  
