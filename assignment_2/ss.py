from flask import Flask, request, render_template, jsonify
import requests
import finnhub
finnhub_client = finnhub.Client(api_key="cn7g2r9r01qgjtj4jgj0cn7g2r9r01qgjtj4jgjg")
from datetime import datetime, date, timedelta

app = Flask(__name__)

"""
@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
    	userInput = request.form['userInput']
    	data = finnhub_client.company_profile2(symbol=userInput)
    	return render_template('stocksearch.html', embed=data)
    	#return f'{data}'
    return render_template('stocksearch.html')
"""
@app.route('/')
def home():
    return render_template('stocksearch.html') 

@app.route('/comp_data', methods=['GET'])
def getdata():
	userInput = request.args.get('userInput')
	link = f'https://finnhub.io/api/v1/stock/profile2?symbol={userInput}&token=cn7g2r9r01qgjtj4jgj0cn7g2r9r01qgjtj4jgjg'
	response = requests.get(link)
	data = response.json()
	return jsonify(data)


@app.route('/comp_dataS', methods=['GET'])
def getdataS():
	userInput = request.args.get('userInput')
	link = f'https://finnhub.io/api/v1/quote?symbol={userInput}&token=cn7g2r9r01qgjtj4jgj0cn7g2r9r01qgjtj4jgjg'
	response = requests.get(link)
	dataS = response.json()
	return jsonify(dataS)

@app.route('/comp_dataR', methods=['GET'])
def getdataR():
	userInput = request.args.get('userInput')
	link = f'https://finnhub.io/api/v1/stock/recommendation?symbol={userInput}&token=cn7g2r9r01qgjtj4jgj0cn7g2r9r01qgjtj4jgjg'
	response = requests.get(link)
	dataR = response.json()
	return jsonify(dataR)

@app.route('/comp_dataC', methods=['GET'])
def getdataC():
	userInput = request.args.get('userInput')  
	prior_date_oneday = (date.today()-timedelta(days=1)).isoformat()
	prior_date_sixmonths = (date.today()-timedelta(days=183)).isoformat()
	link = f'https://api.polygon.io/v2/aggs/ticker/{userInput}/range/1/day/{prior_date_sixmonths}/{prior_date_oneday}?adjusted=true&sort=asc&apiKey=5Vu2OyfSXqvCP1ucS5vX2rO5NyK4AQx1'
	response = requests.get(link)
	dataC = response.json()
	return jsonify(dataC)

@app.route('/comp_dataN', methods=['GET'])
def getdataN():
	userInput = request.args.get('userInput')
	current_date = date.today().isoformat()   
	prior_date = (date.today()-timedelta(days=30)).isoformat()
	link = f'https://finnhub.io/api/v1/company-news?symbol={userInput}&from={prior_date}&to={current_date}&token=cn7g2r9r01qgjtj4jgj0cn7g2r9r01qgjtj4jgjg'
	response = requests.get(link)
	dataN = response.json()
	return jsonify(dataN)


if __name__ == "__main__":
	app.run(debug=True)
