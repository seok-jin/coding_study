from datetime import date, datetime, timedelta
import pandas as pd
import pymysql
import numpy as np
from pykrx import stock

ticker_count  = 0
commit_count  = 0
ticker_queue = []

# Connect to the database
connection = pymysql.connect(
    user='seokjin', 
    passwd='1234', 
    host='3.36.94.44', 
    db='stock', 
    charset='utf8'
)
stock_lsits = ['KOSPI', 'KOSDAQ', 'ETF']
cursor=connection.cursor()

for stock_list in stock_lsits:
    if stock_list != 'ETF':
        tickers = stock.get_market_ticker_list(market=stock_list)
    else:
        tickers = stock.get_etf_ticker_list()


    len_tickers = len(tickers)
    tickers = np.array(tickers).reshape(len_tickers,-1)
    ones = np.array([[stock_list,'Y',date.today().isoformat()]] * len_tickers)
    tickers = np.append(tickers, ones, axis = 1)


    commit_count = 0
    ticker_count = 0


    for ticker in tickers:
        commit_count+=1
        ticker_count+=1
        ticker_queue.append(ticker.tolist())

        if commit_count == 1000 or len_tickers == ticker_count:
            cols = "`,`".join([str(i) for i in ['code', 'code_gbn', 'check_item', 'create_date']])
            sql = "INSERT INTO `stock_kospi` (`" +cols + "`) VALUES (" + "%s,"*(ticker.shape[0]-1) + "%s)  ON DUPLICATE KEY UPDATE update_date ="+"'"+date.today().isoformat()+"'"
            cursor.executemany(sql,ticker_queue)

            connection.commit()
            commit_count=0
            ticker_queue = []


cursor.close()

